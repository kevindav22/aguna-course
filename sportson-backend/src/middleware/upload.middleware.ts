import path from 'path';
import fs from 'fs';
import multer from 'multer';

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const allowedExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.mimetype.startsWith('image/') && allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('only images files are allowed (.jpg, .jpeg, .png, .webp, .gif)'));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});
