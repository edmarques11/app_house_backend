import { prismaClient } from "~/database/prismaClient";
import { RuleRepository } from "./RuleRepository";
import { UserRepository } from "./UserRepository";

const ruleRepository = new RuleRepository(prismaClient);
const userRepository = new UserRepository(prismaClient);

export { ruleRepository, userRepository };
