import { type NextFunction, type Request, type Response } from "express";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import * as yup from "yup";

export default class LoginValidation {
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
          .typeError("username: o campo deve ser do tipo string")
          .required("username: o campo não pode ser vazio")
          .email("username: email inválido")
          .max(255, "username: máximo de caracteres excedido"),
        password: yup
          .string()
          .typeError("password: o campo deve ser do tipo string")
          .required("password: o campo não pode ser vazio")
          .min(6, "password: o campo deve ter no mínimo 6 caracteres")
          .max(255, "password: máximo de caracteres excedido"),
      });

      const { password, username } = req.body;


      const data = { password, username };

      await schema.validate(data, { abortEarly: false, strict: true });

      req.body.validatedData = data;

      next();
    } catch (err: any) {
      this.factoryResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
