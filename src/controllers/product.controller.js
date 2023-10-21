const fs = require("fs");
const { productService, emailService } = require("../services");

/** create product */
const createProduct = async (req, res) => {
  try {
    const reqBody = req.body;

    const productExists = await productService.getProductByEmail(
      reqBody.email
    );
    if (productExists) {
      throw new Error("product already created by this email!");
    }

    const product = await productService.createProduct(reqBody);
    if (!product) {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "product create successfully!",
      data: { product },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get product list */
const getProductList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    const getList = await productService.getProductList(
      filter,
      options
    );

    res.status(200).json({
      success: true,
      message: "Get product list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get product details by id */
const getProductDetails = async (req, res) => {
  try {
    const getDetails = await productService.getProductById(
      req.params.productId
    );
    if (!getDetails) {
      throw new Error("product not found!");
    }

    res.status(200).json({
      success: true,
      message: "product details get successfully!",
      data: getDetails,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** product details update by id */
const updateDetails = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productExists = await productService.getProductById(
      productId
    );
    if (!productExists) {
      throw new Error("product not found!");
    }

    await productService.updateDetails(productId, req.body);

    res
      .status(200)
      .json({
        success: true,
        message: "product details update successfully!",
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete product */
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productExists = await productService.getProductById(
      productId
    );
    if (!productExists) {
      throw new Error("product not found!");
    }

    await productService.deleteProduct(productId);

    res.status(200).json({
      success: true,
      message: "product delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getProductList,
  getProductDetails,
  updateDetails,
  deleteProduct,
};
