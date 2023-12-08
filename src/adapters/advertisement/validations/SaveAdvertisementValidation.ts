import { type NextFunction, type Request, type Response } from "express";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import yup from "yup";

export default class SaveAdvertisementValidation {
  constructor(private readonly jsonResponse: FactoryJsonResponse) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const schema = yup.object({
        title: yup
          .string()
          .typeError("title: o campo deve ser uma string")
          .required("title: o campo é obrigatório")
          .max(100, "title: o campo deve ter no máximo 100 caracteres"),
        description: yup
          .string()
          .typeError("description: o campo deve ser uma string")
          .required("description: o campo é obrigatório")
          .max(5000, "description: o campo deve ter no máximo 5000 caracteres"),
        width: yup
          .string()
          .typeError("width: o campo deve ser uma string")
          .required("width: o campo é obrigatório")
          .matches(
            /^\d+$/,
            "width: o campo deve conter apenas caracteres numericos"
          )
          .max(10, "width: o campo deve ter no máximo 10 caracteres"),
        length: yup
          .string()
          .typeError("length: o campo deve ser uma string")
          .required("length: o campo é obrigatório")
          .matches(
            /^\d+$/,
            "length: o campo deve conter apenas caracteres numericos"
          )
          .max(10, "length: o campo deve ter no máximo 10 caracteres"),
        references: yup
          .string()
          .typeError("references: o campo deve ser uma string")
          .required("references: o campo é obrigatório")
          .max(255, "references: o campo deve ter no máximo 255 caracteres"),
        phone_contact: yup
          .string()
          .typeError("phone_contact: o campo deve ser uma string")
          .required("phone_contact: o campo é obrigatório")
          .max(100, "phone_contact: o campo deve ter no máximo 100 caracteres"),
        price: yup
          .number()
          .typeError("price: o campo deve ser um número")
          .required("price: o campo é obrigatório"),
        owner_id: yup
          .string()
          .typeError("owner_id: o campo deve ser uma string")
          .required("owner_id: o campo é obrigatório")
          .max(50, "owner_id: o campo deve ter no máximo 50 caracteres"),
        immobile_id: yup
          .string()
          .typeError("immobile_id: o campo deve ser uma string")
          .required("immobile_id: o campo é obrigatório")
          .max(50, "immobile_id: o campo deve ter no máximo 50 caracteres"),
        images: yup
          .array(
            yup
              .string()
              .typeError("images: o campo deve ser um array de strings")
          )
          .typeError("images: o campo deve ser um array de strings")
          .required("images: o campo é obrigatório")
          .min(1, "images: o campo deve ter no mínimo 1 item")
          .max(10, "images: o campo deve ter no máximo 10 itens"),
      });

      const {
        title,
        description,
        width,
        length,
        references,
        phone_contact,
        price,
        immobile_id,
        owner_id,
        images,
      } = req.body;

      const data = {
        title,
        description,
        width,
        length,
        references,
        phone_contact,
        price,
        immobile_id,
        owner_id,
        images,
      };

      await schema.validate(data, { abortEarly: false, strict: true });

      req.body.validatedData = data;

      next();
    } catch (err: any) {
      this.jsonResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
