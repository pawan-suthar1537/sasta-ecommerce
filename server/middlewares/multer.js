import multer from "multer";

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValidType = allowedTypes.test(file.mimetype);

  if (!isValidType) {
    return cb(
      new Error("Invalid file type. Only .jpg, .jpeg, and .png are allowed."),
      false
    );
  }

  cb(null, true);
};

const storage = multer.memoryStorage();

const Upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default Upload;
