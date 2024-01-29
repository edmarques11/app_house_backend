import type { NextFunction, Request, Response } from "express";
import multer, { type Multer } from "multer";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import saveInBucket from "~/external/firebase/firebaseStorage";

export default class SaveImageMiddleware {
  constructor(
    private readonly jsonResponse: FactoryJsonResponse,
    private readonly upload: Multer
  ) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    this.upload.single("file")(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          this.jsonResponse.send(res, 400, "O arquivo deve ter no máximo 2MB", {});
          return;
        }

        this.jsonResponse.send(res, 500, "Não foi possível salvar a imagem", {});
        return;
      }

      if (err) {
        this.jsonResponse.send(res, 400, err.message, {});
        return;
      }

      if (process.env.IS_LOCAL) {
        next();
        return;
      }

      try {
        const fileHash = await saveInBucket(req.file as Express.Multer.File);
        Object.assign(req.body, { fileHash });
        next();
      } catch (err: any) {
        this.jsonResponse.send(res, 400, err.message, {});
      }
    });
  }
}
