import fs from "fs";
import { ApiError } from "./ApiError.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};

const deleteOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const publicId = extractPublicId(localFilePath);
    if (!publicId) throw new Error("Invalid Cloudinary URL");

    const response = await cloudinary.uploader.destroy(publicId);

    return response;
  } catch (error) {
    throw new ApiError(400, error.message || "Couldnt delete old avatar file");
  }
};

const extractPublicId = (cloudinaryUrl) => {
  try {
    const urlParts = new URL(cloudinaryUrl);
    const pathname = urlParts.pathname;
    const segments = pathname.split("/");

    const uploadIndex = segments.indexOf("upload");
    if (uploadIndex === -1) return null;

    const publicIdWithExtension = segments.slice(uploadIndex + 2).join("/");

    return publicIdWithExtension.replace(/\.[^/.]+$/, "");
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
