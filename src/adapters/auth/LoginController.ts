import type { Request, Response } from "express";
import type IUseCase from "~/adapters/shared/IUseCase";
import type LoginService from "~/core/auth/service/LoginService";
import type FactoryJsonResponse from "../shared/helpers/FactoryJsonResponse";

export default class LoginController implements IUseCase<Request, Response> {
  constructor(
    private readonly loginService: LoginService,
    private readonly factoryResponse: FactoryJsonResponse
  ) {}

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const { username, password } = request.body;

      const token = await this.loginService.execute({ username, password });

      response
        .status(200)
        .json({ code: response.statusCode, message: "ok", data: { token } });
    } catch (err: any) {
      this.factoryResponse.send(response, 401, err.message, {});
    }
  }
}
