import type IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";
import type IUseCase from "~/core/shared/IUseCase";
import type ITokenDecoded from "../interfaces/ITokenDecoded";
import type IValidateTokenDTO from "../DTO/IValidateTokenDTO";

export default class ValidateTokenService
  implements IUseCase<IValidateTokenDTO, ITokenDecoded>
{
  constructor(private readonly authTokenRepository: IAuthTokenRepository) {}

  async execute(data: IValidateTokenDTO): Promise<ITokenDecoded> {
    const decoded = this.authTokenRepository.verifyValidToken(data.token);
    return decoded;
  }
}
