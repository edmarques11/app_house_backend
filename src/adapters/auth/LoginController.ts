import { Request, Response } from "express";
import IUseCase from "~/adapters/shared/IUseCase";
import LoginService from "~/core/auth/service/LoginService";

export default class LoginController implements IUseCase<Request, Response> {
  constructor(private readonly loginService: LoginService) {}

  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body;

      const token = await this.loginService.execute({ username, password });

      return response
        .status(200)
        .json({ code: response.statusCode, message: "ok", data: { token } });
    } catch (err) {
      console.error(err);
      return response
        .status(401)
        .json({ status: response.statusCode, message: "Lascou o Zé da Joana" });
    }
  }
}
