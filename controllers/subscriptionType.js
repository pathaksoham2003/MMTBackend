import SubscriptionTypes from "../models/SubscriptionTypes.js";

// Create a new subscription type
export const createSubscriptionType = async (req, res) => {
  try {
    const {type, buffer_days, provided_tiffins} = req.body;

    if (!type || buffer_days == null || provided_tiffins == null) {
      return res.status(400).json({error: "All fields are required"});
    }

    const subscriptionType = new SubscriptionTypes({
      type: type.toUpperCase(),
      buffer_days,
      provided_tiffins,
    });

    await subscriptionType.save();
    res.status(201).json(subscriptionType);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// Get all subscription types
export const getSubscriptionTypes = async (req, res) => {
  try {
    const subscriptionTypes = await SubscriptionTypes.find();
    res.status(200).json(subscriptionTypes);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// Get a subscription type by ID
export const getSubscriptionTypeById = async (req, res) => {
  try {
    const {id} = req.params;
    const subscriptionType = await SubscriptionTypes.findById(id);
    if (!subscriptionType) {
      return res.status(404).json({error: "Subscription type not found"});
    }
    res.status(200).json(subscriptionType);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
