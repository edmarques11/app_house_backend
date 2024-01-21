import { type Request, type Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type IDeleteAdvertisementDTO from "~/core/advertisement/DTO/IDeleteAdvertisementDTO";
import type DeleteAdvertisementService from "~/core/advertisement/service/DeleteAdvertisementService";

export default class DeleteAdvertisementController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly deleteAdvertisementService: DeleteAdvertisementService,
    private readonly jsonResponse: FactoryJsonResponse
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { validatedData } = req.body;

      const data: IDeleteAdvertisementDTO = validatedData;

      await this.deleteAdvertisementService.execute(data);

      this.jsonResponse.send(res, 204, "Sucesso!", {});
    } catch (err: any) {
      this.jsonResponse.send(res, 400, err.message, {});
    }
  }
}
