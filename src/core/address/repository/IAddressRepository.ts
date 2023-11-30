import type IAddress from "~/core/address/model/IAddress.ts";
import type ISaveAddressDTO from "~/core/address/DTO/ISaveAddressDTO";

export default interface IAddressRepository {
  save(address: ISaveAddressDTO): Promise<IAddress>
}
