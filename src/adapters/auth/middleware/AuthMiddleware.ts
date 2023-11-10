import { NextFunction, Request, Response } from "express";
import IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";

export default class AuthMiddlweare {
  constructor(private readonly authRepository: IAuthTokenRepository) {}

  middleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res
        .status(401)
        .json({ code: res.status, message: "Token não enviado" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2)
      return res
        .status(401)
        .json({ code: res.status, message: "Token mal formatado" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      res
        .status(401)
        .json({ code: res.statusCode, message: "Token mal formatado" });

    try {
      const decoded = this.authRepository.verifyValidToken(token);
      Object.assign(res, { userId: decoded?.userId });
      return next();
    } catch (err) {
      return res
        .status(401)
        .json({ code: res.statusCode, message: "Token não autorizado" });
    }
  }
}
