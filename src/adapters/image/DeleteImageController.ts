import { type Request, type Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type IDeleteImageDTO from "~/core/image/DTO/IDeleteImageDTO";
import type DeleteImageService from "~/core/image/service/DeleteImageService";

export default class DeleteImageController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly deleteImageService: DeleteImageService,
    private readonly jsonResponse: FactoryJsonResponse
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { validatedData } = req.body;

      await this.deleteImageService.execute(
        validatedData as IDeleteImageDTO
      );

      this.jsonResponse.send(res, 204, "Imagem deletada", {});
    } catch (err: any) {
      this.jsonResponse.send(res, 400, err.message, {});
    }
  }
}
