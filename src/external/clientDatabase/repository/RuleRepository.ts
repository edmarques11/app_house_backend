import { PrismaClient } from "@prisma/client";
import IRule from "~/core/rule/model/IRule";
import IRuleRepository from "~/core/rule/repository/IRuleRepository";

export default class RuleRepository implements IRuleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByName(name: string): Promise<IRule | null> {
    const rule = await this.prisma.rule.findFirst({ where: { name } });

    return rule ?? null;
  }
}
