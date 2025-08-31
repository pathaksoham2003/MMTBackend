import mongoose from "../utils/db.js";
import User from "../models/User.js";
import MessDetails from "../models/MessDetails.js";
import Tiffin from "../models/Tiffin.js";
import Subscription from "../models/Subscription.js";

// Mock data helper
const randomPhone = () => Math.floor(6000000000 + Math.random() * 1000000000);

const createMockData = async () => {
  try {
    // Cleanup before seeding
    await User.deleteMany({});
    await MessDetails.deleteMany({});
    await Tiffin.deleteMany({});
    await Subscription.deleteMany({});

    console.log("Cleared old data ✅");

    // Step 1: Create 2 mess owners
    const owners = await User.insertMany([
      {
        name: "Mess Owner One",
        role: "MESS_OWNER",
        phone: randomPhone(),
        email: "owner1@example.com",
      },
      {
        name: "Mess Owner Two",
        role: "MESS_OWNER",
        phone: randomPhone(),
        email: "owner2@example.com",
      },
    ]);

    console.log("Created Mess Owners ✅");

    // Step 2: Register 1 mess each
    const messes = await MessDetails.insertMany([
      {
        mess_owner: owners[0]._id,
        mess_photos: ["https://example.com/mess1.jpg"],
        phone: randomPhone().toString(),
        mess_name:"Mess1",
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
        mess_name:"Mess2",
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

    // Step 3: Create 1 SPECIAL and 1 NORMAL tiffin each
    for (const mess of messes) {
      await Tiffin.insertMany([
        {
          mess_id: mess._id,
          items: [
            { name: "Roti", quantity: 4, unit: "pieces", nutrition: "Carbs", protein: "8g" },
            { name: "Dal", quantity: 1, unit: "bowl", nutrition: "Protein Rich", protein: "12g" },
            { name: "Rice", quantity: 1, unit: "plate", nutrition: "High Energy", protein: "5g" }
          ],
          type: "NORMAL",
          is_veg: true,
          photos: ["https://example.com/tiffin-normal.jpg"],
          maximum_price: 120,
        },
        {
          mess_id: mess._id,
          items: [
            { name: "Paneer Butter Masala", quantity: 1, unit: "bowl", nutrition: "High Protein", protein: "20g" },
            { name: "Naan", quantity: 2, unit: "pieces", nutrition: "Carbs", protein: "6g" },
            { name: "Salad", quantity: 1, unit: "plate", nutrition: "Fiber Rich", protein: "3g" }
          ],
          type: "SPECIAL",
          is_veg: false,
          photos: ["https://example.com/tiffin-special.jpg"],
          maximum_price: 200,
        },
      ]);
    }


    console.log("Created Tiffins ✅");

    // Step 4: Create 5 subscriptions each for DAILY, WEEKLY, MONTHLY per mess
    for (const mess of messes) {
      const subscriptionTypes = ["DAILY", "WEEKLY", "MONTHLY"];

      for (const type of subscriptionTypes) {
        const subs = [];
        for (let i = 1; i <= 5; i++) {
          let slot;
          if (i % 3 === 0) {
            slot = "AFTERNOON+EVENING"; // every 3rd subscription
          } else if (i % 2 === 0) {
            slot = "EVENING";
          } else {
            slot = "AFTERNOON";
          }

          subs.push({
            name: `${type} Plan ${i}`,
            mess_id: mess._id,
            day_slot: slot,
            price: (100 * i).toFixed(2),
            type: type,
            buffer_days: 2,
            provided_tiffins: type === "DAILY" ? 30 : type === "WEEKLY" ? 4 : 1,
            time_slots: [
              { start_time: "11:00", end_time: "15:00" },
              { start_time: "19:00", end_time: "22:00" },
            ],
            veg_only: i % 2 === 0,
          });
        }
        await Subscription.insertMany(subs);
      }
    }


    console.log("Created Subscriptions ✅");
    console.log("Mock data creation completed 🎉");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding mock data ❌", error);
    mongoose.connection.close();
  }
};

// Run function
createMockData();
