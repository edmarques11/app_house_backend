import type { NextFunction, Request, Response } from "express";
import yup from "yup";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";

export default class CreateUserValidation {
  constructor(private readonly factoryResponse: FactoryJsonResponse) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const schema = yup.object({
        name: yup
          .string()
          .typeError("name: o campo deve ser do tipo string")
          .required("name: o campo não pode ser vazio")
          .min(3, "name: o campo deve ter no mínimo 3 caracteres")
          .max(255, "name: máximo de caracteres excedido"),
        email: yup
          .string()
          .typeError("email: o campo deve ser do tipo string")
          .required("email: o campo não pode ser vazio")
          .email("email: email inválido")
          .max(255, "email: máximo de caracteres excedido"),
        password: yup
          .string()
          .typeError("password: o campo deve ser do tipo string")
          .required("password: o campo não pode ser vazio")
          .min(6, "password: o campo deve ter no mínimo 6 caracteres")
          .max(255, "password: máximo de caracteres excedido"),
        profile_image_id: yup
          .string()
          .typeError("profile_image_id: o campo deve ser do tipo string")
          .max(50, "profile_image_id: máximo de caracteres excedido"),
      });

      const { name, email, password, profile_image_id } = req.body;

      const data = { name, email, password, profile_image_id };

      await schema.validate(data, { abortEarly: false, strict: true });

      req.body.validatedData = data;

      next();
    } catch (err: any) {
      this.factoryResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
