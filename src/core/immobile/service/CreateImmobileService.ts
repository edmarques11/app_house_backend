import type IUseCase from "~/core/shared/IUseCase";
import type ICreateImmobileDTO from "~/core/immobile/DTO/ICreateImmobileDTO";
import type IImobile from "~/core/immobile/Model/IImmobile";
import type IImobileRepository from "~/core/immobile/repository/IImobileRepository";
import type AddressNotExists from "~/core/errors/address/AddressNotExists";
import type IAddressRepository from "~/core/address/repository/IAddressRepository";

export default class CreateImmobileService
  implements IUseCase<ICreateImmobileDTO, IImobile>
{
  constructor(
    private readonly immobileRepository: IImobileRepository,
    private readonly addressRepsitory: IAddressRepository,
    private readonly addressNotExists: AddressNotExists
  ) {}

  async execute(data: ICreateImmobileDTO): Promise<IImobile> {
    const addressExists = await this.addressRepsitory.findById(data.address_id);

    if (!addressExists) throw this.addressNotExists;

    const immobile = await this.immobileRepository.create(data);

    return immobile;
  }
}
