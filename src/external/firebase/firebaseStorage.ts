import admin from "~/external/firebase/admin";

const bucket = admin.storage().bucket();

const saveInBucket = (file: Express.Multer.File): any => {
  return new Promise((resolve, reject) => {
    if (!file) reject(new Error("Nenhum arquivo foi enviado"));

    const fileExtension = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newFileName = `${file.fieldname}-${uniqueSuffix}.${fileExtension}`;

    const fileStream =
      bucket
      .file(newFileName)
      .createWriteStream({
        metadata: { contentType: file.mimetype },
      });

    fileStream.on("error", (err) => {
      reject(err);
    });

    fileStream.on("finish", () => {
      resolve(newFileName);
    });

    fileStream.end(file.buffer);
  });
};

export default saveInBucket;
