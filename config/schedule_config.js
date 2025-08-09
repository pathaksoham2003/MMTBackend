// schedule_config.js

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

export default [
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
];
