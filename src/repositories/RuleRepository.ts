import { PrismaClient, Rule } from "@prisma/client";

export class RuleRepository {
  constructor(private prisma: PrismaClient) {}

  public async getRuleByName(name: string): Promise<Rule | null> {
    const rule = await this.prisma.rule.findFirst({ where: { name } });

    return rule;
  }
}
