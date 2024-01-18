import type IUseCase from "~/core/shared/IUseCase";
import type UserNotExists from "~/core/errors/user/UserNotExists";
import type IAdvertisementRepository from "~/core/advertisement/repository/IAdvertisementRepository";
import type IImageRepository from "~/core/image/repository/IImageRepository";
import type SomeImageNotExists from "~/core/errors/image/SomeImageNotExists";
import type IUpdateAdvertisementDTO from "../DTO/IUpdateAdvertisementDTOM";
import type AdvertisementNotExists from "~/core/errors/advertisement/AdvertisementNotExists";

interface Entry {
  data: IUpdateAdvertisementDTO
  userId: string
}

export default class UpdateAdvertisementService
  implements IUseCase<Entry, void>
{
  constructor(
    private readonly advertisementRepository: IAdvertisementRepository,
    private readonly imageRepository: IImageRepository,
    private readonly userNotExists: UserNotExists,
    private readonly someImageNotExists: SomeImageNotExists,
    private readonly advertisementNotExists: AdvertisementNotExists
  ) {}

  async execute({ data, userId }: Entry): Promise<void> {
    const advertisement = await this.advertisementRepository.getById(data.id);
    if (!advertisement) throw this.advertisementNotExists;

    if (userId !== advertisement.owner_id) throw this.userNotExists;

    const images = await this.imageRepository.findManyByIds(data.images);
    if (images.length !== data.images.length) throw this.someImageNotExists;

    await this.advertisementRepository.update(data);
  }
}
