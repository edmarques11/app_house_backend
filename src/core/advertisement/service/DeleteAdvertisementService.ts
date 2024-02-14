import type IUseCase from "~/core/shared/IUseCase";
import type IAdvertisementRepository from "~/core/advertisement/repository/IAdvertisementRepository";
import type IDeleteAdvertisementDTO from "../DTO/IDeleteAdvertisementDTO";
import AdvertisementNotExists from "~/core/errors/advertisement/AdvertisementNotExists";
import NotAllowedOperation from "~/core/errors/access/NotAllowedOperation";

export default class DeleteAdvertisementService
  implements IUseCase<IDeleteAdvertisementDTO, void>
{
  constructor(
    private readonly advertisementRepository: IAdvertisementRepository,
    private readonly advertisementNotExists: AdvertisementNotExists,
    private readonly notAllowedOperation: NotAllowedOperation
  ) {}

  async execute(
    data: IDeleteAdvertisementDTO
  ): Promise<void> {
    const advertisement = await this.advertisementRepository.getById(data.id);

    if (!advertisement) throw this.advertisementNotExists;
    else if (advertisement.owner_id !== data.ownerId) throw this.notAllowedOperation;

    await this.advertisementRepository.delete(data);
  }
}
