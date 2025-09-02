// // scheduler.js
// import cron from 'node-cron';
// import config from '../config/schedule_config.js';
// import path from 'path';
// import { fileURLToPath , pathToFileURL } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// function buildCronExpression(schedule) {
//   const {
//     second = "0", // default to 0 if not provided
//     minute = "*",
//     hour = "*",
//     dayOfMonth = "*",
//     month = "*",
//     dayOfWeek = "*",
//   } = schedule;

//   return `${second} ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
// }

// config.forEach((taskConfig) => {
//   try {
//     const cronExpression = buildCronExpression(taskConfig.schedule);

//     if (!cron.validate(cronExpression)) {
//       console.error(`❌ Invalid cron expression for '${taskConfig.name}':`, cronExpression);
//       return;
//     }

//     cron.schedule(cronExpression, async () => {
//       try {
//         const absolutePath = path.resolve(__dirname, taskConfig.taskPath);
//         const fileURL = pathToFileURL(absolutePath).href;

//         const taskModule = await import(fileURL);
//         const taskFunction = taskModule[taskConfig.functionName];

//         if (typeof taskFunction !== "function") {
//           console.error(`❌ '${taskConfig.functionName}' is not a function in ${taskConfig.taskPath}`);
//           return;
//         }

//         console.log(`✅ Running task: ${taskConfig.name}`);
//         await taskFunction();
//       } catch (err) {
//         console.error(`❌ Error running task '${taskConfig.name}':`, err);
//       }
//     });

//     console.log(`✅ Scheduled task '${taskConfig.name}' with cron: ${cronExpression}`);
//   } catch (err) {
//     console.error(`❌ Error scheduling '${taskConfig.name}':`, err);
//   }
// });


import './queue.js';
import './scheduleJobs.js';
import './processOrders.js';

console.log('📅 Scheduler system initialized');
