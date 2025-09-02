import { orderQueue } from "../schedulers/queue.js";

/**
 * Get scheduler queue stats
 */
export const getSchedulerStats = async (req, res) => {
  try {
    const waiting = await orderQueue.getWaiting();
    const active = await orderQueue.getActive();
    const completed = await orderQueue.getCompleted();
    const failed = await orderQueue.getFailed();
    const repeatableJobs = await orderQueue.getRepeatableJobs();

    res.json({
      queueStats: {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
        repeatableJobs: repeatableJobs.length,
      },
      repeatableJobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Debug scheduler (logs debug info)
 */
export const debugScheduler = async (req, res) => {
  try {
    const { debugSchedulerData } = await import("../schedulers/debugScheduler.js");
    await debugSchedulerData();
    res.json({ message: "Debug info logged to console" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Manually trigger order processing for a slot
 */
export const testOrderProcessing = async (req, res) => {
  try {
    const { slot } = req.params; // 'AFTERNOON_ONLY' | 'EVENING_ONLY'
    const { testOrderProcessing } = await import("../schedulers/processOrders.js");
    const result = await testOrderProcessing(slot);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
