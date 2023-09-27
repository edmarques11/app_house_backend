import { Request, Response } from "express";
import { prismaClient as prisma } from "../database/prismaClient";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, rule_id } = request.body;

    const user = await prisma.user.create({
      data: { name, email, password, rule_id },
    });

    return response.status(201).json(user);
  }
}
