import mongoose from "../utils/db.js";
import fs from "fs";
import bcrypt from "bcrypt";
import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

// Get current file directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import all models
import User from "../models/User.js";
import UserSubscription from "../models/UserSubscription.js";
import Order from "../models/Order.js";
import DeliveryFeedback from "../models/DeliveryFeedback.js";
import TimeSlots from "../models/TimeSlots.js";
import Subscription from "../models/Subscription.js";
import SubscriptionTypes from "../models/SubscriptionTypes.js";
import DaySlotTypes from "../models/DaySlotTypes.js";
import TiffinTypes from "../models/TiffinTypes.js";
import Tiffin from "../models/Tiffin.js";
import MessDetails from "../models/MessDetails.js";
import FoodFeedback from "../models/FoodFeedback.js";

// Helper function to get file path and check existence
const getFilePath = (filename) => {
  const filePath = path.join(__dirname, "data", filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}. Please make sure the data folder exists and contains all CSV files.`);
  }
  return filePath;
};

// Helper function to clean and validate CSV data
const cleanRowData = (row) => {
  const cleaned = {};
  for (const [key, value] of Object.entries(row)) {
    // Remove quotes and trim whitespace
    let cleanValue = typeof value === 'string' ? value.replace(/^"|"$/g, '').trim() : value;
    
    // Convert empty strings to null/undefined for optional fields
    if (cleanValue === '' || cleanValue === '""') {
      cleaned[key] = '';
    } else {
      cleaned[key] = cleanValue;
    }
  }
  return cleaned;
};

// Seed Time Slots
const seedTimeSlots = async () => {
  try {
    const filePath = getFilePath("timeSlots.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const timeSlots = rows.map(row => {
      const cleanRow = cleanRowData(row);
      
      // Validate required fields
      if (!cleanRow.time || !cleanRow.type) {
        throw new Error(`Missing required fields in timeSlots row: ${JSON.stringify(cleanRow)}`);
      }
      
      return {
        time: cleanRow.time,
        type: cleanRow.type
      };
    });

    await TimeSlots.insertMany(timeSlots);
    console.log(`✅ Seeded ${timeSlots.length} time slots`);
    return await TimeSlots.find({});
  } catch (err) {
    console.error("❌ Error seeding time slots:", err.message);
    return [];
  }
};

// Seed Subscription Types
const seedSubscriptionTypes = async () => {
  try {
    const filePath = getFilePath("subscriptionTypes.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const subscriptionTypes = rows.map(row => {
      const cleanRow = cleanRowData(row);
      
      // Validate required fields
      if (!cleanRow.time || !cleanRow.type) {
        throw new Error(`Missing required fields in subscriptionTypes row: ${JSON.stringify(cleanRow)}`);
      }
      
      return {
        time: cleanRow.time,
        type: cleanRow.type
      };
    });

    await SubscriptionTypes.insertMany(subscriptionTypes);
    console.log(`✅ Seeded ${subscriptionTypes.length} subscription types`);
    return await SubscriptionTypes.find({});
  } catch (err) {
    console.error("❌ Error seeding subscription types:", err.message);
    return [];
  }
};

// Seed Day Slot Types
const seedDaySlotTypes = async () => {
  try {
    const filePath = getFilePath("daySlotTypes.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const daySlotTypes = rows.map(row => {
      const cleanRow = cleanRowData(row);
      
      // Validate required fields
      if (!cleanRow.time || !cleanRow.type) {
        throw new Error(`Missing required fields in daySlotTypes row: ${JSON.stringify(cleanRow)}`);
      }
      
      return {
        time: cleanRow.time,
        type: cleanRow.type
      };
    });

    await DaySlotTypes.insertMany(daySlotTypes);
    console.log(`✅ Seeded ${daySlotTypes.length} day slot types`);
    return await DaySlotTypes.find({});
  } catch (err) {
    console.error("❌ Error seeding day slot types:", err.message);
    return [];
  }
};

// Seed Tiffin Types
const seedTiffinTypes = async () => {
  try {
    const filePath = getFilePath("tiffinTypes.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const tiffinTypes = rows.map(row => {
      const cleanRow = cleanRowData(row);
      
      // Validate required fields
      if (!cleanRow.name || !cleanRow.description) {
        throw new Error(`Missing required fields in tiffinTypes row: ${JSON.stringify(cleanRow)}`);
      }
      
      return {
        name: cleanRow.name,
        description: cleanRow.description
      };
    });

    await TiffinTypes.insertMany(tiffinTypes);
    console.log(`✅ Seeded ${tiffinTypes.length} tiffin types`);
    return await TiffinTypes.find({});
  } catch (err) {
    console.error("❌ Error seeding tiffin types:", err.message);
    return [];
  }
};

// Seed Users
const seedUsers = async () => {
  try {
    const filePath = getFilePath("users.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const users = await Promise.all(rows.map(async (row) => {
      const cleanRow = cleanRowData(row);
      
      const addresses = [];
      if (cleanRow.address_line1) {
        addresses.push({
          line1: cleanRow.address_line1,
          line2: cleanRow.address_line2 || "",
          city: cleanRow.city,
          state: cleanRow.state,
          pincode: cleanRow.pincode
        });
      }

      return {
        name: cleanRow.name,
        avatar: cleanRow.avatar || "",
        role: cleanRow.role,
        phone: parseInt(cleanRow.phone),
        otp: cleanRow.otp ? parseInt(cleanRow.otp) : undefined,
        addresses: addresses,
        is_active: cleanRow.is_active === 'true' || cleanRow.is_active === true,
        created_at: new Date(),
        updated_at: new Date()
      };
    }));

    await User.insertMany(users);
    console.log(`✅ Seeded ${users.length} users`);
    return await User.find({});
  } catch (err) {
    console.error("❌ Error seeding users:", err.message);
    return [];
  }
};

// Seed Mess Details
const seedMessDetails = async (users) => {
  try {
    const filePath = getFilePath("messDetails.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const messOwners = users.filter(user => user.role === 'MESS_OWNER');
    if (messOwners.length === 0) {
      throw new Error("No mess owners found in users data");
    }

    const messDetails = rows.map((row, index) => {
      const cleanRow = cleanRowData(row);
      const owner = messOwners[index % messOwners.length];
      
      const menuItems = cleanRow.menu_items ? cleanRow.menu_items.split(',').map(item => item.trim()) : [];

      return {
        mess_owner: owner._id,
        mess_photos: cleanRow.mess_photos ? cleanRow.mess_photos.split(',').map(photo => photo.trim()) : [],
        menu: {
          special_array_of_menu_items_offered: menuItems
        },
        phone: cleanRow.phone.toString(),
        address: {
          line1: cleanRow.address_line1,
          line2: cleanRow.address_line2 || "",
          city: cleanRow.city,
          state: cleanRow.state,
          pincode: cleanRow.pincode
        },
        created_at: new Date(),
        updated_at: new Date()
      };
    });

    await MessDetails.insertMany(messDetails);
    console.log(`✅ Seeded ${messDetails.length} mess details`);
    
    // Update users with mess_id references
    const createdMess = await MessDetails.find({});
    for (let mess of createdMess) {
      await User.findByIdAndUpdate(mess.mess_owner, { mess_id: mess._id });
    }
    
    return createdMess;
  } catch (err) {
    console.error("❌ Error seeding mess details:", err.message);
    return [];
  }
};

// Seed Subscriptions
const seedSubscriptions = async (daySlotTypes, timeSlots) => {
  try {
    const filePath = getFilePath("subscriptions.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const subscriptions = rows.map(row => {
      const cleanRow = cleanRowData(row);
      
      const daySlot = daySlotTypes.find(ds => ds.type === cleanRow.day_slot_type);
      const timeSlot = timeSlots.find(ts => ts.type === cleanRow.time_slot_type);

      if (!daySlot || !timeSlot) {
        throw new Error(`Referenced day slot or time slot not found for row: ${JSON.stringify(cleanRow)}`);
      }

      return {
        day_slot: daySlot._id,
        price: parseFloat(cleanRow.price),
        time_slot: timeSlot._id,
        buffer_days: parseInt(cleanRow.buffer_days),
        provided_tiffins: parseInt(cleanRow.provided_tiffins),
        veg_only: cleanRow.veg_only === 'true' || cleanRow.veg_only === true,
        created_at: new Date(),
        updated_at: new Date()
      };
    });

    await Subscription.insertMany(subscriptions);
    console.log(`✅ Seeded ${subscriptions.length} subscriptions`);
    return await Subscription.find({});
  } catch (err) {
    console.error("❌ Error seeding subscriptions:", err.message);
    return [];
  }
};

// Seed Tiffins
const seedTiffins = async (messDetails, tiffinTypes, users) => {
  try {
    const filePath = getFilePath("tiffins.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const tiffins = rows.map(row => {
      const cleanRow = cleanRowData(row);
      
      const mess = messDetails.find(m => m.phone === cleanRow.mess_phone.toString());
      const tiffinType = tiffinTypes.find(tt => tt.name === cleanRow.type_name);
      
      if (!mess || !tiffinType) {
        throw new Error(`Referenced mess or tiffin type not found for row: ${JSON.stringify(cleanRow)}`);
      }
      
      const messOwner = users.find(u => u._id.toString() === mess.mess_owner.toString());

      return {
        mess_id: mess._id,
        mess_owner: messOwner._id,
        items: {
          quantity: parseInt(cleanRow.quantity) || 0,
          unit: cleanRow.unit || "piece",
          nutrition: cleanRow.nutrition || "",
          protein: cleanRow.protein || ""
        },
        type: tiffinType._id,
        is_veg: cleanRow.is_veg === 'true' || cleanRow.is_veg === true,
        photos: cleanRow.photos ? cleanRow.photos.split(',').map(photo => photo.trim()) : [],
        maximum_price: parseFloat(cleanRow.maximum_price),
        created_at: new Date(),
        updated_at: new Date()
      };
    });

    await Tiffin.insertMany(tiffins);
    console.log(`✅ Seeded ${tiffins.length} tiffins`);
    return await Tiffin.find({});
  } catch (err) {
    console.error("❌ Error seeding tiffins:", err.message);
    return [];
  }
};

// Seed User Subscriptions
const seedUserSubscriptions = async (users, subscriptions, messDetails) => {
  try {
    const filePath = getFilePath("userSubscriptions.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const customers = users.filter(user => user.role === 'CUSTOMER');
    if (customers.length === 0) {
      throw new Error("No customers found in users data");
    }

    const userSubscriptions = rows.map((row, index) => {
      const cleanRow = cleanRowData(row);
      const customer = customers[index % customers.length];
      const subscription = subscriptions[index % subscriptions.length];
      const mess = messDetails[index % messDetails.length];

      return {
        customer_id: customer._id,
        plan_id: subscription._id,
        mess_id: mess._id,
        end_date: new Date(cleanRow.end_date),
        delivery_preferences: {
          address: {
            line1: cleanRow.delivery_line1,
            city: cleanRow.delivery_city,
            state: cleanRow.delivery_state,
            pincode: cleanRow.delivery_pincode,
            label: cleanRow.delivery_label || "Home"
          }
        },
        total_tiffins_left: parseInt(cleanRow.total_tiffins_left),
        payment: {
          payment_id: cleanRow.payment_id || `PAY_${Date.now()}`,
          payment_status: cleanRow.payment_status || "completed",
          amount: parseFloat(cleanRow.payment_amount)
        },
        is_active: cleanRow.is_active === 'true' || cleanRow.is_active === true,
        created_at: new Date(),
        updated_at: new Date()
      };
    });

    await UserSubscription.insertMany(userSubscriptions);
    console.log(`✅ Seeded ${userSubscriptions.length} user subscriptions`);
    return await UserSubscription.find({});
  } catch (err) {
    console.error("❌ Error seeding user subscriptions:", err.message);
    return [];
  }
};

// Seed Orders
const seedOrders = async (users, userSubscriptions, messDetails, tiffins) => {
  try {
    const filePath = getFilePath("orders.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const customers = users.filter(user => user.role === 'CUSTOMER');
    const deliveryBoys = users.filter(user => user.role === 'DELIVERY');
    
    if (customers.length === 0 || deliveryBoys.length === 0) {
      throw new Error("Missing customers or delivery boys in users data");
    }

    const orders = rows.map((row, index) => {
      const cleanRow = cleanRowData(row);
      const customer = customers[index % customers.length];
      const userSub = userSubscriptions[index % userSubscriptions.length];
      const mess = messDetails[index % messDetails.length];
      const tiffin = tiffins[index % tiffins.length];
      const deliveryBoy = deliveryBoys[index % deliveryBoys.length];

      return {
        customer_id: customer._id,
        user_subscription_id: userSub._id,
        mess_id: mess._id,
        tiffin_id: tiffin._id,
        status: cleanRow.status || 'in_process',
        address: {
          line1: cleanRow.address_line1,
          line2: cleanRow.address_line2 || "",
          city: cleanRow.city,
          state: cleanRow.state,
          pincode: cleanRow.pincode,
          label: cleanRow.address_label || "Home"
        },
        delivery_boy_id: deliveryBoy._id,
        payment: {
          payment_id: cleanRow.payment_id || `ORD_PAY_${Date.now()}`,
          payment_status: cleanRow.payment_status || "pending",
          amount: parseFloat(cleanRow.payment_amount)
        },
        delivered_at: cleanRow.delivered_at && cleanRow.delivered_at !== '' ? new Date(cleanRow.delivered_at) : undefined,
        amount: parseFloat(cleanRow.amount),
        created_at: new Date(),
        updated_at: new Date()
      };
    });

    await Order.insertMany(orders);
    console.log(`✅ Seeded ${orders.length} orders`);
    return await Order.find({});
  } catch (err) {
    console.error("❌ Error seeding orders:", err.message);
    return [];
  }
};

// Seed Delivery Feedback
const seedDeliveryFeedback = async (users, orders) => {
  try {
    const filePath = getFilePath("deliveryFeedback.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const customers = users.filter(user => user.role === 'CUSTOMER');

    const feedback = rows.map((row, index) => {
      const cleanRow = cleanRowData(row);
      const customer = customers[index % customers.length];
      const order = orders[index % orders.length];

      return {
        user_id: customer._id,
        feedback_image: cleanRow.feedback_image || "",
        delivery_id: order._id,
        rating: parseInt(cleanRow.rating),
        comment: cleanRow.comment || "",
        created_at: new Date()
      };
    });

    await DeliveryFeedback.insertMany(feedback);
    console.log(`✅ Seeded ${feedback.length} delivery feedback entries`);
    return feedback;
  } catch (err) {
    console.error("❌ Error seeding delivery feedback:", err.message);
    return [];
  }
};

// Seed Food Feedback
const seedFoodFeedback = async (users, tiffins) => {
  try {
    const filePath = getFilePath("foodFeedback.csv");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const customers = users.filter(user => user.role === 'CUSTOMER');

    const feedback = rows.map((row, index) => {
      const cleanRow = cleanRowData(row);
      const customer = customers[index % customers.length];
      const tiffin = tiffins[index % tiffins.length];

      return {
        user_id: customer._id,
        tiffin_id: tiffin._id,
        feedback_image: cleanRow.feedback_image || "",
        rating: parseInt(cleanRow.rating),
        comment: cleanRow.comment || "",
        created_at: new Date()
      };
    });

    await FoodFeedback.insertMany(feedback);
    console.log(`✅ Seeded ${feedback.length} food feedback entries`);
    return feedback;
  } catch (err) {
    console.error("❌ Error seeding food feedback:", err.message);
    return [];
  }
};

// Flush all collections
const flushAll = async () => {
  try {
    await User.deleteMany({});
    await UserSubscription.deleteMany({});
    await Order.deleteMany({});
    await DeliveryFeedback.deleteMany({});
    await TimeSlots.deleteMany({});
    await Subscription.deleteMany({});
    await SubscriptionTypes.deleteMany({});
    await DaySlotTypes.deleteMany({});
    await TiffinTypes.deleteMany({});
    await Tiffin.deleteMany({});
    await MessDetails.deleteMany({});
    await FoodFeedback.deleteMany({});
    console.log("✅ All collections flushed");
  } catch (err) {
    console.error("❌ Error flushing collections:", err.message);
  }
};

// Main seeder function
const runSeeder = async () => {
  try {
    console.log("🚀 Starting seeder...");
    console.log("📁 Looking for data files in:", path.join(__dirname, "data"));
    
    // Check if data directory exists
    const dataDir = path.join(__dirname, "data");
    if (!fs.existsSync(dataDir)) {
      throw new Error(`Data directory not found: ${dataDir}. Please create the data folder and run the CSV creation batch file first.`);
    }
    
    // Flush all existing data
    await flushAll();
    
    // Seed reference tables first
    console.log("📊 Seeding reference tables...");
    const timeSlots = await seedTimeSlots();
    const subscriptionTypes = await seedSubscriptionTypes();
    const daySlotTypes = await seedDaySlotTypes();
    const tiffinTypes = await seedTiffinTypes();
    
    if (timeSlots.length === 0 || daySlotTypes.length === 0 || tiffinTypes.length === 0) {
      throw new Error("Failed to seed required reference data. Cannot continue.");
    }
    
    console.log("👥 Seeding users...");
    const users = await seedUsers();
    if (users.length === 0) {
      throw new Error("Failed to seed users. Cannot continue.");
    }
    
    console.log("🏪 Seeding mess details...");
    const messDetails = await seedMessDetails(users);
    if (messDetails.length === 0) {
      throw new Error("Failed to seed mess details. Cannot continue.");
    }
    
    console.log("📋 Seeding subscriptions...");
    const subscriptions = await seedSubscriptions(daySlotTypes, timeSlots);
    if (subscriptions.length === 0) {
      throw new Error("Failed to seed subscriptions. Cannot continue.");
    }
    
    console.log("🍱 Seeding tiffins...");
    const tiffins = await seedTiffins(messDetails, tiffinTypes, users);
    if (tiffins.length === 0) {
      throw new Error("Failed to seed tiffins. Cannot continue.");
    }
    
    console.log("👤 Seeding user subscriptions...");
    const userSubscriptions = await seedUserSubscriptions(users, subscriptions, messDetails);
    
    console.log("📦 Seeding orders...");
    const orders = await seedOrders(users, userSubscriptions, messDetails, tiffins);
    
    console.log("💬 Seeding feedback...");
    await seedDeliveryFeedback(users, orders);
    await seedFoodFeedback(users, tiffins);
    
    console.log("\n🎉 All data seeded successfully!");
    console.log("📊 Summary:");
    console.log(`  - ${timeSlots.length} time slots`);
    console.log(`  - ${subscriptionTypes.length} subscription types`);
    console.log(`  - ${daySlotTypes.length} day slot types`);
    console.log(`  - ${tiffinTypes.length} tiffin types`);
    console.log(`  - ${users.length} users`);
    console.log(`  - ${messDetails.length} mess details`);
    console.log(`  - ${subscriptions.length} subscriptions`);
    console.log(`  - ${tiffins.length} tiffins`);
    console.log(`  - ${userSubscriptions.length} user subscriptions`);
    console.log(`  - ${orders.length} orders`);
    
  } catch (err) {
    console.error("❌ Seeder failed:", err.message);
    console.error("Stack trace:", err.stack);
    process.exit(1);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

// Export for use as module or run directly
export default runSeeder;

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runSeeder();
}