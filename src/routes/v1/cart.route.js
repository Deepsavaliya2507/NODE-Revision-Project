const express = require("express");
const { cartValidation } = require("../../validations");
const { cartController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

/** create cart */
router.post(
  "/create-cart",
  validate(cartValidation.createCart),
  cartController.createCart
);

/** Get cart list */
router.get(
  "/list",
  validate(cartValidation.getCartList),
  cartController.getCartList
);

/** Get cart details by id */
router.get(
  "/get-details/:cartId",
  validate(cartValidation.getDetails),
  cartController.getCartDetails
);

/** cart details update by id */
router.put(
  "/update-details/:cartId",
  validate(cartValidation.updateDetails),
  cartController.updateDetails
);

/** Delete cart */
router.delete(
  "/delete-cart/:cartId",
  validate(cartValidation.getDetails),
  cartController.deleteCart
);

/** Send mail */
// router.post(
//   "/send-mail",
//   validate(cartValidation.sendMail),
//   cartController.sendMail
// );w

module.exports = router;
