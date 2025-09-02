
// schedulers/queue.js
import Queue from 'bull';
import dotenv from 'dotenv';

dotenv.config();

// Add better error handling and connection validation
const redisConfig = {
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    // If using Redis URL, parse it properly
    ...(process.env.REDIS_URL && { 
      port: new URL(process.env.REDIS_URL).port,
      host: new URL(process.env.REDIS_URL).hostname 
    })
  },
  defaultJobOptions: {
    removeOnComplete: 10, // Keep some completed jobs for debugging
    removeOnFail: 50,     // Keep failed jobs for debugging
    attempts: 3,
    backoff: { type: 'exponential', delay: 60000 },
  },
};

export const orderQueue = new Queue('order-creation-queue', redisConfig);

// Add error event listeners
orderQueue.on('error', (error) => {
  console.error('❌ Queue error:', error);
});

orderQueue.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});

orderQueue.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed successfully`);
});

// Test Redis connection
orderQueue.isReady().then(() => {
  console.log('✅ Redis connection established for queue');
}).catch((err) => {
  console.error('❌ Redis connection failed:', err);
});