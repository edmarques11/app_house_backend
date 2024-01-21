import type IUseCase from "~/core/shared/IUseCase";
import type IAdvertisementRepository from "~/core/advertisement/repository/IAdvertisementRepository";
import type IListAdvertisementDTO from "~/core/advertisement/DTO/IListAdvertisementDTO";
import type IListAdvertisement from "~/core/advertisement/interfaces/IListAdvertisement";
import type IBucket from "~/external/firebase/interfaces/IBucket";

export default class ListAdvertisementService
  implements IUseCase<IListAdvertisementDTO, IListAdvertisement>
{
  constructor(
    private readonly advertisementRepository: IAdvertisementRepository,
    private readonly bucket: IBucket,
  ) {}

  async execute(data: IListAdvertisementDTO): Promise<IListAdvertisement> {
    const advertisements = await this.advertisementRepository.list(data);

    await Promise.all(
      advertisements.advertisements.map(async ({ images }) => {
        const publicUrl = await this.bucket.getUrlFile(images[0].hash, 5);
        images[0].publicUrl = publicUrl;
      })
    );

    return advertisements;
  }
}
