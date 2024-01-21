import type IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";
import jwt from "jsonwebtoken";
import type ITokenDecoded from "~/core/auth/interfaces/ITokenDecoded";

export default class AuthTokenRepository implements IAuthTokenRepository {
  constructor(private readonly privateKey: string) {}

  createToken(payload: object): string {
    const token = jwt.sign(payload, this.privateKey, {
      // algorithm: "RS256",
      expiresIn: "1h",
    });
    return token;
  }

  verifyValidToken(token: string): ITokenDecoded {
    try {
      const decoded = jwt.verify(token, this.privateKey);
      return decoded as ITokenDecoded;
    } catch {
      throw new Error("Token inválido");
    }
  }
}
