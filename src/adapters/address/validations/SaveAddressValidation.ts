import type { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";

export default class SaveAddressValidation {
  constructor(private readonly factoryResponse: FactoryJsonResponse) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const schema = yup.object({
        zip_code: yup
          .string()
          .typeError("zip_code: o campo deve ser do tipo string")
          .required("zip_code: o campo não pode ser vazio")
          .matches(/\d{5}-\d{3}/, "zip_code: campo inválido"),
        public_place: yup
          .string()
          .typeError("public_place: o campo deve ser do tipo string")
          .required("public_place: o campo não pode ser vazio")
          .min(3, "public_place: o campo deve ter no mínimo 3 caracteres")
          .max(100, "public_place: máximo de caracteres excedido"),
        complement: yup
          .string()
          .typeError("complement: o campo deve ser do tipo string")
          .max(100, "complement: máximo de caracteres excedido"),
        district: yup
          .string()
          .typeError("district: o campo deve ser do tipo string")
          .required("district: o campo não pode ser vazio")
          .min(3, "district: o campo deve ter no mínimo 3 caracteres")
          .max(100, "district: máximo de caracteres excedido"),
        city: yup
          .string()
          .typeError("city: o campo deve ser do tipo string")
          .required("city: o campo não pode ser vazio")
          .min(3, "city: o campo deve ter no mínimo 3 caracteres")
          .max(200, "city: máximo de caracteres excedido"),
        number: yup
          .string()
          .typeError("number: o campo deve ser do tipo string")
          .matches(/\d+/, "number: o campo deve ser um número")
          .max(10, "number: máximo de caracteres excedido"),
        uf: yup
          .string()
          .typeError("uf: o campo deve ser do tipo string")
          .required("uf: o campo não pode ser vazio")
          .length(2, "uf: o campo deve ter 2 caracteres"),
      });

      const { zip_code, public_place, complement, district, city, number, uf } =
        req.body;

      const data = {
        zip_code,
        public_place,
        complement,
        district,
        city,
        number,
        uf,
      };

      await schema.validate(data, { abortEarly: false, strict: true });

      req.body.validatedData = data;

      next();
    } catch (err: any) {
      this.factoryResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
