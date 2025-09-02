import moment from "moment-timezone";

/**
 * Helper to convert IST time (HH:mm) into UTC cron fields
 */
function istToUtcCron(time) {
  // Parse the IST time
  const [hour, minute] = time.split(":").map(Number);

  // Build moment in IST
  const istMoment = moment.tz({ hour, minute }, "Asia/Kolkata");

  // Convert to UTC
  const utcMoment = istMoment.clone().tz("UTC");

  return {
    minute: utcMoment.minute().toString(),
    hour: utcMoment.hour().toString(),
    dayOfMonth: "*",
    month: "*",
    dayOfWeek: "*",
  };
}

export default [
  {
    name: "MorningOrderCreation",
    schedule: istToUtcCron("06:00"), // 6:00 AM IST
    taskPath: "../schedulers/orderCreation.js",
    functionName: "morningOrders",
  },
  {
    name: "AfternoonOrderCreation",
    schedule: istToUtcCron("14:00"), // 2:00 PM IST
    taskPath: "../schedulers/orderCreation.js",
    functionName: "afternoonOrders",
  },
];

/**
 * Configuration file for scheduling tasks.
 *
 * Fields:
 * - name: A unique name for the task.
 * - schedule: Cron-like fields to determine when the task runs:
 *    - minute: 0-59 or * or comma-separated values
 *    - hour: 0-23 or *
 *    - dayOfMonth: 1-31 or *
 *    - month: 1-12 or *
 *    - dayOfWeek: 0 (Sunday) - 6 (Saturday) or *
 * - taskPath: Path to the JS file that exports the function.
 * - functionName: The name of the exported function to be run.
 */

// export default [
  // {
  //   name: "TaskOne",
  //   schedule: {
  //     minute: "1",
  //     hour: "12",
  //     dayOfMonth: "*",
  //     month: "*",
  //     dayOfWeek: "*",
  //   },
  //   taskPath: "../schedulers/orderCreation.js",
  //   functionName: "taskOne",
  // },
  // {
  //   name: "TaskTwo",
  //   schedule: {
  //     minute: "30",
  //     hour: "15",
  //     dayOfMonth: "*",
  //     month: "*",
  //     dayOfWeek: "1", // Every Monday
  //   },
  //   taskPath: "../schedulers/orderCreation.js",
  //   functionName: "taskTwo",
  // },
  // {
  //   name: "TaskEvery10Sec",
  //   schedule: {
  //     second: "*/10",
  //     minute: "*",
  //     hour: "*",
  //     dayOfMonth: "*",
  //     month: "*",
  //     dayOfWeek: "*",
  //   },
  //   taskPath: "../schedulers/orderCreation.js",
  //   functionName: "taskOne",
  // },
// ];

