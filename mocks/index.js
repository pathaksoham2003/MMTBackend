import mongoose from "../utils/db.js";
import User from "../models/User.js";
import MessDetails from "../models/MessDetails.js";
import Tiffin from "../models/Tiffin.js";
import Subscription from "../models/Subscription.js";
import MessTiffinTypeContents from "../models/MessTiffinTypeContents.js";
import UserSubscription from "../models/UserSubscription.js";

// Mock data helper
const randomPhone = () => Math.floor(6000000000 + Math.random() * 1000000000);

const createMockData = async () => {
  try {
    // Cleanup before seeding
    await User.deleteMany({});
    await MessDetails.deleteMany({});
    await Tiffin.deleteMany({});
    await Subscription.deleteMany({});
    await MessTiffinTypeContents.deleteMany({});
    await UserSubscription.deleteMany({});

    console.log("Cleared old data ✅");

    // Step 1: Create 2 mess owners
    const owners = await User.insertMany([
      {
        name: "Mess Owner One",
        role: "MESS_OWNER",
        phone: randomPhone(),
        email: "owner1@example.com",
        otp: 111111,
      },
      {
        name: "Mess Owner Two",
        role: "MESS_OWNER",
        phone: randomPhone(),
        email: "owner2@example.com",
        otp: 111111,
      },
    ]);
    console.log("Created Mess Owners ✅");

    // Step 1.1: Create base users (delivery, admin, etc.)
    await User.insertMany([
      {
        name: "Test Delivery",
        role: "DELIVERY",
        phone: 2222222222,
        email: "delivery@example.com",
        otp: 111111,
      },
      {
        name: "Super Admin",
        role: "SUPER_ADMIN",
        phone: 3333333333,
        email: "admin@example.com",
        otp: 111111,
      },
    ]);
    console.log("Created Other Users ✅");

    // Step 2: Register messes
    const messes = await MessDetails.insertMany([
      {
        mess_owner: owners[0]._id,
        mess_photos: ["https://example.com/mess1.jpg"],
        phone: randomPhone().toString(),
        mess_name: "Mess1",
        address: {
          line1: "123 Main Street",
          line2: "Near Market",
          city: "CityA",
          state: "StateA",
          pincode: "123456",
        },
      },
      {
        mess_owner: owners[1]._id,
        mess_photos: ["https://example.com/mess2.jpg"],
        phone: randomPhone().toString(),
        mess_name: "Mess2",
        address: {
          line1: "456 Side Street",
          line2: "Near Park",
          city: "CityB",
          state: "StateB",
          pincode: "654321",
        },
      },
    ]);
    console.log("Created Mess Details ✅");

    // Step 3: Tiffins & contents
    for (const mess of messes) {
      await Tiffin.insertMany([
        {
          mess_id: mess._id,
          items: [
            { name: "Roti", quantity: 3, unit: "pieces", nutrition: "Carbs", protein: "8g" },
            { name: "Dal", quantity: 1, unit: "bowl", nutrition: "Protein Rich", protein: "12g" },
            { name: "Rice", quantity: 1, unit: "plate", nutrition: "High Energy", protein: "5g" },
            { name: "Sabji", quantity: 1, unit: "bowl", nutrition: "Vitamins", protein: "6g" },
          ],
          type: "NORMAL",
          is_veg: true,
          photos: ["https://example.com/tiffin-normal.jpg"],
          maximum_price: 120,
        },
        {
          mess_id: mess._id,
          items: [
            { name: "Roti", quantity: 3, unit: "pieces", nutrition: "Carbs", protein: "8g" },
            { name: "Dal", quantity: 1, unit: "bowl", nutrition: "Protein Rich", protein: "12g" },
            { name: "Rice", quantity: 1, unit: "plate", nutrition: "High Energy", protein: "5g" },
            { name: "Sabji", quantity: 1, unit: "bowl", nutrition: "Vitamins", protein: "6g" },
            { name: "Dessert", quantity: 1, unit: "piece", nutrition: "Sweet Dish", protein: "2g" },
          ],
          type: "SPECIAL",
          is_veg: true,
          photos: ["https://example.com/tiffin-special.jpg"],
          maximum_price: 200,
        },
      ]);

      await MessTiffinTypeContents.insertMany([
        {
          mess_id: mess._id,
          type: "NORMAL",
          general_contents: [
            { name: "Chapati", quantity: 3, unit: "pieces", approx_nutrition_per_item: { calories: 70, protein: "3g" } },
            { name: "Dal", quantity: 1, unit: "bowl", approx_nutrition_per_item: { calories: 120, protein: "9g" } },
            { name: "Rice", quantity: 1, unit: "plate", approx_nutrition_per_item: { calories: 200, protein: "4g" } },
            { name: "Sabji", quantity: 1, unit: "bowl", approx_nutrition_per_item: { calories: 150, protein: "5g" } },
          ],
        },
        {
          mess_id: mess._id,
          type: "SPECIAL",
          general_contents: [
            { name: "Chapati", quantity: 3, unit: "pieces", approx_nutrition_per_item: { calories: 70, protein: "3g" } },
            { name: "Dal", quantity: 1, unit: "bowl", approx_nutrition_per_item: { calories: 120, protein: "9g" } },
            { name: "Rice", quantity: 1, unit: "plate", approx_nutrition_per_item: { calories: 200, protein: "4g" } },
            { name: "Sabji", quantity: 1, unit: "bowl", approx_nutrition_per_item: { calories: 150, protein: "5g" } },
            { name: "Dessert", quantity: 1, unit: "piece", approx_nutrition_per_item: { calories: 250, protein: "2g" } },
          ],
        },
      ]);
    }
    console.log("Created Tiffins + MessTiffinTypeContents ✅");

    // Step 4: Subscriptions
    const allSubs = [];
    for (const mess of messes) {
      const subscriptionDurations = ["DAILY", "TRIAL", "WEEKLY", "MONTHLY"];
      const subscriptionTypes = ["NORMAL", "SPECIAL"];
      const daySlots = ["AFTERNOON", "EVENING", "AFTERNOON+EVENING"];

      for (const duration of subscriptionDurations) {
        for (const type of subscriptionTypes) {
          for (const slot of daySlots) {
            let provided_tiffins = 0;
            let buffer_days = 0;
            let max_user_skips = 0;
            let max_mess_skips = 0;

            // ✅ Logic per duration
            if (duration === "DAILY") {
              provided_tiffins = 1;
              buffer_days = 2;
              max_user_skips = 1;
              max_mess_skips = 0;
            } else if (duration === "TRIAL") {
              provided_tiffins = 3;
              buffer_days = 1;
              max_user_skips = 1;
              max_mess_skips = 0;
            } else if (duration === "WEEKLY") {
              provided_tiffins = slot === "AFTERNOON+EVENING" ? 14 : 7;
              if (provided_tiffins === 7) {
                max_user_skips = 1; max_mess_skips = 1; buffer_days = 1;
              } else {
                max_user_skips = 2; max_mess_skips = 1; buffer_days = 2;
              }
            } else if (duration === "MONTHLY") {
              provided_tiffins = slot === "AFTERNOON+EVENING" ? 60 : 30;
              if (provided_tiffins === 30) {
                max_user_skips = 3; max_mess_skips = 2; buffer_days = 3;
              } else {
                max_user_skips = 5; max_mess_skips = 3; buffer_days = 5;
              }
            }

            // time slots
            let time_slots;
            if (slot === "AFTERNOON") {
              time_slots = [{ start_time: "11:00", end_time: "15:00" }];
            } else if (slot === "EVENING") {
              time_slots = [{ start_time: "19:00", end_time: "22:00" }];
            } else {
              time_slots = [
                { start_time: "11:00", end_time: "15:00" },
                { start_time: "19:00", end_time: "22:00" },
              ];
            }

            // pricing logic
            let basePrice;
            if (duration === "DAILY") basePrice = 100;       // example
            else if (duration === "TRIAL") basePrice = 250;  // example
            else if (duration === "WEEKLY") basePrice = 700;
            else basePrice = 2500; // MONTHLY

            const price = slot === "AFTERNOON+EVENING" ? basePrice * 2 : basePrice;

            const sub = await Subscription.create({
              mess_id: mess._id,
              subscription_duration: duration,
              day_slot: slot,
              price,
              type, // NORMAL or SPECIAL
              buffer_days,
              max_user_skips,
              max_mess_skips,
              provided_tiffins,
              time_slots,
              veg_only: true,
            });

            allSubs.push(sub);
          }
        }
      }
    }
    console.log("Created DAILY + TRIAL + WEEKLY + MONTHLY Subscriptions ✅");

    // Step 5: Customers with subscriptions
    const [weeklyCustomer, monthlyCustomer] = await User.insertMany([
      {
        name: "Weekly Customer",
        role: "CUSTOMER",
        phone: 7777777777,
        email: "weekly@example.com",
        otp: 111111,
      },
      {
        name: "Monthly Customer",
        role: "CUSTOMER",
        phone: 3030303030,
        email: "monthly@example.com",
        otp: 111111,
      },
    ]);

    // Pick one WEEKLY and one MONTHLY subscription
    const weeklyPlan = allSubs.find((s) => s.type === "WEEKLY");
    const monthlyPlan = allSubs.find((s) => s.type === "MONTHLY");

    if (weeklyPlan) {
      await UserSubscription.create({
        customer_id: weeklyCustomer._id,
        plan_id: weeklyPlan._id,
        delivery_preferences: {
          address: {
            line1: "Weekly Address",
            city: "CityA",
            state: "StateA",
            pincode: "123456",
            label: "Home",
          },
        },
        total_tiffins_left: weeklyPlan.provided_tiffins,
        payment: {
          payment_id: "pay_weekly_001",
          payment_status: "PAID",
          amount: weeklyPlan.price,
        },
      });
    }

    if (monthlyPlan) {
      await UserSubscription.create({
        customer_id: monthlyCustomer._id,
        plan_id: monthlyPlan._id,
        delivery_preferences: {
          address: {
            line1: "Monthly Address",
            city: "CityB",
            state: "StateB",
            pincode: "654321",
            label: "Home",
          },
        },
        total_tiffins_left: monthlyPlan.provided_tiffins,
        payment: {
          payment_id: "pay_monthly_001",
          payment_status: "PAID",
          amount: monthlyPlan.price,
        },
      });
    }

    console.log("Created UserSubscriptions ✅");
    console.log("Mock data creation completed 🎉");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding mock data ❌", error);
    mongoose.connection.close();
  }
};

// Run function
createMockData();
