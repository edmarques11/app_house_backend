import { type Request, type Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type ListAdvertisementService from "~/core/advertisement/service/ListAdvertisementService";
import type IListAdvertisementDTO from "~/core/advertisement/DTO/IListAdvertisementDTO";
import type GetTokenInfo from "../auth/herlper/GetTokenInfo";

export default class ListAdvertisementController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly listAdvertisementService: ListAdvertisementService,
    private readonly jsonResponse: FactoryJsonResponse,
    private readonly getTokenInfo: GetTokenInfo
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { validatedData } = req.body;

      const userId = await this.getTokenInfo.getUserId(req);

      const data: IListAdvertisementDTO = {
        page: Number(validatedData.page),
        itemsPerPage: Number(validatedData.itemsPerPage),
        ownerId: userId,
        toOwner: validatedData.toOwner,
        location: validatedData.location,
      };

      const advertisements = await this.listAdvertisementService.execute(data);

      this.jsonResponse.send(res, 200, "Sucesso!", advertisements);
    } catch (err: any) {
      this.jsonResponse.send(res, 400, err.message, {});
    }
  }
}
