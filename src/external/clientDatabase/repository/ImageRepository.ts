import type { PrismaClient } from "@prisma/client";
import type ISaveImageDTO from "~/core/image/DTO/ISaveImageDTO";
import type IImage from "~/core/image/model/IImage";
import type IImageRepository from "~/core/image/repository/IImageRepository";
import admin from "~/external/firebase/admin";

const bucket = admin.storage().bucket();
export default class ImageRepository implements IImageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(data: ISaveImageDTO): Promise<IImage> {
    const image = await this.prisma.image.create({
      data: { hash: data.fileHash },
    });

    const expirationDate: Date = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    const [imageUrl] = await bucket
      .file(data.fileHash)
      .getSignedUrl({ action: "read", expires: expirationDate });

    return { ...image, publicUrl: imageUrl } satisfies IImage;
  }

  async delete(id: string): Promise<IImage> {
    const deleted = await this.prisma.image.delete({ where: { id } });

    return deleted;
  }

  async findManyByIds(ids: string[]): Promise<IImage[]> {
    const images = await this.prisma.image.findMany({
      where: { id: { in: ids } },
    });

    return images;
  }
}
