const express = require("express");
const userRoute = require("./user.route");
const cartRoute = require("./cart.route");
const productRoute = require("./product.route");
const imageRoute = require("./images.route");

const router = express.Router();

router.use("/user", userRoute);
router.use("/cart", cartRoute);
router.use("/product", productRoute);
router.use("/image", imageRoute);

module.exports = router;