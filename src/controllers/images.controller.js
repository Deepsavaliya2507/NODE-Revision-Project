const fs = require("fs");
const { imageService } = require("../services");

/** Create image */
const createImage = async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.file) {
      reqBody.image_image = req.file.filename;
    } else {
      throw new Error("image image is required!");
    }

    const createdImage = await imageService.createImage(reqBody);

    res.status(200).json({
      success: true,
      message: "image create successfully!",
      data: createdImage,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Multiple image */
const multipleImage = async (req, res) => {
  try {
    const reqBody = req.body;

    image_image = [];
    if (req.files) {
      for (let ele of req.files) {
        image_image.push(ele.filename);
      }
    } else {
      throw new Error("image image is required!");
    }

    reqBody.image_image = image_image;

    const createdImage = await imageService.createImage(reqBody);

    res.status(200).json({
      success: true,
      message: "image create successfully!",
      data: createdImage,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get image details */
const getDetails = async (req, res) => {
  try {
    const imageExists = await imageService.getImageById(
      req.params.imageId
    );
    if (!imageExists) {
      throw new Error("image not found!");
    }

    res.status(200).json({
      success: true,
      message: "image details get successfully!",
      data: imageExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get image list */
const getImageList = async (req, res) => {
  try {
    const getList = await imageService.getImageList();

    res.status(200).json({
      success: true,
      data: getList,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Update image details */
const updateImage = async (req, res) => {
  try {
    const reqBody = req.body;
    const imageId = req.params.imageId;
    const imageExists = await imageService.getImageById(imageId);
    if (!imageExists) {
      throw new Error("image not found!");
    }

    if (req.file) {
      reqBody.image_image = req.file.filename;
    }

    const updatedImage = await imageService.updateImage(
      imageId,
      reqBody
    );
    if (updatedImage) {
      if (req.file) {
        const filePath = `./public/image/${imageExists.image_image}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } else {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "image details update successfully!",
      data: updatedImage,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Manage image status */
// const manageImageStatus = async (req, res) => {
//   try {
//     const manageStatus = await imageService.manageImageStatus(
//       req.params.imageId
//     );

//     let resMessage = manageStatus.is_active
//       ? "image can enable to sale."
//       : "image can not enable to sale";

//     res.status(200).json({
//       success: true,
//       message: resMessage,
//       data: manageStatus,
//     });
//   } catch (error) {
//     res.status(error?.statusCode || 400).json({
//       success: false,
//       message:
//         error?.message || "Something went wrong, please try again or later!",
//     });
//   }
// };

/** Delete image */
const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const imageExists = await imageService.getImageById(imageId);
    if (!imageExists) {
      throw new Error("image not found!");
    }

    const deletedImage = await imageService.deleteImage(imageId);
    if (deletedImage) {
      const filePath = `./public/image_images/${imageExists.image_image}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } else {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "image delete successfully!",
      data: deletedImage,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

module.exports = {
  createImage,
  multipleImage,
  getDetails,
  getImageList,
  updateImage,
  // manageImageStatus,
  deleteImage,
};