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
          .required("name: o campo não pode ser vazio")
          .min(3, "name: o campo deve ter no mínimo 3 caracteres")
          .max(255, "name: máximo de caracteres excedido"),
        email: yup
          .string()
          .required("email: o campo não pode ser vazio")
          .email("email: email inválido")
          .max(255, "email: máximo de caracteres excedido"),
        password: yup
          .string()
          .required("password: o campo não pode ser vazio")
          .min(6, "password: o campo deve ter no mínimo 6 caracteres")
          .max(255, "password: máximo de caracteres excedido"),
        rule: yup
          .string()
          .required("rule: o campo não pode ser vazio")
          .oneOf(["locator"], "rule: valor inválido")
          .max(25, "rule: máximo de caracteres excedido"),
      });

      const { name, email, password, rule } = req.body;

      await schema.validate(
        { name, email, password, rule },
        { abortEarly: false }
      );

      next();
    } catch (err: any) {
      this.factoryResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
