// schedulers/debugScheduler.js - Fixed imports
async function getDebugModels() {
  const [
    { default: UserSubscription },
    { default: Subscription },
    { default: MessTiffinTypeContents }
  ] = await Promise.all([
    import('../models/UserSubscription.js'),
    import('../models/Subscription.js'),
    import('../models/MessTiffinTypeContents.js')
  ]);
  
  return { UserSubscription, Subscription, MessTiffinTypeContents };
}

export async function debugSchedulerData() {
  console.log('\n🔍 SCHEDULER DEBUG INFORMATION');
  console.log('=====================================');
  
  try {
    const { UserSubscription, Subscription, MessTiffinTypeContents } = await getDebugModels();
    
    // Check subscription plans
    const allPlans = await Subscription.find({});
    const activePlans = await Subscription.find({ active: true });
    
    console.log(`📋 Total subscription plans: ${allPlans.length}`);
    console.log(`📋 Active subscription plans: ${activePlans.length}`);
    
    if (activePlans.length > 0) {
      console.log('Active plans:');
      activePlans.forEach(plan => {
        console.log(`  - ${plan.name} (${plan._id}): ${plan.day_slot}, Mess: ${plan.mess_id}`);
      });
    }
    
    // Check user subscriptions
    const activeUserSubs = await UserSubscription.find({ 
      is_active: true, 
      total_tiffins_left: { $gt: 0 } 
    }).populate('plan_id');
    
    console.log(`\n👥 Active user subscriptions with tiffins left: ${activeUserSubs.length}`);
    
    if (activeUserSubs.length > 0) {
      console.log('Active user subscriptions:');
      activeUserSubs.slice(0, 5).forEach(sub => { // Show only first 5
        console.log(`  - ${sub._id}: Customer ${sub.customer_id}, Plan: ${sub.plan_id?.name || 'N/A'}, Tiffins: ${sub.total_tiffins_left}`);
      });
      if (activeUserSubs.length > 5) {
        console.log(`  ... and ${activeUserSubs.length - 5} more`);
      }
    }
    
    // Check mess contents
    const messContents = await MessTiffinTypeContents.find({ type: 'NORMAL' });
    console.log(`\n🍽️ Available mess contents (NORMAL type): ${messContents.length}`);
    
    // Check for issues
    console.log('\n⚠️ POTENTIAL ISSUES:');
    
    const messIds = [...new Set(activePlans.map(p => p.mess_id?.toString()).filter(Boolean))];
    const contentMessIds = [...new Set(messContents.map(c => c.mess_id?.toString()).filter(Boolean))];
    const missingContents = messIds.filter(id => !contentMessIds.includes(id));
    
    if (missingContents.length > 0) {
      console.log(`  - ${missingContents.length} mess(es) without NORMAL type contents`);
    } else {
      console.log('  - No issues found with mess contents');
    }
    
    console.log('=====================================\n');
    
  } catch (error) {
    console.error('❌ Error in debug function:', error);
  }
}