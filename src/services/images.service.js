const { Image } = require("../models");

/**
 * Create image
 * @param {object} reqBody
 * @returns {Promise<image>}
 */
const createImage = async (reqBody) => {
  return Image.create(reqBody);
};

/**
 * Get image list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<image>}
 */
const getImageList = async (filter, options) => {
  const skip = (Number(options.page || 1) - 1) * Number(options.limit || 10);

  return Image.find(filter).skip(skip).limit(options.limit).select("-password");
};

/**
 * Get image by email
 * @param {string} email
 * @returns {Promise<image>}
 */
const getImageByEmail = async (email) => {
  return Image.findOne({ email });
};

/**
 * Get image details by id
 * @param {ObjectId} imageId
 * @returns {Promise<image>}
 */
const getImageById = async (imageId) => {
  return Image.findById(imageId);
};

/**
 * image details update by id
 * @param {ObjectId} imageId
 * @param {object} updateBody
 * @returns {Promise<image>}
 */
const updateDetails = async (imageId, updateBody) => {
  return Image.findByIdAndUpdate(imageId, { $set: updateBody });
};

/**
 * Delete image
 * @param {ObjectId} imageId
 * @returns {Promise<image>}
 */
const deleteImage = async (imageId) => {
  return Image.findByIdAndDelete(imageId);
};

module.exports = {
  createImage,
  getImageList,
  getImageById,
  updateDetails,
  getImageByEmail,
  deleteImage,
};
