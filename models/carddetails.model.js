const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carddetailsSchema = new Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId,
    refPath: 'User',
    },
    customerName: {
    type: String,
    required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    aadharNumber: {
      type: Number,
      required: true,
    },
    panNumber: {
      type: String,
      required: true,
      },
      accountType: {
      type: String,
      enum: ["Current", "Savings"],
      required: true,
    },
    creditScore: {
      type: Number,
      required: true,
    },
    annualAvgIncome: {
      type: Number,
      required: true,
    },incomeSource:{ type: String,
      required: true,}
  },
  {
    timestamps: true,
  }
);

const Carddetails =  mongoose.models.Carddetails || mongoose.model("Carddetails", carddetailsSchema);

module.exports = Carddetails;
