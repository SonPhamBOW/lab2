const Customer = require("../models/customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, email, password, phone, address } = req.body;
      console.log(req.body);

      const newCustomer = new Customer({
        name,
        email,
        password,
        phone,
        address,
      });

      await newCustomer.save();

      const token = jwt.sign(
        {
          id: newCustomer._id,
          email: newCustomer.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(201).json({
        message: "User registered successfully",
        data: {
          customer: {
            _id: newCustomer._id,
            name: newCustomer.name,
            email: newCustomer.email,
          },
          token,
        },
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Validation Error",
          errors: Object.values(error.errors).map((err) => err.message),
        });
      }

      if (error.code === 11000) {
        return res.status(409).json({
          message: "User with this email already exists",
        });
      }

      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const customer = await Customer.findOne({ email });
      if (!customer) {
        return res.status(401).json({
          message: "Email does not exist in the system",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, customer.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Wrong password, please re-enter",
        });
      }

      const access_token = jwt.sign(
        {
          id: customer._id,
          email: customer.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const { password: pwd, ...customerWithoutPassword } = customer.toObject();
      req.users_decode = {
        customer: customerWithoutPassword,
      };

      res.status(200).json({
        message: "Login successful",
        data: {
          customer: {
            _id: customer._id,
            name: customer.name,
            email: customer.email,
          },
          access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const customer = req.users_decode.customer.toObject();
      const { password, ...customerWithoutPassword } = customer;

      res.status(200).json({
        message: "Profile fetched successfully",
        data: {
          customer: customerWithoutPassword,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateProfile(req, res, next) {
    try {
      const customer = req.users_decode.customer;
      const { name, phone, address } = req.body;
      customer.name = name;
      customer.phone = phone;
      customer.address = address;
      await customer.save();

      res.status(200).json({
        message: "Profile updated successfully",
        data: {
          customer: {
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
