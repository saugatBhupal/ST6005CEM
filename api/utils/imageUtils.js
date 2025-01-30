const cloudinary = require("cloudinary");

const saveMedia = async (image, dir) => {
  const result = await cloudinary.v2.uploader.upload(image.path, {
    folder: dir,
    crop: "scale",
  });
  return result;
};
const saveMediaAndReturnUrl = async (file, dir) => {
  if (file) {
    try {
      const savedMedia = await saveMedia(file, dir);
      return savedMedia.secure_url;
    } catch (mediaError) {
      console.error("Error saving media:", mediaError);
      throw new Error("Error saving media");
    }
  }
};
module.exports = { saveMedia, saveMediaAndReturnUrl };
