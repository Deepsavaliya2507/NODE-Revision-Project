const fs = require("fs");
const { cartService, emailService } = require("../services");

/** create cart */
const createCart = async (req, res) => {
  try {
    const reqBody = req.body;

    const cartExists = await cartService.getCartByEmail(
      reqBody.email
    );
    if (cartExists) {
      throw new Error("cart already created by this email!");
    }

    const cart = await cartService.createCart(reqBody);
    if (!cart) {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "cart create successfully!",
      data: { cart },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get cart list */
const getCartList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    const getList = await cartService.getCartList(
      filter,
      options
    );

    res.status(200).json({
      success: true,
      message: "Get cart list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get cart details by id */
const getCartDetails = async (req, res) => {
  try {
    const getDetails = await cartService.getCartById(
      req.params.cartId
    );
    if (!getDetails) {
      throw new Error("cart not found!");
    }

    res.status(200).json({
      success: true,
      message: "cart details get successfully!",
      data: getDetails,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** cart details update by id */
const updateDetails = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartExists = await cartService.getCartById(
      cartId
    );
    if (!cartExists) {
      throw new Error("cart not found!");
    }

    await cartService.updateDetails(cartId, req.body);

    res
      .status(200)
      .json({
        success: true,
        message: "cart details update successfully!",
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete cart */
const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartExists = await cartService.getCartById(
      cartId
    );
    if (!cartExists) {
      throw new Error("cart not found!");
    }

    await cartService.deleteCart(cartId);

    res.status(200).json({
      success: true,
      message: "cart delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Send mail to reqested email */
// const sendMail = async (req, res) => {
//   try {
//     const reqBody = req.body;
//     const sendEmail = await emailService.sendMail(
//       reqBody.email,
//       reqBody.subject,
//       reqBody.text
//     );
//     if (!sendEmail) {
//       throw new Error("Something went wrong, please try again or later.");
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Email send successfully!" });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
module.exports = {
  createCart,
  getCartList,
  getCartDetails,
  updateDetails,
  deleteCart,
  // sendMail,
};
