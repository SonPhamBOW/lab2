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
    next(error)
  }
};

exports.getAllOrder = async (req, res, next) => {
    
};

exports.updateStatusOrder = async (req, res, next) => {};
