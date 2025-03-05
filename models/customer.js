const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      maxLength: [50, "Email must not exceed 50 characters"],
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
    },
    phone: {
      type: String,
      match: [/^\d{10,15}$/, "Phone number must be 10-15 digits"],
    },
    address: {
      street: {
        type: String,
        maxLength: [50, "Address cannot exceed 50 characters"],
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      zipCode: {
        type: String,
        match: [/^\d{5,10}$/, "ZIP code must be 5-10 digits"],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);

customerSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("Customer", customerSchema);
