import { v2 as cloudinary } from "cloudinary"
import { CLOUD_NAME, CLOUD_API_KEY, API_SECRET } from "../config.js"

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: API_SECRET
});

export async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'replit'
  })
}

