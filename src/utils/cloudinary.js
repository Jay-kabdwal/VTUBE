import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//config of cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLLUDINARY_API_SECRET,
});

const uploadOnColudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //uplaod file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded succesfully
    console.log("file uploaded colidinary", response.url);
    return response;
  } catch (err) {
    //remove locally saved temporary file
    fs.unlinkSync(localFilePath); 
    return null;
  }
};

export { uploadOnColudinary };
