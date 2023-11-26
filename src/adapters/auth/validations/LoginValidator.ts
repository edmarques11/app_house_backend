import { type NextFunction, type Request, type Response } from "express";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import yup from "yup";

export default class LoginValidator {
  constructor(private readonly factoryResponse: FactoryJsonResponse) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const schema = yup.object({
        username: yup
          .string()
          .required("username: o campo não pode ser vazio")
          .email("username: email inválido")
          .max(255, "username: máximo de caracteres excedido"),
        password: yup
          .string()
          .required("password: o campo não pode ser vazio")
          .min(6, "password: o campo deve ter no mínimo 6 caracteres")
          .max(255, "password: máximo de caracteres excedido"),
      });

      const { password, username } = req.body;

      await schema.validate({ password, username }, { abortEarly: false });

      next();
    } catch (err: any) {
      this.factoryResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
