import type IUseCase from "~/core/shared/IUseCase";
import type ISaveAdvertisementDTO from "~/core/advertisement/DTO/ISaveAdvertisementDTO";
import type UserNotExists from "~/core/errors/user/UserNotExists";
import type ImmobileNotExists from "~/core/errors/immobile/ImmobileNotExists";
import type IUserRepository from "~/core/user/repository/IUserRepository";
import type IImobileRepository from "~/core/immobile/repository/IImobileRepository";
import type IAdvertisementRepository from "~/core/advertisement/repository/IAdvertisementRepository";
import type IImageRepository from "~/core/image/repository/IImageRepository";
import type SomeImageNotExists from "~/core/errors/image/SomeImageNotExists";

export default class SaveAdvertisementService
  implements IUseCase<ISaveAdvertisementDTO, void>
{
  constructor(
    private readonly advertisementRepository: IAdvertisementRepository,
    private readonly userRepository: IUserRepository,
    private readonly immobileRepository: IImobileRepository,
    private readonly imageRepository: IImageRepository,
    private readonly userNotExists: UserNotExists,
    private readonly immobileNotExists: ImmobileNotExists,
    private readonly someImageNotExists: SomeImageNotExists
  ) {}

  async execute(data: ISaveAdvertisementDTO): Promise<void> {
    const user = await this.userRepository.findById(data.owner_id);
    if (!user) throw this.userNotExists;

    const immobile = await this.immobileRepository.findById(data.immobile_id);
    if (!immobile) throw this.immobileNotExists;

    const images = await this.imageRepository.findManyByIds(data.images);
    if (images.length !== data.images.length) throw this.someImageNotExists;

    await this.advertisementRepository.save(data);
  }
}
