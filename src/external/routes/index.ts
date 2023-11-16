import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
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
import TokenNotSend from "~/core/errors/auth/TokenNotSend";
import PoorlyFormattedToken from "~/core/errors/auth/PoorlyFormattedToken";
import UnauthorizedToken from "~/core/errors/auth/UnauthorizedToken";
import CreateUserValidation from "~/adapters/user/validations/CreateUserValidation";
import UserAlreadyExists from "~/core/errors/user/UserAlreadyExists";
import RuleNotExist from "~/core/errors/rule/RuleNotExists";
import LoginValidator from "~/adapters/auth/validations/LoginValidator";
import swaggerFile from "~/external/swagger/swagger_output.json";
import FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import InvalidEmailOrPassword from "~/core/errors/auth/InvalidEmailOrPassword";

const router: Router = Router();
const factoryResponse = new FactoryJsonResponse();

// Errors
const tokenNotSend = new TokenNotSend();
const poorlyFormattedToken = new PoorlyFormattedToken();
const unauthorizedToken = new UnauthorizedToken();
const invalidEmailOrPassword = new InvalidEmailOrPassword();

const userAlreadyExists = new UserAlreadyExists();
const ruleNotExists = new RuleNotExist();

// Middleware
const privateKey: string = process.env.PRIVATE_KEY ?? "";

const authTokenRepository = new AuthTokenRepository(privateKey);

const authMiddleware = new AuthMiddleware(
  authTokenRepository,
  factoryResponse,
  poorlyFormattedToken,
  tokenNotSend,
  unauthorizedToken
);

const publicRoutes: string[] = process.env.PUBLIC_ROUTES?.split(",") ?? [];
router.all("*", (req: Request, res: Response, next: NextFunction) => {
  if (
    (/^\/api-docs\/*/.test(req.path) && !process.env.production) ||
    publicRoutes.includes(req.path)
  ) {
    next();
  } else {
    authMiddleware.middleware(req, res, next);
  }
});

// External helpers
const securityPassword = new SecurityPassword();

// Repositories
const userRepository = new UserRepository(prismaClient);
const ruleRepository = new RuleRepository(prismaClient);

// Swagger
router.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);

// User routes
const createUserValidation = new CreateUserValidation(factoryResponse);
const createUserService = new CreateUserService(
  userRepository,
  ruleRepository,
  securityPassword,
  ruleNotExists,
  userAlreadyExists
);
const createUserController = new CreateUserController(
  createUserService,
  factoryResponse
);
router.post(
  "/user",
  async (req: Request, res: Response, next: NextFunction) => {
    await createUserValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await createUserController.execute(req, res);
  }
);

// Auth routes
const loginValidation = new LoginValidator(factoryResponse);
const loginService = new LoginService(
  authTokenRepository,
  userRepository,
  securityPassword,
  invalidEmailOrPassword
);
const loginController = new LoginController(loginService, factoryResponse);
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    await loginValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await loginController.execute(req, res);
  }
);

export { router };
