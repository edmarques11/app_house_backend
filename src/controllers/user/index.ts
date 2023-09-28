import { CreateUserController } from "~/controllers/user/CreateUserController";
import { userService } from "~/services";
import { IUserControllers } from "~/controllers/Interfaces/IUserControllers";

const createUserController = new CreateUserController(userService);

const userControllers: IUserControllers = {
  createUserController,
};

export { userControllers };
