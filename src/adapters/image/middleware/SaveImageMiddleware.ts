import type { NextFunction, Request, Response } from "express";
import multer, { type Multer } from "multer";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";

export default class SaveImageMiddleware {
  constructor(private readonly jsonResponse: FactoryJsonResponse, private readonly upload: Multer) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    this.upload.single("file")(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        this.jsonResponse.send(res, 500, "Não foi a salvar imagem", {});
      } else if (err) {
        this.jsonResponse.send(res, 400, err.message, {});
      } else {
        next();
      }
    });
  }
}
