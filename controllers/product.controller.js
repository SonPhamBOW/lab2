const Product = require("../models/product");

// Action: get all products

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find().populate(
      "category",
      "-_id name description"
    );
    if (products) {
      res.status(200).json({
        message: "Get all product successful",
        result: products,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.createNewProduct = async (req, res, next) => {
  try {
    const { name, price, stock, category } = req.body;
    const product = new Product({ name, price, stock, category });
    await product.save().then((newDoc) => {
      res.status(201).json({
        message: "Create new product successful",
        result: product,
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const products = await Product.findById(id);
    if (products) {
      res.status(200).json({
        message: `Get product by id: ${products.id} successful`,
        result: products,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const updateData = req.body; 

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id }, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: `Product ID: ${id} updated successfully`,
      result: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    next(error);
  }
};

