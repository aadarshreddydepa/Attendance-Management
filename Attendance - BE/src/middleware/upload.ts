import multer from 'multer';

// Memory storage holds files in memory as Buffer objects
const storage = multer.memoryStorage();

// File size limit (~5MB here)
const limits = {
  fileSize: 5 * 1024 * 1024,
};

// File filter to accept only images (jpg, jpeg, png)
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
