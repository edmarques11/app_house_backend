import { type Request, type Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type IDeleteAdvertisementDTO from "~/core/advertisement/DTO/IDeleteAdvertisementDTO";
import type DeleteAdvertisementService from "~/core/advertisement/service/DeleteAdvertisementService";
import GetTokenInfo from "../auth/herlper/GetTokenInfo";
import NotAllowedOperation from "~/core/errors/access/NotAllowedOperation";

export default class DeleteAdvertisementController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly deleteAdvertisementService: DeleteAdvertisementService,
    private readonly jsonResponse: FactoryJsonResponse,
    private readonly getTokenInfo: GetTokenInfo
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { validatedData } = req.body;

      const userId = await this.getTokenInfo.getUserId(req);

      const data: IDeleteAdvertisementDTO = {
        ...validatedData,
        ownerId: userId,
      };

      await this.deleteAdvertisementService.execute(data);

      this.jsonResponse.send(res, 204, "Sucesso!", {});
    } catch (err: any) {
      if (err instanceof NotAllowedOperation) {
        this.jsonResponse.send(res, 403, err.message, {});
        return;
      }

      this.jsonResponse.send(res, 400, err.message, {});
    }
  }
}
