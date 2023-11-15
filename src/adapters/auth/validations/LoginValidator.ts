import { NextFunction, Request, Response } from "express";
import FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import yup from "yup";

export default class LoginValidator {
  async execute(req: Request, res: Response, next: NextFunction) {
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

      await schema.validate({ password, username });

      next();
    } catch (err: any) {
      return FactoryJsonResponse.create(
        res,
        422,
        "Campos inválidos",
        err.errors
      );
    }
  }
}
