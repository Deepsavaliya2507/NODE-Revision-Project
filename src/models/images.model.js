const mongoose = require("mongoose");
const config = require("../config/config");

const imagesSchema = new mongoose.Schema(
  {
    images_name: {
      type: String,
      trim: true,
    },
    images_description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, data) {
        if (data?.images_image) {
          data.images_image = `${config.base_url}images_image/${data.images_image}`;
        }
      },
    },
  }
);

const Images = mongoose.model("images", imagesSchema);
module.exports = Images;
