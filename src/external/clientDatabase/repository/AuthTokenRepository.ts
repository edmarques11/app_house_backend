import { PrismaClient } from "@prisma/client";
import IAuthTokenRepository from "~/core/auth/Repository/IAuthTokenRepository";
import IAuthToken from "~/core/auth/model/IAuthToken";

export default class AuthTokenRepository implements IAuthTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async saveToken(data: IAuthToken): Promise<IAuthToken> {
    return this.prisma.authToken.create({
      data: {
        user_id: data.user_id,
        time_valid: data.time_valid,
        token: data.token,
      },
    });
  }
}
