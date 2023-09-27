import { Router } from "express";
import { UserRouter } from "~/routes/user/User.route";
import { userControllers } from "~/controllers";

const router: Router = Router();

new UserRouter(router, userControllers.createUserController);

export { router };
