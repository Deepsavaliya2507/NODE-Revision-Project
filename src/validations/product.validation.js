const Joi = require("joi");

/** create product */
const createProduct = {
  body: Joi.object().keys({
    product_name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    price: Joi.number().required().integer(),
    quantity: Joi.number().required().integer(),
  }),
};

/** GEt product list */
const getProductList = {
  query: Joi.object().keys({
    search: Joi.string().trim().allow(""),
    sortBy: Joi.string().trim().allow(""),
    limit: Joi.number().integer().allow(""),
    page: Joi.number().integer().allow(""),
  }),
};

/** Get product details by id */
const getDetails = {
  params: Joi.object().keys({
    productId: Joi.string().required().trim(),
  }),
};

/** product details update by id */
const updateDetails = {
  params: Joi.object().keys({
    productId: Joi.string().required().trim(),
  }),
  body: Joi.object().keys({
    product_name: Joi.string().trim(),
    description: Joi.string().trim(),
    price: Joi.string().email().required(),
  }),
}

module.exports = {
  createProduct,
  getDetails,
  getProductList,
  updateDetails,
};
