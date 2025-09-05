import Order from "../models/Order.js";

export const getOrdersForDeliveryBoy = async (req, res) => {
  try {
    const { deliveryBoyId } = req.params;

    if (!deliveryBoyId) {
      return res.status(400).json({
        success: false,
        message: "Delivery boy ID is required",
      });
    }

    const orders = await Order.find({
      delivery_boy_id: deliveryBoyId,
      status: { $in: ["IN_PROCESS", "OUT_FOR_DELIVERY"] }, // only active deliveries
    })
      .populate("customer_id", "name phone") // fetch customer info
      .populate("mess_tiffin_contents", "tiffin_type items") // fetch tiffin details
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this delivery boy",
      });
    }

    const formattedOrders = orders.map((order) => ({
      order_id: order._id,
      customer: order.customer_id,
      address: order.address,
      amount: order.amount,
      tiffin_type: order.mess_tiffin_contents?.tiffin_type || "N/A",
      items: order.mess_tiffin_contents?.items || [],
      status: order.status,
      order_time: order.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: formattedOrders,
    });
  } catch (error) {
    console.error("Error fetching orders for delivery boy:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
