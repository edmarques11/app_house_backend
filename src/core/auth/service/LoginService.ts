import IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";
import ILogin from "~/core/auth/DTO/ILogin";
import IUserRepository from "~/core/user/repository/IUserRepository";
import SecurityPassword from "~/external/encrypt/SecurityPassword";

export default class LoginService {
  constructor(
    private readonly authTokenRepository: IAuthTokenRepository,
    private readonly userRepository: IUserRepository,
    private readonly encrypt: SecurityPassword
  ) {}

  async execute(data: ILogin): Promise<string | null> {
    const user = await this.userRepository.findByEmail(data.username);

    const errorMessage: string = "Email ou password incorretos";

    if (!user) throw new Error(errorMessage);

    if (!this.encrypt.verifyPassword(data.password, user.password))
      throw new Error(errorMessage);

    const dataSaveToken = {
      user_id: user.id
    }

    const token  = await this.authTokenRepository.createToken(dataSaveToken);

    return token;
  }
}
