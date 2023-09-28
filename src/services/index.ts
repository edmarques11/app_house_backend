import { ruleRepository, userRepository } from "~/repositories";
import { UserService } from "./UserService";

const userService = new UserService(userRepository, ruleRepository);

export { userService };
