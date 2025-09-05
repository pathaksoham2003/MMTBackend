import { startOfDay, addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { AFTERNOON_CUTOFF, EVENING_CUTOFF, TIMEZONE } from "./timeConfig.js";

/**
 * Check if the current time has passed the given cutoff.
 */
function hasPassedCutoff(now, cutoff) {
  // Convert current UTC -> zoned date
  const zonedNow = toZonedTime(now, TIMEZONE);

  // Build cutoff in zoned time
  const cutoffDate = new Date(zonedNow);
  cutoffDate.setHours(cutoff.hour, cutoff.minute, 0, 0);

  return zonedNow >= cutoffDate;
}

/**
 * Generate future orders for a given user subscription.
 */
export function generateFutureOrders(userSub) {
  const { total_tiffins_left, plan_id, end_date } = userSub;
  const { day_slot, price, mess_id } = plan_id;

  let results = [];
  let remaining = total_tiffins_left;

  const now = new Date();
  const zonedNow = toZonedTime(now, TIMEZONE);

  let currentDate = startOfDay(zonedNow);

  // Determine slots per day
  const slotsPerDay =
    day_slot === "AFTERNOON+EVENING" ? ["AFTERNOON", "EVENING"] : [day_slot];

  while (remaining > 0 && (!end_date || currentDate <= end_date)) {
    for (const slot of slotsPerDay) {
      // Skip cutoff times if generating for today
      if (currentDate.getTime() === startOfDay(zonedNow).getTime()) {
        if (slot === "AFTERNOON" && hasPassedCutoff(now, AFTERNOON_CUTOFF)) {
          continue;
        }
        if (slot === "EVENING" && hasPassedCutoff(now, EVENING_CUTOFF)) {
          continue;
        }
      }

      if (remaining <= 0) break;

      results.push({
        date: currentDate.toISOString().split("T")[0],
        slot,
        mess_id,
        amount: price,
        subscription_id: userSub._id,
      });

      remaining--;
    }

    currentDate = addDays(currentDate, 1);
  }

  return results;
}
