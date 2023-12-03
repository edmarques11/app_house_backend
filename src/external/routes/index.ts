import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { prismaClient } from "~/external/clientDatabase/prisma/prismaClient";
import CreateUserController from "~/adapters/user/CreateUserController";
import CreateUserService from "~/core/user/service/CreateUserService";
import UserRepository from "~/external/clientDatabase/repository/UserRepository";
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
import LoginValidation from "~/adapters/auth/validations/LoginValidation";
import swaggerFile from "~/external/swagger/swagger_output.json";
import FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import InvalidEmailOrPassword from "~/core/errors/auth/InvalidEmailOrPassword";
import SaveAddressValidation from "~/adapters/address/validations/SaveAddressValidation";
import SaveAddressService from "~/core/address/service/SaveAddressService";
import AddressRepository from "../clientDatabase/repository/AddressRepository";
import SaveAddressController from "~/adapters/address/SaveAddressController";
import CreateImmobileValidation from "~/adapters/immobile/validations/CreateImmobileValidation";
import CreateImmobileService from "~/core/immobile/service/CreateImmobileService";
import ImmobileRepository from "../clientDatabase/repository/ImmobileRepository";
import AddressNotExists from "~/core/errors/address/AddressNotExists";
import CreateImmobileController from "~/adapters/immobile/CreateImmobileRepository";

const router: Router = Router();

// External helpers
const securityPassword = new SecurityPassword();
const factoryResponse = new FactoryJsonResponse();

// Errors
const tokenNotSend = new TokenNotSend();
const poorlyFormattedToken = new PoorlyFormattedToken();
const unauthorizedToken = new UnauthorizedToken();
const invalidEmailOrPassword = new InvalidEmailOrPassword();
const userAlreadyExists = new UserAlreadyExists();
const addressNotExists = new AddressNotExists();

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

// Repositories
const userRepository = new UserRepository(prismaClient);
const addressRepository = new AddressRepository(prismaClient);
const immobileRepository = new ImmobileRepository(prismaClient);

// Validators
const createUserValidation = new CreateUserValidation(factoryResponse);
const loginValidation = new LoginValidation(factoryResponse);
const saveAddressValidation = new SaveAddressValidation(factoryResponse);
const createImmobileValidation = new CreateImmobileValidation(factoryResponse);

// Services
const createUserService = new CreateUserService(
  userRepository,
  securityPassword,
  userAlreadyExists
);
const loginService = new LoginService(
  authTokenRepository,
  userRepository,
  securityPassword,
  invalidEmailOrPassword
);
const saveAddressService = new SaveAddressService(addressRepository);
const createImmobileService = new CreateImmobileService(
  immobileRepository,
  addressRepository,
  addressNotExists
);

// Controllers
const createUserController = new CreateUserController(
  createUserService,
  factoryResponse
);
const loginController = new LoginController(loginService, factoryResponse);
const saveAddressController = new SaveAddressController(
  saveAddressService,
  factoryResponse
);
const createImmobileController = new CreateImmobileController(
  createImmobileService,
  factoryResponse
);

// Swagger
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Api online
router.get("/", (req: Request, res: Response) => {
  res.send("<h1>API Online 😎</h1>")
});

// User routes
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
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    await loginValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await loginController.execute(req, res);
  }
);

// Address routes
router.post(
  "/address",
  async (req: Request, res: Response, next: NextFunction) => {
    await saveAddressValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await saveAddressController.execute(req, res);
  }
);

// Immobile routes
router.post(
  "/immobile",
  async (req: Request, res: Response, next: NextFunction) => {
    await createImmobileValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await createImmobileController.execute(req, res);
  }
);

// Rota não encontrada
router.all("*", (req: Request, res: Response) => {
  factoryResponse.send(res, 404, "Rota não encontrada", {});
});

export { router };
