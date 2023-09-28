import { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  public async save(data: any): Promise<User | null> {
    const userCreated = await this.prisma.user.create({ data });

    return userCreated;
  }
}
