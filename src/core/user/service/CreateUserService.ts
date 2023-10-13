import IRuleRepository from "~/core/rule/repository/IRuleRepository";
import IUseCase from "~/core/shared/IUseCase";
import CreateUser from "~/core/user/DTO/CreateUser";
import IUserRepository from "~/core/user/repository/IUserRepository";
import IUser from "../model/IUser";

export default class CreateUserService
  implements IUseCase<CreateUser, Partial<IUser>>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly ruleRepository: IRuleRepository
  ) {}

  async execute(entry: CreateUser): Promise<Partial<IUser>> {
    const rule = await this.ruleRepository.findByName(entry.rule);

    if (!rule) throw new Error("Rule does not exists");

    const data = {
      ...entry,
      rule_id: rule.id,
    } as any;

    delete data.rule;

    const { name, email, created_at, updatedAt } =
      await this.userRepository.create(data);

    return { name, email, created_at, updatedAt };
  }
}
