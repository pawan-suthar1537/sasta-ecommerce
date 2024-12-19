import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadImage = async (file, username) => {
  console.log("username", username);
  if (!username) {
    throw new Error("Username is required");
  }

  if (!file || !file.buffer) {
    throw new Error("File is required");
  }
  const buffer = file?.buffer || Buffer.from(await file.arrayBuffer());

  const folderPath = `sasta_ecom/${username}`;

  const upload = await new Promise((res, rej) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: folderPath,
        },
        (err, result) => {
          if (err) {
            rej(err);
          }
          res(result);
        }
      )
      .end(buffer);
  });
  return upload;
};

export default uploadImage;
