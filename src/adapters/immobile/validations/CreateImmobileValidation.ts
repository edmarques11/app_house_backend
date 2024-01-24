import type { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";

export default class CreateImmobileValidation {
  constructor(private readonly factoryResponse: FactoryJsonResponse) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const schema = yup.object({
        type: yup
          .string()
          .typeError("type: o campo deve ser do tipo string")
          .required("type: o campo é obrigatório")
          .max(50, "type: o campo deve ter no máximo 50 caracteres"),
        address_id: yup
          .string()
          .typeError("address_id: o campo deve ser do tipo string")
          .required("address_id: o campo é obrigatório")
          .max(50, "address_id: o campo deve ter no máximo 50 caracteres")
      });

      const { type, address_id } = req.body;

      const data = {
        type,
        address_id,
      };

      await schema.validate(data, { abortEarly: false, strict: true });

      req.body.validatedData = data;

      next();
    } catch (err: any) {
      this.factoryResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
