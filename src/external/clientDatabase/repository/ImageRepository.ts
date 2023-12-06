import type { PrismaClient } from "@prisma/client";
import type ISaveImageDTO from "~/core/image/DTO/ISaveImageDTO";
import type IImage from "~/core/image/model/IImage";
import type IImageRepository from "~/core/image/repository/IImageRepository";

export default class ImageRepository implements IImageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(data: ISaveImageDTO): Promise<IImage> {
    const image = await this.prisma.image.create({
      data: { hash: data.fileHash },
    });

    return image;
  }

  async delete(id: string): Promise<IImage> {
    const deleted = await this.prisma.image.delete({ where: { id } });

    return deleted;
  }
}
