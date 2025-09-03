import { orderQueue } from './queue.js';

async function scheduleJobs() {
  try {
    // Wait for queue to be ready
    await orderQueue.isReady();
    
    // Clear existing repeatable jobs to avoid duplicates
    const repeatableJobs = await orderQueue.getRepeatableJobs();
    for (const job of repeatableJobs) {
      await orderQueue.removeRepeatableByKey(job.key);
    }

    // Schedule morning job (6:00 AM IST) for afternoon tiffins
    await orderQueue.add(
      'morning-orders',
      { slot: 'AFTERNOON_ONLY' },
      { 
        repeat: { 
          cron: '00 11 * * *', 
          tz: 'Asia/Kolkata' 
        },
        jobId: 'morning-orders-job' // Unique ID to prevent duplicates
      }
    );

    // Schedule afternoon job (2:26 PM IST) for evening tiffins
    await orderQueue.add(
      'afternoon-orders',
      { slot: 'EVENING_ONLY' },
      { 
        repeat: { 
          cron: '57 21 * * *', 
          tz: 'Asia/Kolkata' 
        },
        jobId: 'afternoon-orders-job' // Unique ID to prevent duplicates
      }
    );

    console.log('✅ Scheduled morning and afternoon repeatable jobs.');
    
    // Log current repeatable jobs
    const jobs = await orderQueue.getRepeatableJobs();
    console.log('📋 Active repeatable jobs:', jobs.length);
    jobs.forEach(job => {
      console.log(`  - ${job.name}: ${job.cron} (${job.tz || 'UTC'})`);
    });
    
  } catch (error) {
    console.error('❌ Error scheduling jobs:', error);
    throw error;
  }
}

export { scheduleJobs };

// Auto-run when imported
scheduleJobs().catch(console.error);