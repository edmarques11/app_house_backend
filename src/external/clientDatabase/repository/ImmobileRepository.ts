import type { PrismaClient } from "@prisma/client";
import type CreateImmobileDTO from "~/core/immobile/DTO/ICreateImmobileDTO";
import type IImobile from "~/core/immobile/Model/IImmobile";
import type IImobileRepository from "~/core/immobile/repository/IImobileRepository";

export default class ImmobileRepository implements IImobileRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async create(immobile: CreateImmobileDTO): Promise<IImobile> {
      const immobileCreated = await this.prisma.immobile.create({ data: immobile });

      return immobileCreated;
  }
}
