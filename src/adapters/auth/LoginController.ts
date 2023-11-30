import type { Request, Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type LoginService from "~/core/auth/service/LoginService";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type ILoginDTO from "~/core/auth/DTO/ILoginDTO";

export default class LoginController implements IUseCase<Request, Response> {
  constructor(
    private readonly loginService: LoginService,
    private readonly factoryResponse: FactoryJsonResponse
  ) {}

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const { validatedData } = request.body;

      const token = await this.loginService.execute(validatedData as ILoginDTO);

      response
        .status(200)
        .json({ code: response.statusCode, message: "ok", data: { token } });
    } catch (err: any) {
      this.factoryResponse.send(response, 401, err.message, {});
    }
  }
}
