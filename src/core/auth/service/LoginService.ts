import type IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";
import type ILogin from "~/core/auth/DTO/ILogin";
import type IUserRepository from "~/core/user/repository/IUserRepository";
import type SecurityPassword from "~/external/encrypt/SecurityPassword";
import type { InvalidEmailOrPassword } from "~/core/errors/auth/InvalidEmailOrPassword";

export default class LoginService {
  constructor(
    private readonly authTokenRepository: IAuthTokenRepository,
    private readonly userRepository: IUserRepository,
    private readonly encrypt: SecurityPassword,
    private readonly invalidEmailOrPassword: InvalidEmailOrPassword
  ) {}

  async execute(data: ILogin): Promise<string | null | InvalidEmailOrPassword> {
    const user = await this.userRepository.findByEmail(data.username);

    if (!user) throw this.invalidEmailOrPassword;

    if (!this.encrypt.verifyPassword(data.password, user.password)) {
      throw this.invalidEmailOrPassword;
    }

    const dataSaveToken = {
      user_id: user.id,
    };

    const token = this.authTokenRepository.createToken(dataSaveToken);

    return token;
  }
}
