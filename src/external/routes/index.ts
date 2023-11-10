import { NextFunction, Request, Response, Router } from "express";
import { prismaClient } from "~/external/clientDatabase/prisma/prismaClient";
import CreateUserController from "~/adapters/user/CreateUserController";
import CreateUserService from "~/core/user/service/CreateUserService";
import UserRepository from "~/external/clientDatabase/repository/UserRepository";
import RuleRepository from "~/external/clientDatabase/repository/RuleRepository";
import SecurityPassword from "~/external/encrypt/SecurityPassword";
import LoginController from "~/adapters/auth/LoginController";
import LoginService from "~/core/auth/service/LoginService";
import AuthTokenRepository from "~/external/clientDatabase/repository/AuthTokenRepository";
import AuthMiddleware from "~/adapters/auth/middleware/AuthMiddleware";

const router: Router = Router();

// Middleware
const privateKey: string = process.env.PRIVATE_KEY ?? "";

const authTokenRepository = new AuthTokenRepository(privateKey);

const authMiddleware = new AuthMiddleware(authTokenRepository);

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  if (["/login"].includes(req.path)) return next();

  authMiddleware.middleware(req, res, next);
});

// External helpers
const securityPassword = new SecurityPassword();

// Repositories
const userRepository = new UserRepository(prismaClient);
const ruleRepository = new RuleRepository(prismaClient);

// User routes
const createUserService = new CreateUserService(
  userRepository,
  ruleRepository,
  securityPassword
);
const createUserController = new CreateUserController(createUserService);
router.post("/user", (req: Request, res: Response) =>
  createUserController.execute(req, res)
);

// Auth routes
const loginService = new LoginService(
  authTokenRepository,
  userRepository,
  securityPassword
);
const loginController = new LoginController(loginService);
router.post("/login", (req: Request, res: Response) =>
  loginController.execute(req, res)
);

export { router };
