import { CreateUserController } from "./CreateUserController"

const createUserController = new CreateUserController()

interface IUserControllers {
  createUserController: CreateUserController;
}

const userControllers: IUserControllers = {
  createUserController
}

export { userControllers }