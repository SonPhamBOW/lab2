const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
require("dotenv").config();
const AccessTokenValidator = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access token is required",
        status: 401,
      });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid token format",
        status: 401,
      });
    }

    const access_token = parts[1];

    let decoded;
    try {
      decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
        status: 401,
      });
    }

    const customer = await Customer.findById(decoded.id);

    if (!customer) {
      return res.status(401).json({
        message: "User not found",
        status: 401,
      });
    }

    req.users_decode = {
      customer,
      token: access_token,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = AccessTokenValidator;
