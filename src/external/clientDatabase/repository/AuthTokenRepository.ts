import IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";
import jwt from "jsonwebtoken";

export default class AuthTokenRepository implements IAuthTokenRepository {
  constructor(private readonly privateKey: string) {}

  createToken(): string {
    const token = jwt.sign({}, this.privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
    });
    return token;
  }

  verifyValidToken(token: string): string {
    try {
      const decoded = jwt.verify(token, this.privateKey);
      return `${decoded}`;
    } catch {
      throw new Error("Token inválido");
    }
  }
}
