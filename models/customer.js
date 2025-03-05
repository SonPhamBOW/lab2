const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [50, "Tên không được vượt quá 50 ký tự"],
    },
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      maxLength: [50, "Email không được vượt quá 50 ký tự"],
      match: [/.+@.+\..+/, "Vui lòng nhập địa chỉ email hợp lệ"],
    },
    password: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc"],
      minLength: [8, "Mật khẩu phải có ít nhất 8 ký tự"],
    },
    phone: {
      type: String,
      match: [/^\d{10,15}$/, "Số điện thoại phải từ 10-15 chữ số"],
    },
    address: {
      street: {
        type: String,
        maxLength: [50, "Địa chỉ không được vượt quá 50 ký tự"],
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
        match: [/^\d{5,10}$/, "Mã ZIP phải từ 5-10 chữ số"],
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
