import type { Request } from "express";
import type ITokenDecoded from "~/core/auth/interfaces/ITokenDecoded";
import type ValidateTokenService from "~/core/auth/service/ValidateTokenService";

export default class GetTokenInfo {
  constructor(private readonly validateTokenService: ValidateTokenService) {}

  async getUserInfo(req: Request): Promise<ITokenDecoded> {
    const auth = req.cookies.authorization ?? req.headers.authorization;
    const token = auth?.split(" ")[1];

    if (!token) return { user_id: "", iat: 0, exp: 0 } satisfies ITokenDecoded;

    return await this.validateTokenService.execute({ token });
  }

  async getUserId(req: Request): Promise<string> {
    const userId = await this.getUserInfo(req)
      .then((data) => data.user_id)
      .catch(() => "");

    return userId;
  }
}
