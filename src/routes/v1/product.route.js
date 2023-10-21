const express = require("express");
const { productValidation } = require("../../validations");
const { productController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

/** create product */
router.post(
  "/create-product",
  validate(productValidation.createProduct),
  productController.createProduct
);

/** Get product list */
router.get(
  "/list",
  validate(productValidation.getProductList),
  productController.getProductList
);

/** Get product details by id */
router.get(
  "/get-details/:productId",
  validate(productValidation.getDetails),
  productController.getProductDetails
);

/** product details update by id */
router.put(
  "/update-details/:productId",
  validate(productValidation.updateDetails),
  productController.updateDetails
);

/** Delete product */
router.delete(
  "/delete-product/:productId",
  validate(productValidation.getDetails),
  productController.deleteProduct
);

module.exports = router;
