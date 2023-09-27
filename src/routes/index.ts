import { Router } from "express";
import { UserRouter } from "./user/User.route";
import { userControllers } from "../controllers";

const router: Router = Router();

new UserRouter(router, userControllers.createUserController);

export { router };
