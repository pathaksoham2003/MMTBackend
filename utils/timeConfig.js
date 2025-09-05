// utils/timeConfig.js
import dotenv from "dotenv";
dotenv.config();

const [aHour, aMinute] = process.env.AFTERNOON_CUTOFF.split(":").map(Number);
const [eHour, eMinute] = process.env.EVENING_CUTOFF.split(":").map(Number);

export const TIMEZONE = process.env.TIMEZONE || "Asia/Kolkata";
export const AFTERNOON_CUTOFF = { hour: aHour, minute: aMinute };
export const EVENING_CUTOFF = { hour: eHour, minute: eMinute };
