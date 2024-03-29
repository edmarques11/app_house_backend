import type IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";
import type ILogin from "~/core/auth/DTO/ILoginDTO";
import type IUserRepository from "~/core/user/repository/IUserRepository";
import type SecurityPassword from "~/external/encrypt/SecurityPassword";
import type InvalidEmailOrPassword from "~/core/errors/auth/InvalidEmailOrPassword";
import type IUseCase from "~/core/shared/IUseCase";

export default class LoginService
  implements IUseCase<ILogin, string | null | InvalidEmailOrPassword>
{
  constructor(
    private readonly authTokenRepository: IAuthTokenRepository,
    private readonly userRepository: IUserRepository,
    private readonly encrypt: SecurityPassword,
    private readonly invalidEmailOrPassword: InvalidEmailOrPassword
  ) {}

  async execute(data: ILogin): Promise<string | null | InvalidEmailOrPassword> {
    const user = await this.userRepository.findByEmail(data.username);

    if (!user) throw this.invalidEmailOrPassword;

    const isCorrectPassword = await this.encrypt.verifyPassword(
      data.password,
      user.password
    );

    if (!isCorrectPassword) {
      throw this.invalidEmailOrPassword;
    }

    const dataSaveToken = {
      user_id: user.id,
    };

    const token = this.authTokenRepository.createToken(dataSaveToken);

    return token;
  }
}
