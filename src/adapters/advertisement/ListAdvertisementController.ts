import { type Request, type Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type ListAdvertisementService from "~/core/advertisement/service/ListAdvertisementService";
import type IListAdvertisementDTO from "~/core/advertisement/DTO/IListAdvertisementDTO";

export default class ListAdvertisementController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly listAdvertisementService: ListAdvertisementService,
    private readonly jsonResponse: FactoryJsonResponse
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { validatedData } = req.body;

      interface CustomRequest extends Request { userId: string }

      const data: IListAdvertisementDTO = {
        page: Number(validatedData.page),
        itemsPerPage: Number(validatedData.itemsPerPage),
        ownerId: (req as CustomRequest).userId,
      };

      const advertisements = await this.listAdvertisementService.execute(data);

      this.jsonResponse.send(res, 200, "Sucesso!", advertisements);
    } catch (err: any) {
      this.jsonResponse.send(res, 400, err.message, {});
    }
  }
}
