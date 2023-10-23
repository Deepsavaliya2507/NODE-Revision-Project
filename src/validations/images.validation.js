const Joi = require("joi");

/** create image */
const createImage = {
  body: Joi.object().keys({
    images_name: Joi.string().required().trim(),
    images_description: Joi.string().required().trim(),
    image: Joi.string().allow,
  }),
};

/** GEt image list */
const getImageList = {
  query: Joi.object().keys({
    search: Joi.string().trim().allow(""),
    sortBy: Joi.string().trim().allow(""),
    limit: Joi.number().integer().allow(""),
    page: Joi.number().integer().allow(""),
  }),
};

/** Get image details by id */
const getDetails = {
  params: Joi.object().keys({
    imageId: Joi.string().required().trim(),
  }),
};

/** image details update by id */
const updateDetails = {
  params: Joi.object().keys({
    imageId: Joi.string().required().trim(),
  }),
  body: Joi.object().keys({
    images_name: Joi.string().trim(),
    images_description: Joi.string().trim(),
    image: Joi.string().allow(),
  }),
};

module.exports = {
  createImage,
  getDetails,
  getImageList,
  updateDetails,
};
