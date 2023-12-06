import type CreateUserService from "~/core/user/service/CreateUserService";
import type IUseCase from "~/adapters/shared/IUseCase";
import type { Request, Response } from "express";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type ICreateUserDTO from "~/core/user/DTO/ICreateUserDTO";

export default class CreateUserController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly service: CreateUserService,
    private readonly factoryResponse: FactoryJsonResponse
  ) {}

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const { validatedData } = request.body;

      const userCreated = await this.service.execute(
        validatedData as ICreateUserDTO
      );

      this.factoryResponse.send(response, 201, "Usuário criado", userCreated);
    } catch (err: any) {
      this.factoryResponse.send(response, 400, err.message, {});
    }
  }
}
