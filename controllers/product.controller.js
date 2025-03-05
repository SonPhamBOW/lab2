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
    if (!name || !price || !stock || !category) {
      return res.status(400).json({ message: "Invalid input" });
    }
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
    const { productId } = req.params; 
    if (!productId) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }
    const product = await Product.findById(productId); 
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: `Get product by id: ${product.id} successful`,
      result: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: `Product ID: ${productId} updated successfully`,
      result: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const deletedProduct = await Product.findOneAndDelete(
      { _id: productId },
      { new: true }
    );
    const products = await Product.find();

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: `Product ID: ${productId} deleted successfully`,
      result: products,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    next(error);
  }
};

exports.getProductsByCategoryId = async (req, res, next) => {
  try {
    const { categoryId } = req.params; 

    if (!categoryId) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const products = await Product.find({ category: categoryId }).populate(
      "category",
      "name description"
    );

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json({
      message: `Get products by category ID: ${categoryId} successful`,
      result: products,
    });
  } catch (error) {
    console.error("Error getting products:", error);
    next(error);
  }
};


exports.getProductsByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    const products = await Product.find({ 
      name: { $regex: name, $options: "i" } 
    }).populate("category", "name description");

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found with this name" });
    }

    res.status(200).json({
      message: `Get product by name: ${name} successful`,
      result: products,
    });
  } catch (error) {
    console.error("Error getting products by name:", error);
    next(error);
  }
};



exports.getProductsByPrice = async (req, res, next) => {
  try {
    const { minPrice, maxPrice } = req.query; 

    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || 100;

    if (min < 0 || max < 0 || min > max) {
      return res.status(400).json({ message: "Invalid price range" });
    }

    const products = await Product.find({ 
      price: { $gte: min, $lte: max } 
    }).populate("category", "name description");

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in this price range" });
    }

    res.status(200).json({
      message: `Get products between ${min} - ${max} successful`,
      result: products,
    });
  } catch (error) {
    console.error("Error getting products by price:", error);
    next(error);
  }
};






