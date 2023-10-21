const { cart } = require("../models");

/**
 * Create cart
 * @param {object} reqBody
 * @returns {Promise<cart>}
 */
const createCart = async (reqBody) => {
  return cart.create(reqBody);
};

/**
 * Get cart list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<cart>}
 */
const getCartList = async (filter, options) => {
  const skip = (Number(options.page || 1) - 1) * Number(options.limit || 10);

  return cart.find(filter).skip(skip).limit(options.limit).select("-password");
};

/**
 * Get cart by email
 * @param {string} email
 * @returns {Promise<cart>}
 */
const getCartByEmail = async (email) => {
  return cart.findOne({ email }).populate('first_id');
};

/**
 * Get cart details by id
 * @param {ObjectId} cartId
 * @returns {Promise<cart>}
 */
const getCartById = async (cartId) => {
  return cart.findById(cartId);
};

/**
 * cart details update by id
 * @param {ObjectId} cartId
 * @param {object} updateBody
 * @returns {Promise<cart>}
 */
const updateDetails = async (cartId, updateBody) => {
  return cart.findByIdAndUpdate(cartId, { $set: updateBody });
};

/**
 * Delete cart
 * @param {ObjectId} cartId
 * @returns {Promise<cart>}
 */
const deleteCart = async (cartId) => {
  return cart.findByIdAndDelete(cartId);
};

module.exports = {
  createCart,
  getCartList,
  getCartById,
  updateDetails,
  getCartByEmail,
  deleteCart,
};
