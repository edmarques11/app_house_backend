import type ISaveAdvertisementDTO from "~/core/advertisement/DTO/ISaveAdvertisementDTO";
import type IListAdvertisement from "~/core/advertisement/interfaces/IListAdvertisement";
import type IListAdvertisementDTO from "~/core/advertisement/DTO/IListAdvertisementDTO";
import type IUpdateAdvertisementDTO from "../DTO/IUpdateAdvertisementDTOM";
import type IAdvertisementData from "../interfaces/IAdvertsementData";

export default interface IAdvertisementRepository {
  save(data: ISaveAdvertisementDTO): Promise<void>
  list(data: IListAdvertisementDTO): Promise<IListAdvertisement>
  update(data: IUpdateAdvertisementDTO): Promise<void>
  getById(id: string): Promise<IAdvertisementData | null>
}
