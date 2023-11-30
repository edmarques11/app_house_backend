import type IUseCase from "~/core/shared/IUseCase";
import type CreateUserDTO from "~/core/user/DTO/ICreateUserDTO";
import type IUserRepository from "~/core/user/repository/IUserRepository";
import type IUser from "~/core/user/model/IUser";
import type Encrypt from "~/external/encrypt/SecurityPassword";
import type UserAlreadyExists from "~/core/errors/user/UserAlreadyExists";

export default class CreateUserService
  implements IUseCase<CreateUserDTO, Partial<IUser>>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly encrypt: Encrypt,
    private readonly userAlreadyExists: UserAlreadyExists
  ) {}

  async execute(userData: CreateUserDTO): Promise<Partial<IUser>> {
    const userExists = await this.userRepository.findByEmail(userData.email);
    if (userExists) throw this.userAlreadyExists;

    const data = {
      name: userData.name,
      password: await this.encrypt.generateHash(userData.password),
      email: userData.email,
      profile_image_id: userData.profile_image_id,
    } as any;

    const { name, email, profile_image_id, created_at, updated_at } =
      await this.userRepository.create(data);

    return { name, email, profile_image_id, created_at, updated_at };
  }
}
