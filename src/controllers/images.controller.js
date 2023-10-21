const fs = require("fs");
const { imageService, emailService } = require("../services");

/** create image */
const createImage = async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.file) {
      reqBody.image_image  = req.file.filename;
    } else {
      throw new Error("Product image is required!");
    }

    const imageExists = await imageService.getImageByEmail(reqBody.email);
    if (imageExists) {
      throw new Error("image already created by this email!");
    }

    const image = await imageService.createImage(reqBody);
    if (!image) {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "image create successfully!",
      data: { image },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get image list */
const getImageList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    const getList = await imageService.getImageList(filter, options);

    res.status(200).json({
      success: true,
      message: "Get image list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get image details by id */
const getImageDetails = async (req, res) => {
  try {
    const getDetails = await imageService.getImageById(req.params.imageId);
    if (!getDetails) {
      throw new Error("image not found!");
    }

    res.status(200).json({
      success: true,
      message: "image details get successfully!",
      data: getDetails,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** image details update by id */
const updateDetails = async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const imageExists = await imageService.getImageById(imageId);
    if (!imageExists) {
      throw new Error("image not found!");
    }

    await imageService.updateDetails(imageId, req.body);

    res
      .status(200)
      .json({ success: true, message: "image details update successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete image */
const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const imageExists = await imageService.getImageById(imageId);
    if (!imageExists) {
      throw new Error("image not found!");
    }

    await imageService.deleteImage(imageId);

    res.status(200).json({
      success: true,
      message: "image delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createImage,
  getImageList,
  getImageDetails,
  updateDetails,
  deleteImage,
};
