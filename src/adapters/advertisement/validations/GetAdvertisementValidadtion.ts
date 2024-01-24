import { type NextFunction, type Request, type Response } from "express";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import * as yup from "yup";

export default class GetAdvertisementValidation {
  constructor(private readonly jsonResponse: FactoryJsonResponse) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const schema = yup.object({
        id: yup
          .string()
          .typeError("id: o campo deve ser uma string")
          .required("id: o campo é obrigatório")
          .max(50, "id: o campo deve ter no máximo 50 caracteres"),
      });

      const { id } = req.params;

      const data = {
        id
      };

      await schema.validate(data, { abortEarly: false, strict: true });

      req.body.validatedData = data;

      next();
    } catch (err: any) {
      this.jsonResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
