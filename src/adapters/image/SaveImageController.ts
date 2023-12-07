import { type Request, type Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type SaveImageService from "~/core/image/service/SaveImageService";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type ISaveImageDTO from "~/core/image/DTO/ISaveImageDTO";

export default class SaveImageController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly saveImageService: SaveImageService,
    private readonly jsonResponse: FactoryJsonResponse
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { fileHash } = req.body;

      const data: ISaveImageDTO = {
        fileHash,
      };

      const image = await this.saveImageService.execute(data);

      this.jsonResponse.send(res, 201, "Image saved", image);
    } catch (err: any) {
      this.jsonResponse.send(res, 400, err.message, {});
    }
  }
}
