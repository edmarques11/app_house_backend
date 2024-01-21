import { type PrismaClient } from "@prisma/client";
import type IDeleteAdvertisementDTO from "~/core/advertisement/DTO/IDeleteAdvertisementDTO";
import type IListAdvertisementDTO from "~/core/advertisement/DTO/IListAdvertisementDTO";
import type ISaveAdvertisementDTO from "~/core/advertisement/DTO/ISaveAdvertisementDTO";
import type IUpdateAdvertisementDTO from "~/core/advertisement/DTO/IUpdateAdvertisementDTOM";
import type IAdvertisementData from "~/core/advertisement/interfaces/IAdvertsementData";
import type IListAdvertisement from "~/core/advertisement/interfaces/IListAdvertisement";
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

  async list(data: IListAdvertisementDTO): Promise<IListAdvertisement> {
    const total = await this.prisma.advertisement.count();
    const skip = (data.page - 1) * data.itemsPerPage;

    const whereQuery: Record<string, any> = {};
    if (data.toOwner === "1") Object.assign(whereQuery, { owner_id: data.ownerId });

    const advertisements = await this.prisma.advertisement.findMany({
      skip,
      take: data.itemsPerPage,
      where: whereQuery,
      include: {
        images: true,
        immobile: true,
      },
    });

    return { advertisements, total } satisfies IListAdvertisement;
  }

  async getById(id: string): Promise<IAdvertisementData | null> {
    const advertisement = await this.prisma.advertisement.findUnique({
      where: { id },
      include: {
        images: true,
        immobile: true,
      },
    });

    return advertisement;
  }

  async update(data: IUpdateAdvertisementDTO): Promise<void> {
    const { id, images, ...dataAdvertisement } = data;

    await this.prisma.advertisement.update({
      where: { id },
      data: {
        ...dataAdvertisement,
        images: {
          connect: images.map((image: string) => ({ id: image })),
        },
      },
    });
  }

  async delete(data: IDeleteAdvertisementDTO): Promise<void> {
    await this.prisma.advertisement.delete({ where: { id: data.id } });
  }
}
