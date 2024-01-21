import type IUseCase from "~/core/shared/IUseCase";
import type IAdvertisementRepository from "~/core/advertisement/repository/IAdvertisementRepository";
import type IDeleteAdvertisementDTO from "../DTO/IDeleteAdvertisementDTO";

export default class DeleteAdvertisementService
  implements IUseCase<IDeleteAdvertisementDTO, void>
{
  constructor(
    private readonly advertisementRepository: IAdvertisementRepository,
  ) {}

  async execute(
    data: IDeleteAdvertisementDTO
  ): Promise<void> {
    await this.advertisementRepository.delete(data);
  }
}
