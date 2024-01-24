import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import * as yup from "yup";
import type { Request, Response, NextFunction } from "express";

export default class DeleteImageValidation {
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
          .typeError("id: o campo deve ser do tipo string")
          .required("id: o campo não pode ser vazio"),
      });

      const data = req.params;

      await schema.validate(data, { abortEarly: false, strict: true });

      req.body.validatedData = data;

      next();
    } catch (err: any) {
      this.jsonResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
