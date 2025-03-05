const Order = require("../models/order");

exports.createNewOrder = async (req, res, next) => {
  try {
    const { products } = req.body;
    const customerId = req.users_decode.customer._id;
    const totalPrice = products.reduce(
      (acc, p) => acc + p.quantity * p.priceAtPurchase,
      0
    );
    const newOrder = new Order({ customerId, products, totalPrice });
    await newOrder.save().then((newDoc) => {
      res.status(201).json({
        message: "Create new order successful",
        result: newOrder,
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const customerId = req.users_decode.customer._id;
    const orders = await Order.find({ customer: customerId })
      .populate("customer")
      .populate({
        path: "products.product",
        model: "Product",
      });
    if (orders) {
      res.status(200).json({
        message: "get all order successful",
        order: orders,
      });
    } else {
      res.status(400).json({
        message: "you need add product to order",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateStatusOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = req.body;
    if (!id) {
      res.status(400).json({
        message: "order is not existed",
      });
    } else {
      const updateOrder = await Order.findOneAndUpdate({ _id: id }, order, {
        new: true,
        runValidators: true,
      });
      await Order.deleteMany;

      if (!updateOrder) {
        res.status(400).json({
          message: "Order can not found",
        });
      } else {
        res.status(200).json({
          message: "Order update successfully",
          order: updateOrder,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
