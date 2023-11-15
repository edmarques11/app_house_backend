import IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";
import ILogin from "~/core/auth/DTO/ILogin";
import IUserRepository from "~/core/user/repository/IUserRepository";
import SecurityPassword from "~/external/encrypt/SecurityPassword";
import { InvalidEmailOrPassword } from "~/core/errors/auth/InvalidEmailOrPassword";

export default class LoginService {
  constructor(
    private readonly authTokenRepository: IAuthTokenRepository,
    private readonly userRepository: IUserRepository,
    private readonly encrypt: SecurityPassword
  ) {}

  async execute(data: ILogin): Promise<string | null | InvalidEmailOrPassword> {
    const user = await this.userRepository.findByEmail(data.username);

    if (!user) throw new InvalidEmailOrPassword();

    if (!this.encrypt.verifyPassword(data.password, user.password))
      throw new InvalidEmailOrPassword();

    const dataSaveToken = {
      user_id: user.id,
    };

    const token = await this.authTokenRepository.createToken(dataSaveToken);

    return token;
  }
}
