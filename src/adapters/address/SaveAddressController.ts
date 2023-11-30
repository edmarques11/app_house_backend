import type { Request, Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type SaveAddressService from "~/core/address/service/SaveAddressService";
import type FactoryJsonResponse from "~/adapters//shared/helpers/FactoryJsonResponse";
import type ISaveAddressDTO from "~/core/address/DTO/ISaveAddressDTO";
import type IAddress from "~/core/address/model/IAddress";

export default class SaveAddressController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly service: SaveAddressService,
    private readonly factoryResponse: FactoryJsonResponse
  ) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      let { validatedData } = req.body;

      validatedData = {
        ...validatedData,
        zip_code: validatedData.zip_code.replace("-", ""),
      };

      const address: IAddress = await this.service.execute(
        validatedData as ISaveAddressDTO
      );

      this.factoryResponse.send(res, 201, "ok", address);
    } catch (err: any) {
      this.factoryResponse.send(res, 400, err.message, {});
    }
  }
}
