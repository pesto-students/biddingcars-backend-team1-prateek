const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    paymentDetails: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
    country: {
      type: String,
    },
    mobileNumber: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      required:true,
    },
    customerName: {
      type: String,
      },
      accountNumber: {
        type: Number,
      },
      aadharNumber: {
        type: Number,
      },
      panNumber: {
        type: String,
        },
        accountType: {
        type: String,
        enum: ["Current", "Savings"],
      },
      creditScore: {
        type: Number,
      },
      annualAvgIncome: {
        type: Number,
      },incomeSource:{ type: String}
  },
  {
    timestamps: true,
  }
);

const User =  mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
