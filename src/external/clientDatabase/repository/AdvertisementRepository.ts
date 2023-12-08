import { type PrismaClient } from "@prisma/client";
import type ISaveAdvertisementDTO from "~/core/advertisement/DTO/ISaveAdvertisementDTO";
import type IAdvertisementRepository from "~/core/advertisement/repository/IAdvertisementRepository";

export default class AdvertisementRepository
  implements IAdvertisementRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async save(data: ISaveAdvertisementDTO): Promise<void> {
    const { images, ...dataAdvertisement } = data;

    await this.prisma.advertisement.create({
      data: {
        ...dataAdvertisement,
        active: 1,
        images: {
          connect: images.map((image) => ({ id: image })),
        },
      },
    });
  }
}
