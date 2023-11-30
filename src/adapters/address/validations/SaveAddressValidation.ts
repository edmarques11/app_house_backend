import type { NextFunction, Request, Response } from "express";
import yup from "yup";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type ISaveAddressDTO from "~/core/address/DTO/ISaveAddressDTO";

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
          .required("zip_code: o campo não pode ser vazio")
          .matches(/\d{5}-\d{3}/, "zip_code: campo inválido"),
        public_place: yup
          .string()
          .required("public_place: o campo não pode ser vazio")
          .min(3, "public_place: o campo deve ter no mínimo 3 caracteres")
          .max(100, "public_place: máximo de caracteres excedido"),
        complement: yup
          .string()
          .max(100, "complement: máximo de caracteres excedido"),
        district: yup
          .string()
          .required("district: o campo não pode ser vazio")
          .min(3, "district: o campo deve ter no mínimo 3 caracteres")
          .max(100, "district: máximo de caracteres excedido"),
        state: yup
          .string()
          .required("state: o campo não pode ser vazio")
          .min(3, "state: o campo deve ter no mínimo 3 caracteres")
          .max(50, "state: máximo de caracteres excedido"),
        uf: yup
          .string()
          .required("uf: o campo não pode ser vazio")
          .length(2, "uf: o campo deve ter 2 caracteres"),
      });

      const { zip_code, public_place, complement, district, state, uf } =
        req.body;

      const data: ISaveAddressDTO = {
        zip_code,
        public_place,
        complement,
        district,
        state,
        uf,
      };

      await schema.validate(data, { abortEarly: false });

      req.body.validatedData = data;

      next();
    } catch (err: any) {
      this.factoryResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
