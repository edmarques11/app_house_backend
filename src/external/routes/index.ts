import { Request, Response, Router } from "express";
import { prismaClient } from "../clientDatabase/prisma/prismaClient";
import CreateUserController from "~/adapters/user/CreateUserController";
import CreateUserService from "~/core/user/service/CreateUserService";
import UserRepository from "../clientDatabase/repository/UserRepository";
import RuleRepository from "../clientDatabase/repository/RuleRepository";

const router: Router = Router();

// Repositories
const userRepository = new UserRepository(prismaClient);
const ruleRepository = new RuleRepository(prismaClient);

// User routes
const createUserService = new CreateUserService(userRepository, ruleRepository);
const createUserController = new CreateUserController(createUserService);
router.post("/user", (req: Request, res: Response) =>
  createUserController.execute(req, res)
);

export { router };
