import type { PrismaClient } from "@prisma/client";
import type IUser from "~/core/user/model/IUser";
import type IUserRepository from "~/core/user/repository/IUserRepository";

export default class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: IUser): Promise<IUser> {
    const userCreated = await this.prisma.user.create({ data: user });
    return userCreated;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }
}
