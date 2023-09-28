import { User } from "@prisma/client";
import { ICreateUserDTO } from "~/DTOs/user";
import { RuleRepository } from "~/repositories/RuleRepository";
import { UserRepository } from "~/repositories/UserRepository";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private ruleRepository: RuleRepository
  ) {}

  public async create(user: ICreateUserDTO): Promise<User | null> {
    const rule = await this.ruleRepository.getRuleByName(user.rule);

    if (!rule) throw new Error("Rule does not exists");

    const data = {
      ...user,
      rule_id: rule.id,
    } as any;

    delete data.rule

    const userCreated = await this.userRepository.save(data);

    return userCreated;
  }
}
