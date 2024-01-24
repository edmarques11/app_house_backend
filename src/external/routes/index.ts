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
import SaveImageValidation from "~/adapters/image/validations/SaveImageValidation";
import SaveImageService from "~/core/image/service/SaveImageService";
import ImageRepository from "~/external/clientDatabase/repository/ImageRepository";
import SaveImageController from "~/adapters/image/SaveImageController";
import SaveImageMiddleware from "~/adapters/image/middleware/SaveImageMiddleware";
import upload from "~/external/multer/multerConfig";
import AdvertisementRepository from "../clientDatabase/repository/AdvertisementRepository";
import SaveAdvertisementValidation from "~/adapters/advertisement/validations/SaveAdvertisementValidation";
import SaveAdvertisementService from "~/core/advertisement/service/SaveAdvertisementService";
import UserNotExists from "~/core/errors/user/UserNotExists";
import ImmobileNotExists from "~/core/errors/immobile/ImmobileNotExists";
import SomeImageNotExists from "~/core/errors/image/SomeImageNotExists";
import SaveAdvertisementController from "~/adapters/advertisement/SaveAdvertisementController";
import DeleteImageValidation from "~/adapters/image/validations/DeleteImageValidation";
import DeleteImageService from "~/core/image/service/DeleteImageService";
import DeleteImageController from "~/adapters/image/DeleteImageController";
import Bucket from "~/external/firebase/Bucket";
import ListAdvertisementValidation from "~/adapters/advertisement/validations/ListAdvertisementValidation";
import ListAdvertisementService from "~/core/advertisement/service/ListAdvertisementService";
import ListAdvertisementController from "~/adapters/advertisement/ListAdvertisementController";
import GetAdvertisementValidation from "~/adapters/advertisement/validations/GetAdvertisementValidadtion";
import GetAdvertisementService from "~/core/advertisement/service/GetAdvertisementService";
import GetAdvertisementController from "~/adapters/advertisement/GetAdvertisementController";
import DeleteAdvertisementValidation from "~/adapters/advertisement/validations/DeleteAdvertisementValidadtion";
import DeleteAdvertisementService from "~/core/advertisement/service/DeleteAdvertisementService";
import DeleteAdvertisementController from "~/adapters/advertisement/DeleteAdvertisementController";
import ValidateTokenService from "~/core/auth/service/ValidateTokenService";
import GetTokenInfo from "~/adapters/auth/herlper/GetTokenInfo";

const router: Router = Router();

// External helpers
const securityPassword = new SecurityPassword();
const factoryResponse = new FactoryJsonResponse();

// External libs
const firebaseBucket = new Bucket();

// Errors
const tokenNotSend = new TokenNotSend();
const poorlyFormattedToken = new PoorlyFormattedToken();
const unauthorizedToken = new UnauthorizedToken();
const invalidEmailOrPassword = new InvalidEmailOrPassword();
const userAlreadyExists = new UserAlreadyExists();
const addressNotExists = new AddressNotExists();
const userNotExists = new UserNotExists();
const immobileNotExists = new ImmobileNotExists();
const someImageNotExists = new SomeImageNotExists();

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
const saveImageMiddleware = new SaveImageMiddleware(factoryResponse, upload);

// Repositories
const userRepository = new UserRepository(prismaClient);
const addressRepository = new AddressRepository(prismaClient);
const immobileRepository = new ImmobileRepository(prismaClient);
const imageRepository = new ImageRepository(prismaClient);
const advertisementRepository = new AdvertisementRepository(prismaClient);

// Validators
const createUserValidation = new CreateUserValidation(factoryResponse);
const loginValidation = new LoginValidation(factoryResponse);
const saveAddressValidation = new SaveAddressValidation(factoryResponse);
const createImmobileValidation = new CreateImmobileValidation(factoryResponse);
const saveImageValidation = new SaveImageValidation(factoryResponse);
const deleteImageValidation = new DeleteImageValidation(factoryResponse);
const saveAdvertisementValidation = new SaveAdvertisementValidation(
  factoryResponse
);
const listAdvertisementValidation = new ListAdvertisementValidation(
  factoryResponse
);
const getAdvertisementValidation = new GetAdvertisementValidation(
  factoryResponse
);
const deleteAdvertisementValidation = new DeleteAdvertisementValidation(
  factoryResponse
);

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
const validateTokenService = new ValidateTokenService(authTokenRepository)
const saveAddressService = new SaveAddressService(addressRepository);
const createImmobileService = new CreateImmobileService(
  immobileRepository,
  addressRepository,
  addressNotExists
);
const saveImageService = new SaveImageService(imageRepository, firebaseBucket);
const deleteImageService = new DeleteImageService(imageRepository);
const saveAdvertisementService = new SaveAdvertisementService(
  advertisementRepository,
  userRepository,
  immobileRepository,
  imageRepository,
  userNotExists,
  immobileNotExists,
  someImageNotExists
);
const listAdvertisementService = new ListAdvertisementService(
  advertisementRepository,
  firebaseBucket
);
const getAdvertisementService = new GetAdvertisementService(
  advertisementRepository,
  firebaseBucket
);
const deleteAdvertisementService = new DeleteAdvertisementService(
  advertisementRepository
);

// Helpers Controllers
const getTokenInfo = new GetTokenInfo(validateTokenService)

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
const saveImageController = new SaveImageController(
  saveImageService,
  factoryResponse
);
const deleteImageController = new DeleteImageController(
  deleteImageService,
  factoryResponse
);
const saveAdvertisementController = new SaveAdvertisementController(
  saveAdvertisementService,
  factoryResponse,
  getTokenInfo
);
const listAdvertisementController = new ListAdvertisementController(
  listAdvertisementService,
  factoryResponse,
  getTokenInfo
);
const getAdvertisementController = new GetAdvertisementController(
  getAdvertisementService,
  factoryResponse
);
const deleteAdvertisementController = new DeleteAdvertisementController(
  deleteAdvertisementService,
  factoryResponse
);

// Swagger
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Api online
router.get("/", (req: Request, res: Response) => {
  res.send("<h1>API Online 😎</h1>");
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
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.middleware(req, res, next);
  },
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
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.middleware(req, res, next);
  },
  async (req: Request, res: Response, next: NextFunction) => {
    await createImmobileValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await createImmobileController.execute(req, res);
  }
);

// Image routes
router.post(
  "/image",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.middleware(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    saveImageMiddleware.execute(req, res, next);
  },
  async (req: Request, res: Response, next: NextFunction) => {
    await saveImageValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await saveImageController.execute(req, res);
  }
);
router.delete(
  "/image/:id",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.middleware(req, res, next);
  },
  async (req: Request, res: Response, next: NextFunction) => {
    await deleteImageValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await deleteImageController.execute(req, res);
  }
);

// Advertisement routes
router.post(
  "/advertisement",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.middleware(req, res, next);
  },
  async (req: Request, res: Response, next: NextFunction) => {
    await saveAdvertisementValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await saveAdvertisementController.execute(req, res);
  }
);
router.get(
  "/advertisement",
  async (req: Request, res: Response, next: NextFunction) => {
    await listAdvertisementValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await listAdvertisementController.execute(req, res);
  }
);
router.get(
  "/advertisement/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    await getAdvertisementValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await getAdvertisementController.execute(req, res);
  }
);
router.delete(
  "/advertisement/:id",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.middleware(req, res, next);
  },
  async (req: Request, res: Response, next: NextFunction) => {
    await deleteAdvertisementValidation.execute(req, res, next);
  },
  async (req: Request, res: Response) => {
    await deleteAdvertisementController.execute(req, res);
  }
);

// Rota não encontrada
router.all("*", (req: Request, res: Response) => {
  factoryResponse.send(res, 404, "Rota não encontrada", {});
});

export { router };
