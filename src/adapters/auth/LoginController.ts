import { Request, Response } from "express";
import IUseCase from "~/adapters/shared/IUseCase";
import LoginService from "~/core/auth/service/LoginService";
import { InvalidEmailOrPassword } from "~/core/errors/auth/InvalidEmailOrPassword";
import FactoryJsonResponse from "../shared/helpers/FactoryJsonResponse";

export default class LoginController implements IUseCase<Request, Response> {
  constructor(private readonly loginService: LoginService) {}

  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body;

      const token = await this.loginService.execute({ username, password });

      return response
        .status(200)
        .json({ code: response.statusCode, message: "ok", data: { token } });
    } catch (err: any) {
      console.error(err);
      return FactoryJsonResponse.create(response, 401, err.message, {});
    }
  }
}
