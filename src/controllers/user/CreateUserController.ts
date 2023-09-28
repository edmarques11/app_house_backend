import { Request, Response } from "express";
import { ICreateUserDTO } from "~/DTOs/user";
import { IController } from "~/controllers/Interfaces/IController";
import { UserService } from "~/services/UserService";

export class CreateUserController extends IController {
  constructor(private userService: UserService) {
    super();
  }

  async handler(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, rule } = request.body;

      const user = await this.userService.create({
        name,
        email,
        password,
        rule,
      } as ICreateUserDTO);

      return response.status(201).json(user);
    } catch (err) {
      console.error(err);
      return response.status(400).json({ message: "lascou o zé da joana" });
    }
  }
}
