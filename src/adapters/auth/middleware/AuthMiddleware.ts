import { NextFunction, Request, Response } from "express";
import FactoryJsonResponse from "~/adapters/shared/helpers/FactoryJsonResponse";
import IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";
import PoorlyFormattedToken from "~/core/errors/auth/PoorlyFormattedToken";
import TokenNotSend from "~/core/errors/auth/TokenNotSend";
import UnauthorizedToken from "~/core/errors/auth/UnauthorizedToken";

export default class AuthMiddlweare {
  constructor(
    private readonly authRepository: IAuthTokenRepository,
    private readonly poorlyFormattedToken: PoorlyFormattedToken,
    private readonly tokenNotSend: TokenNotSend,
    private readonly unauthorizedToken: UnauthorizedToken
  ) {}

  middleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return FactoryJsonResponse.create(
        res,
        401,
        this.tokenNotSend.message,
        {}
      );

    const parts = authHeader.split(" ");
    if (parts.length !== 2)
      return FactoryJsonResponse.create(
        res,
        401,
        this.poorlyFormattedToken.message,
        {}
      );

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      return FactoryJsonResponse.create(
        res,
        401,
        this.poorlyFormattedToken.message,
        {}
      );

    try {
      const decoded = this.authRepository.verifyValidToken(token);
      Object.assign(res, { userId: decoded?.userId });
      return next();
    } catch (err) {
      return FactoryJsonResponse.create(
        res,
        401,
        this.unauthorizedToken.message,
        {}
      );
    }
  }
}
