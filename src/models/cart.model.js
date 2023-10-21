const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    Product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;