import type IImage from "~/core/image/model/IImage";
import type ISaveImageDTO from "../DTO/ISaveImageDTO";

export default interface IImageRepository {
  save(hash: ISaveImageDTO): Promise<IImage>
  delete(id: string): Promise<IImage>
  findManyByIds(ids: string[]): Promise<IImage[]>
}
