import type { Request, Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type CreateImmobileService from "~/core/immobile/service/CreateImmobileService";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type CreateImmobileDTO from "~/core/immobile/DTO/ICreateImmobileDTO";

export default class CreateImmobileController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly service: CreateImmobileService,
    private readonly jsonResponse: FactoryJsonResponse
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { validatedData } = req.body;

      const immobile: CreateImmobileDTO = await this.service.execute(
        validatedData
      );

      this.jsonResponse.send(res, 201, "ok", immobile);
    } catch (err: any) {
      this.jsonResponse.send(res, 400, err.message, {});
    }
  }
}
