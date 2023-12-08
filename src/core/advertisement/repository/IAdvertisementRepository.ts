import type ISaveAdvertisementDTO from "~/core/advertisement/DTO/ISaveAdvertisementDTO";

export default interface IAdvertisementRepository {
  save(data: ISaveAdvertisementDTO): Promise<void>
}
