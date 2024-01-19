import type IUseCase from "~/core/shared/IUseCase";
import type IAdvertisementRepository from "~/core/advertisement/repository/IAdvertisementRepository";
import type IBucket from "~/external/firebase/interfaces/IBucket";
import type IAdvertisementData from "../interfaces/IAdvertsementData";
import type IGetAdvertisementDTO from "../DTO/IGetAdvertisementDTO";

export default class GetAdvertisementService
  implements IUseCase<IGetAdvertisementDTO, IAdvertisementData | null>
{
  constructor(
    private readonly advertisementRepository: IAdvertisementRepository,
    private readonly bucket: IBucket
  ) {}

  async execute(
    data: IGetAdvertisementDTO
  ): Promise<IAdvertisementData | null> {
    const advertisement = await this.advertisementRepository.getById(data.id);

    await Promise.all(
      (advertisement?.images ?? []).map(async (image) => {
        const publicUrl = await this.bucket.getUrlFile(image.hash, 5);
        image.publicUrl = publicUrl;
      })
    );

    return advertisement;
  }
}
