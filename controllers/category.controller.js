const Category = require("../models/category");
const Product = require("../models/product");

// 🏷 Lấy tất cả danh mục
exports.getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json(categories);
    // res.status(200).json({
    //     success: true,
    //     message: "List of categories",
    //     categories: categories.map(category => ({
    //         id: category._id,
    //         name: category.name,
    //         description: category.description
    //     }))
    // });
  } catch (error) {
    next(error);
  }
};

// Lay category theo id
exports.getCategoryById = async (req, res, next) => {
  try {
    let { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// ➕ Thêm danh mục mới
exports.addCategory = async (req, res, next) => {
  try {
    let { name, description } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required!" });
    }

    name = name.trim(); // Xóa khoảng trắng thừa

    // Kiểm tra danh mục đã tồn tại chưa
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category name already exists!" });
    }

    // Tạo danh mục mới
    const newCategory = new Category({ name, description });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cap nhat category theo id
exports.updateCategoryById = async (req, res, next) => {
  try {
    let { categoryId } = req.params;
    let { name, description } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required!" });
    }

    name = name.trim(); // Xóa khoảng trắng thừa

    // Tìm category theo id
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    // Cập nhật category
    category.name = name;
    category.description = description;
    await category.save();

    //res.status(200).json(category);
    // Định dạng JSON trả về
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: {
        id: category._id,
        name: category.name,
        description: category.description,
      },
    });

    // Định dạng JSON trả về
    // res.status(200).json({
    //     success: true,
    //     message: "Category updated successfully",
    //     result: {
    //         id: category._id,
    //         name: category.name,
    //         description: category.description
    //     }
    // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete category by id and remove related products
exports.deleteCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    // Kiểm tra xem danh mục có tồn tại không
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    // Xóa tất cả sản phẩm thuộc danh mục này
    await Product.deleteMany({ category: categoryId });

    // Xóa danh mục
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message: "Category and related products deleted successfully",
      deletedCategory: {
        id: category._id,
        name: category.name,
        description: category.description,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
