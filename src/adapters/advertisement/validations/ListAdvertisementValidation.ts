import { type NextFunction, type Request, type Response } from "express";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import * as yup from "yup";

export default class ListAdvertisementValidation {
  constructor(private readonly jsonResponse: FactoryJsonResponse) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const schema = yup.object({
        page: yup
          .string()
          .matches(/^[0-9]+$/, "page: o campo deve ser um número")
          .required("page: o campo é obrigatório"),
        itemsPerPage: yup
          .string()
          .matches(/^[0-9]+$/, "itemsPerPage: o campo deve ser um número")
          .required("itemsPerPage: o campo é obrigatório"),
        toOwner: yup
          .string()
          .matches(/0|1/, "toOwner: o campo deve ser um '0' ou '1'"),
        location: yup.string().nullable(),
      });

      const { page, itemsPerPage, toOwner, location } = req.query;

      const data = {
        page,
        itemsPerPage,
        toOwner,
        location,
      };

      await schema.validate(data, { abortEarly: false, strict: true });

      req.body.validatedData = data;

      next();
    } catch (err: any) {
      this.jsonResponse.send(res, 422, "Campos inválidos", err.errors);
    }
  }
}
