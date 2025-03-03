const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
  name: { maxLength: [50, "Name cannot be greater than 50 characters"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    maxLength: [50, "Email cannot be greater than 50 characters"],
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters long"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    match: [/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"],
  },
  address: [
    {
      street: {
        type: String,
        required: [true, "Street is required"],
        maxLength: [50, "Street cannot be greater than 50 characters"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
      },
      country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
      },
      zipCode: {
        type: String,
        required: [true, "Zip Code is required"],
        match: [/^\d{5,10}$/, "Zip Code must be between 5 and 10 digits"],
      },
    },
  ],
});

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
