import { type Request, type Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type GetAdvertisementService from "~/core/advertisement/service/GetAdvertisementService";
import type IGetAdvertisementDTO from "~/core/advertisement/DTO/IGetAdvertisementDTO";

export default class GetAdvertisementController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly getAdvertisementService: GetAdvertisementService,
    private readonly jsonResponse: FactoryJsonResponse
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { validatedData } = req.body;

      const data: IGetAdvertisementDTO = validatedData;

      const advertisement = await this.getAdvertisementService.execute(data);

      this.jsonResponse.send(res, 200, "Sucesso!", advertisement ?? {});
    } catch (err: any) {
      this.jsonResponse.send(res, 400, err.message, {});
    }
  }
}
