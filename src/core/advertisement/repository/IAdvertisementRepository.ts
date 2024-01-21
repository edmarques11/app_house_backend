import type ISaveAdvertisementDTO from "~/core/advertisement/DTO/ISaveAdvertisementDTO";
import type IListAdvertisement from "~/core/advertisement/interfaces/IListAdvertisement";
import type IListAdvertisementDTO from "~/core/advertisement/DTO/IListAdvertisementDTO";
import type IUpdateAdvertisementDTO from "~/core/advertisement/DTO/IUpdateAdvertisementDTOM";
import type IAdvertisementData from "~/core/advertisement/interfaces/IAdvertsementData";
import type IDeleteAdvertisementDTO from "~/core/advertisement/DTO/IDeleteAdvertisementDTO";

export default interface IAdvertisementRepository {
  save(data: ISaveAdvertisementDTO): Promise<void>
  list(data: IListAdvertisementDTO): Promise<IListAdvertisement>
  update(data: IUpdateAdvertisementDTO): Promise<void>
  getById(id: string): Promise<IAdvertisementData | null>
  delete(data: IDeleteAdvertisementDTO): Promise<void>
}
