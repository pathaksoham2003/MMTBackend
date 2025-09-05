import './queue.js';
import { scheduleJobs } from './scheduleJobs.js';
import './processOrders.js';

console.log('📅 Scheduler system initialized');

// Run the scheduler setup once at startup
scheduleJobs()
  .then(() => console.log('✅ Schedulers initialized successfully'))
  .catch(err => console.error('❌ Scheduler init failed:', err));
