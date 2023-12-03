import { type PrismaClient } from "@prisma/client";
import type ISaveAddressDTO from "~/core/address/DTO/ISaveAddressDTO";
import type IAddress from "~/core/address/model/IAddress";
import type IAddressRepository from "~/core/address/repository/IAddressRepository";

export default class AddressRepository implements IAddressRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(dataAddress: ISaveAddressDTO): Promise<IAddress> {
    const address = await this.prisma.address.create({ data: dataAddress });

    return address;
  }

  async findById(id: string): Promise<IAddress | null> {
    const address = await this.prisma.address.findUnique({ where: { id } });

    return address;
  }
}
