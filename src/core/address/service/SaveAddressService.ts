import type IUseCase from "~/core/shared/IUseCase";
import type ISaveAddressDTO from "~/core/address/DTO/ISaveAddressDTO";
import type IAddressRepository from "~/core/address/repository/IAddressRepository";
import type IAddress from "~/core/address/model/IAddress";

export default class SaveAddressService
  implements IUseCase<ISaveAddressDTO, IAddress>
{
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(dataAddress: ISaveAddressDTO): Promise<IAddress> {
    const address = await this.addressRepository.save(dataAddress);

    return address;
  }
}
