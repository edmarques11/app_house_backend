import { type Request, type Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type SaveAdvertisementService from "~/core/advertisement/service/SaveAdvertisementService";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type ISaveAdvertisementDTO from "~/core/advertisement/DTO/ISaveAdvertisementDTO";
import type GetTokenInfo from "../auth/herlper/GetTokenInfo";

export default class SaveAdvertisementController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly saveAdvertisementService: SaveAdvertisementService,
    private readonly jsonResponse: FactoryJsonResponse,
    private readonly getTokenInfo: GetTokenInfo
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { validatedData } = req.body;

      const userId = await this.getTokenInfo.getUserId(req);

      const data: ISaveAdvertisementDTO = {
        ...validatedData,
        owner_id: userId,
      };

      await this.saveAdvertisementService.execute(data);

      this.jsonResponse.send(res, 204, "Anúncio criado", {});
    } catch (err: any) {
      this.jsonResponse.send(res, 400, err.message, {});
    }
  }
}
