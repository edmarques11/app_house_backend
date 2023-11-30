import type { NextFunction, Request, Response } from "express";
import yup from "yup";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type ICreateUserDTO from "~/core/user/DTO/ICreateUserDTO";

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
        profile_image_id: yup
          .string()
          .max(50, "rule: máximo de caracteres excedido"),
      });

      const { name, email, password, profile_image_id } = req.body;

      const data: ICreateUserDTO = { name, email, password, profile_image_id };

      await schema.validate(
        data,
        { abortEarly: false }
      );

      req.body.validatedData = data;

      next();
    } catch (err: any) {
      this.factoryResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
