import { CreateUserController } from "~/controllers/user/CreateUserController"

const createUserController = new CreateUserController()

interface IUserControllers {
  createUserController: CreateUserController;
}

const userControllers: IUserControllers = {
  createUserController
}

export { userControllers }