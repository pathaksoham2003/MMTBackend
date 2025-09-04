// schedulers/processOrders.js
import { orderQueue } from './queue.js';
import UserSubscription from '../models/UserSubscription.js';
import Order from '../models/Order.js';
import MessTiffinTypeContents from '../models/MessTiffinTypeContents.js';

// Process jobs
orderQueue.process('afternoon-orders', async (job) => {
  return await processOrders(job);
});

orderQueue.process('evening-orders', async (job) => {
  return await processOrders(job);
});

async function processOrders(job) {
  const { slot } = job.data;
  console.log(`🔄 Processing ${job.name} for slot: ${slot} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);

  try {
    // Determine which day_slots to include based on the processing slot
    const daySlots = slot === 'AFTERNOON_ONLY'
      ? ['AFTERNOON', 'AFTERNOON+EVENING']
      : ['EVENING', 'AFTERNOON+EVENING'];

    // Use aggregation to filter at database level for better performance
    const relevantSubs = await UserSubscription.aggregate([
      {
        $match: {
          is_active: true,
          total_tiffins_left: { $gt: 0 }
        }
      },
      {
        $lookup: {
          from: 'subscriptions', // collection name for Subscription model
          localField: 'plan_id',
          foreignField: '_id',
          as: 'plan_id'
        }
      },
      {
        $unwind: '$plan_id'
      },
      {
        $match: {
          'plan_id.day_slot': { $in: daySlots }
        }
      }
    ]);

    console.log(`📦 Found ${relevantSubs.length} active subscriptions to process for ${slot}`);

    let successCount = 0;
    let errorCount = 0;

    await Promise.all(relevantSubs.map(async (sub) => {
      try {
        const messContents = await MessTiffinTypeContents.findOne({
          mess_id: sub.plan_id.mess_id,
          type: 'NORMAL',
        });
        
        if (!messContents) {
          console.warn(`⚠️ No mess contents found for mess_id: ${sub.plan_id.mess_id}`);
          return;
        }

        const newOrder = new Order({
          customer_id: sub.customer_id,
          user_subscription_id: sub._id,
          mess_id: sub.plan_id.mess_id,
          mess_tiffin_contents: messContents._id,
          address: sub.delivery_preferences?.address || {},
          amount: sub.plan_id.price,
        });
        
        await newOrder.save();

        await UserSubscription.updateOne(
          { _id: sub._id }, 
          { $inc: { total_tiffins_left: -1 } }
        );
        
        successCount++;
        console.log(`✅ Order created for subscription ${sub._id}`);
      } catch (err) {
        errorCount++;
        console.error(`❌ Error processing subscription ${sub._id}:`, err.message);
      }
    }));

    const result = {
      slot,
      processed: successCount,
      errors: errorCount,
      timestamp: new Date().toISOString()
    };
    
    console.log(`🎉 Batch processing complete:`, result);
    return result;
    
  } catch (error) {
    console.error(`❌ Fatal error processing ${job.name}:`, error);
    throw error;
  }
}