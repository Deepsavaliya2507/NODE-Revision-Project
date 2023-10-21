const { product } = require("../models");

/**
 * Create product
 * @param {object} reqBody
 * @returns {Promise<product>}
 */
const createProduct = async (reqBody) => {
  return product.create(reqBody);
};

/**
 * Get product list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<product>}
 */
const getProductList = async (filter, options) => {
  const skip = (Number(options.page || 1) - 1) * Number(options.limit || 10);

  return product.find(filter).skip(skip).limit(options.limit).select("-password");
};

/**
 * Get product by first_name
 * @param {string} first_name
 * @returns {Promise<product>}
 */
const getProductByName = async (first_name) => {
  return product.findOne({ first_name }).populate('first_name');
};

/**
 * Get product details by id
 * @param {ObjectId} productId
 * @returns {Promise<product>}
 */
const getProductById = async (productId) => {
  return product.findById(productId);
};

/**
 * product details update by id
 * @param {ObjectId} productId
 * @param {object} updateBody
 * @returns {Promise<product>}
 */
const updateDetails = async (productId, updateBody) => {
  return product.findByIdAndUpdate(productId, { $set: updateBody });
};

/**
 * Delete product
 * @param {ObjectId} productId
 * @returns {Promise<product>}
 */
const deleteProduct = async (productId) => {
  return product.findByIdAndDelete(productId);
};

module.exports = {
  createProduct,
  getProductList,
  getProductById,
  updateDetails,
  getProductByName,
  deleteProduct,
};
