import { type PrismaClient } from "@prisma/client";
import type IDeleteAdvertisementDTO from "~/core/advertisement/DTO/IDeleteAdvertisementDTO";
import type IListAdvertisementDTO from "~/core/advertisement/DTO/IListAdvertisementDTO";
import type ISaveAdvertisementDTO from "~/core/advertisement/DTO/ISaveAdvertisementDTO";
import type IUpdateAdvertisementDTO from "~/core/advertisement/DTO/IUpdateAdvertisementDTOM";
import type IAdvertisementData from "~/core/advertisement/interfaces/IAdvertsementData";
import type IListAdvertisement from "~/core/advertisement/interfaces/IListAdvertisement";
import IAdvertisement from "~/core/advertisement/model/IAdvertisement";
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
    const skip = (data.page - 1) * data.itemsPerPage;

    const whereQuery: Record<string, any> = {};
    if (data.toOwner === "1")
      Object.assign(whereQuery, { owner_id: data.ownerId });

    if (data.location) {
      const fields = ["zip_code", "public_place", "district", "city", "uf"].map(
        (field) => ({
          [field]: { contains: data.location, mode: "insensitive" },
        })
      );

      Object.assign(whereQuery, {
        immobile: {
          address: {
            OR: fields,
          },
        },
      });
    }

    const total = await this.prisma.advertisement.count({ where: whereQuery });
    const advertisements = await this.prisma.advertisement.findMany({
      skip,
      take: data.itemsPerPage,
      where: whereQuery,
      include: {
        images: true,
        immobile: {
          include: {
            address: true,
          },
        },
      },
      orderBy: { updated_at: "desc" },
    });

    return { advertisements, total } satisfies IListAdvertisement;
  }

  async getById(id: string): Promise<IAdvertisementData | null> {
    const advertisement = await this.prisma.advertisement.findUnique({
      where: { id },
      include: {
        images: true,
        immobile: {
          include: {
            address: true,
          },
        },
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

  async delete(data: IDeleteAdvertisementDTO): Promise<IAdvertisement> {
    const advertisement = await this.prisma.advertisement.delete({
      where: { id: data.id, owner_id: data.ownerId },
    });

    return advertisement;
  }
}
