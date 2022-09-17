const { Schema, model } = require("mongoose");

const MonitorPriceSchema = new Schema(
  {
    price: Number,
    coin: String,
    email:String
  },
  { timestamps: true },
);

const MonitorPrice = model("monitor",MonitorPriceSchema);
module.exports = MonitorPrice