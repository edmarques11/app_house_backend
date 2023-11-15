import IRuleRepository from "~/core/rule/repository/IRuleRepository";
import IUseCase from "~/core/shared/IUseCase";
import CreateUser from "~/core/user/DTO/ICreateUser";
import IUserRepository from "~/core/user/repository/IUserRepository";
import IUser from "../model/IUser";
import Encrypt from "~/external/encrypt/SecurityPassword";
import RuleNotExist from "~/core/errors/rule/RuleNotExists";
import UserAlreadyExists from "~/core/errors/user/UserAlreadyExists";

export default class CreateUserService
  implements IUseCase<CreateUser, Partial<IUser>>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly ruleRepository: IRuleRepository,
    private readonly encrypt: Encrypt,
    private readonly ruleNotExists: RuleNotExist,
    private readonly userAlreadyExists: UserAlreadyExists
  ) {}

  async execute(userData: CreateUser): Promise<Partial<IUser>> {
    const rule = await this.ruleRepository.findByName(userData.rule);

    if (!rule) throw this.ruleNotExists;

    const userExists = await this.userRepository.findByEmail(userData.email);
    if (userExists) throw this.userAlreadyExists;

    const data = {
      name: userData.name,
      password: await this.encrypt.generateHash(userData.password),
      email: userData.email,
      rule_id: rule.id,
    } as any;

    const { name, email, created_at, updated_at } =
      await this.userRepository.create(data);

    return { name, email, created_at, updated_at };
  }
}
