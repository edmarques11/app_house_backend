import type IImageRepository from "~/core/image/repository/IImageRepository";
import type IImage from "~/core/image/model/IImage";
import type IUseCase from "~/core/shared/IUseCase";
import type ISaveImageDTO from "../DTO/ISaveImageDTO";

export default class SaveImageService
  implements IUseCase<ISaveImageDTO, IImage>
{
  constructor(private readonly imageRepository: IImageRepository) {}

  async execute(data: ISaveImageDTO): Promise<IImage> {
    const image = await this.imageRepository.save(data);

    return image;
  }
}
