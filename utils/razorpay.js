import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create an order for customer payment
 * @param {Number} amount - total amount in rupees
 * @param {String} receipt - unique receipt id
 */
export const createOrder = async (amount, receipt) => {
  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: "INR",
    receipt,
    payment_capture: 1,
  };

  return await razorpay.orders.create(options);
};

/**
 * Verify Razorpay payment signature
 */
export const verifyPayment = (orderId, paymentId, signature) => {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  return expectedSignature === signature;
};

/**
 * Payout function to Mess Owner
 * @param {Object} messOwner - user document with payout_details
 * @param {Number} amount - amount to send in rupees
 */
export const createPayout = async (messOwner, amount) => {
  // Decide transfer mode (UPI / bank / Razorpay account)
  const { payout_details } = messOwner;
  if (!payout_details) throw new Error("Mess owner payout details not found");

  const accountType = payout_details.razorpay_account_id
    ? { account_number: payout_details.razorpay_account_id }
    : payout_details.upi_id
    ? { account_number: "UPI", fund_account: { account_type: "vpa", vpa: { address: payout_details.upi_id } } }
    : payout_details.bank_account
    ? {
        fund_account: {
          account_type: "bank_account",
          bank_account: {
            name: messOwner.name,
            ifsc: payout_details.ifsc,
            account_number: payout_details.bank_account,
          },
        },
      }
    : null;

  if (!accountType) throw new Error("No valid payout method found");

  const payoutOptions = {
    account_number: process.env.RAZORPAY_PAYOUT_ACCOUNT, // Virtual account no. from Razorpay Dashboard
    fund_account: accountType.fund_account,
    amount: amount * 100,
    currency: "INR",
    mode: payout_details.upi_id ? "UPI" : "IMPS",
    purpose: "payout",
    queue_if_low_balance: true,
  };

  return await razorpay.payouts.create(payoutOptions);
};

export default razorpay;
