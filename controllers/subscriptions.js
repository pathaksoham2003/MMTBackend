import Subscription from "../models/Subscription.js";

// Create a subscription
export const createSubscription = async (req, res) => {
  try {
    const {
      subscription_duration, // 👈 updated
      mess_id,
      day_slot,
      price,
      type,                 // NORMAL | SPECIAL
      buffer_days,
      max_user_skips,
      max_mess_skips,
      provided_tiffins,
      time_slots,
      veg_only,
    } = req.body;

    // Validation
    if (
      !subscription_duration ||
      !mess_id ||
      !day_slot ||
      price == null ||
      !type ||
      buffer_days == null ||
      max_user_skips == null ||
      max_mess_skips == null ||
      provided_tiffins == null ||
      !time_slots ||
      veg_only == null
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const subscription = new Subscription({
      subscription_duration,
      mess_id,
      day_slot,
      price,
      type,
      buffer_days,
      max_user_skips,
      max_mess_skips,
      provided_tiffins,
      time_slots,
      veg_only,
    });

    await subscription.save();
    res.status(201).json(subscription.toObject({ getters: true }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all subscriptions with pagination and filters
export const getSubscriptions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filters = {};
    if (req.query.mess_id) filters.mess_id = req.query.mess_id;
    if (req.query.day_slot) filters.day_slot = req.query.day_slot;
    if (req.query.veg_only != null)
      filters.veg_only = req.query.veg_only === "true";
    if (req.query.type) filters.type = req.query.type;
    if (req.query.subscription_duration)
      filters.subscription_duration = req.query.subscription_duration;

    const total = await Subscription.countDocuments(filters);
    const subscriptions = await Subscription.find(filters)
      .skip(skip)
      .limit(limit)
      .lean();

    // transform response
    const formatted = subscriptions.map((s) => {
      const validityDays =
        s.subscription_duration === "WEEKLY"
          ? 7
          : s.subscription_duration === "MONTHLY"
          ? 30
          : 1; // fallback: DAILY = 1
      const totalValidity = validityDays + (s.buffer_days || 0);

      return {
        id:s._id,
        subscription_duration: s.subscription_duration,
        type: s.type,
        day_slot: s.day_slot,
        price: parseFloat(s.price),
        price_per_meal: (parseFloat(s.price) / s.provided_tiffins).toFixed(2),
        validity_days: totalValidity,
        provided_tiffins: s.provided_tiffins,
        veg_only: s.veg_only,
        active: s.active,
      };
    });

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      subscriptions: formatted,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get subscription by ID
export const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id)
      .populate("mess_id")
      .lean();

    if (!subscription)
      return res.status(404).json({ error: "Subscription not found" });

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle active/inactive subscription
export const toggleSubscriptionActive = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id);

    if (!subscription)
      return res.status(404).json({ error: "Subscription not found" });

    subscription.active = !subscription.active;
    await subscription.save();

    res.status(200).json(subscription.toObject({ getters: true }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
