import type { Request } from "express";
import multer from "multer";

const twoMB = 2 * 1024 * 1024;

function filename(
  req: Request,
  file: Express.Multer.File,
  cb: (err: Error | null, filename: string) => void
): void {
  const fileExtension = file.originalname.split(".").pop();
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const newFileName = `${file.fieldname}-${uniqueSuffix}.${fileExtension}`;
  cb(null, newFileName);
}

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void {
  const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo inválido"));
  }
}

const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename,
});

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: process.env.IS_LOCAL ? localStorage : multerStorage,
  limits: { fileSize: twoMB },
  fileFilter,
});

export default upload;
