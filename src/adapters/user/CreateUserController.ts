import type CreateUserService from "~/core/user/service/CreateUserService";
import type IUseCase from "~/adapters/shared/IUseCase";
import type { Request, Response } from "express";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";

export default class CreateUserController
  implements IUseCase<Request, Response>
{
  constructor(
    private readonly service: CreateUserService,
    private readonly factoryResponse: FactoryJsonResponse
  ) {}

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const { name, email, password, rule } = request.body;

      const data = { name, email, password, rule };

      const userCreated = await this.service.execute(data);

      response.status(201).json({
        code: response.statusCode,
        message: "Aí preá",
        data: userCreated,
      });
    } catch (err: any) {
      this.factoryResponse.send(response, 400, err.message, {});
    }
  }
}
