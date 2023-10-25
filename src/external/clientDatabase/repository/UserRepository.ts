import { PrismaClient } from "@prisma/client";
import IUser from "~/core/user/model/IUser";
import IUserRepository from "~/core/user/repository/IUserRepository";

export default class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: IUser): Promise<IUser> {
    return this.prisma.user.create({ data: user });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }
}
