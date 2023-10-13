import CreateUserService from "~/core/user/service/CreateUserService";
import IUseCase from "../shared/IUseCase";
import { Request, Response } from "express";

export default class CreateUserController
  implements IUseCase<Request, Response>
{
  constructor(private readonly service: CreateUserService) {}

  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, rule } = request.body;

      const data = { name, email, password, rule };

      const userCreated = await this.service.execute(data);

      return response.status(201).json({
        code: response.statusCode,
        message: "Aí preá",
        data: userCreated,
      });
    } catch (err) {
      console.error(err)
      return response.status(400).json({ message: err });
    }
  }
}
