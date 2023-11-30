import type { NextFunction, Request, Response } from "express";
import type FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import type IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";
import type PoorlyFormattedToken from "~/core/errors/auth/PoorlyFormattedToken";
import type TokenNotSend from "~/core/errors/auth/TokenNotSend";
import type UnauthorizedToken from "~/core/errors/auth/UnauthorizedToken";

export default class AuthMiddlweare {
  constructor(
    private readonly authRepository: IAuthTokenRepository,
    private readonly factoryResponse: FactoryJsonResponse,
    private readonly poorlyFormattedToken: PoorlyFormattedToken,
    private readonly tokenNotSend: TokenNotSend,
    private readonly unauthorizedToken: UnauthorizedToken
  ) {}

  middleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.cookies.authorization ?? req.headers.authorization;

    if (!authHeader) {
      this.factoryResponse.send(res, 401, this.tokenNotSend.message, {});
      return;
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      this.factoryResponse.send(
        res,
        401,
        this.poorlyFormattedToken.message,
        {}
      );
      return;
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      this.factoryResponse.send(
        res,
        401,
        this.poorlyFormattedToken.message,
        {}
      );
      return;
    }

    try {
      const decoded = this.authRepository.verifyValidToken(token);
      Object.assign(res, { userId: decoded?.userId });
      next();
    } catch (err) {
      this.factoryResponse.send(res, 401, this.unauthorizedToken.message, {});
    }
  }
}
