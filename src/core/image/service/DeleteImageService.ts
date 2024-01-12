import type IUseCase from "~/core/shared/IUseCase";
import type IDeleteImageDTO from "~/core/image/DTO/IDeleteImageDTO";
import type IImageRepository from "~/core/image/repository/IImageRepository";

export default class DeleteImageService
  implements IUseCase<IDeleteImageDTO, void>
{
  constructor(private readonly imageRepository: IImageRepository) {}

  async execute(data: IDeleteImageDTO): Promise<void> {
    await this.imageRepository.delete(data.id);
  }
}
