import Subscription from "../models/Subscription.js";

// Create a subscription
export const createSubscription = async (req, res) => {
  try {
    const {
      name,
      mess_id,
      day_slot,
      price,
      type,
      buffer_days,
      max_user_skips,   // 👈 NEW
      max_mess_skips,   // 👈 NEW
      provided_tiffins,
      time_slots,
      veg_only,
    } = req.body;

    // Validation
    if (
      !name ||
      !mess_id ||
      !day_slot ||
      price == null ||
      !type ||
      buffer_days == null ||
      max_user_skips == null || // 👈 NEW
      max_mess_skips == null || // 👈 NEW
      provided_tiffins == null ||
      !time_slots ||
      veg_only == null
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const subscription = new Subscription({
      name,
      mess_id,
      day_slot,
      price,
      type,
      buffer_days,
      max_user_skips,   // 👈 NEW
      max_mess_skips,   // 👈 NEW
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
    if (req.query.name)
      filters.name = { $regex: req.query.name, $options: "i" };

    const total = await Subscription.countDocuments(filters);
    const subscriptions = await Subscription.find(filters)
      .populate("mess_id")
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      subscriptions,
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
