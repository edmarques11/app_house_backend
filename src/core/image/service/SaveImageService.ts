import type IImageRepository from "~/core/image/repository/IImageRepository";
import type IImage from "~/core/image/model/IImage";
import type IUseCase from "~/core/shared/IUseCase";
import type ISaveImageDTO from "../DTO/ISaveImageDTO";
import type IBucket from "~/external/firebase/interfaces/IBucket";

export default class SaveImageService
  implements IUseCase<ISaveImageDTO, IImage>
{
  constructor(
    private readonly imageRepository: IImageRepository,
    private readonly bucket: IBucket
  ) {}

  async execute(data: ISaveImageDTO): Promise<IImage> {
    const image = await this.imageRepository.save(data);

    const imageUrl: string = await this.bucket.getUrlFile(data.fileHash, 24);
    return { ...image, publicUrl: imageUrl } satisfies IImage;
  }
}
