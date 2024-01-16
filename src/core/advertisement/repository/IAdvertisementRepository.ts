import type ISaveAdvertisementDTO from "~/core/advertisement/DTO/ISaveAdvertisementDTO";
import type IListAdvertisement from "~/core/advertisement/interfaces/IListAdvertisement";
import type IListAdvertisementDTO from "~/core/advertisement/DTO/IListAdvertisementDTO";

export default interface IAdvertisementRepository {
  save(data: ISaveAdvertisementDTO): Promise<void>
  list(data: IListAdvertisementDTO): Promise<IListAdvertisement>
}
