import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import yup from "yup";
import type { Request, Response, NextFunction } from "express";

export default class SaveImageValidation {
  constructor(private readonly jsonResponse: FactoryJsonResponse) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const schema = yup.object({
        file: yup.mixed().required("file: o campo não pode ser vazio"),
      });

      const file = req.file;

      const data = { file };

      await schema.validate(data, { abortEarly: false, strict: true });

      req.body.dataValidated = data;

      next();
    } catch (err: any) {
      this.jsonResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
