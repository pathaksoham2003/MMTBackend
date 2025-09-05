import { orderQueue } from "./queue.js";
import { AFTERNOON_CUTOFF, EVENING_CUTOFF, TIMEZONE } from "../utils/timeConfig.js";

function toCron(hour, minute) {
  return `${minute} ${hour} * * *`;
}

async function scheduleJobs() {
  try {
    await orderQueue.isReady();

    // Clear existing repeatable jobs
    const repeatableJobs = await orderQueue.getRepeatableJobs();
    for (const job of repeatableJobs) {
      await orderQueue.removeRepeatableByKey(job.key);
    }

    // Afternoon job
    await orderQueue.add(
      "afternoon-orders",
      { slot: "AFTERNOON_ONLY" },
      {
        repeat: {
          cron: toCron(AFTERNOON_CUTOFF.hour, AFTERNOON_CUTOFF.minute),
          tz: TIMEZONE,
        },
        jobId: "afternoon-orders-job",
      }
    );

    // Evening job
    await orderQueue.add(
      "evening-orders",
      { slot: "EVENING_ONLY" },
      {
        repeat: {
          cron: toCron(EVENING_CUTOFF.hour, EVENING_CUTOFF.minute),
          tz: TIMEZONE,
        },
        jobId: "evening-orders-job",
      }
    );

    console.log("✅ Scheduled afternoon and evening repeatable jobs.");

    const jobs = await orderQueue.getRepeatableJobs();
    console.log("📋 Active repeatable jobs:", jobs.length);
    jobs.forEach((job) => {
      console.log(`  - ${job.name}: ${job.cron} (${job.tz || "UTC"})`);
    });
  } catch (error) {
    console.error("❌ Error scheduling jobs:", error);
    throw error;
  }
}

export { scheduleJobs };
