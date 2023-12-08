import type ICreateImmobileDTO from "~/core/immobile/DTO/ICreateImmobileDTO";
import type IImobile from "~/core/immobile/Model/IImmobile";

export default interface IImobileRepository {
  create(immobile: ICreateImmobileDTO): Promise<IImobile>
  findById(id: string): Promise<IImobile | null>
}
