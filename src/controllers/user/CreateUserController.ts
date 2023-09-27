import { Request, Response } from "express";
import { prismaClient as prisma } from "~/database/prismaClient";
import { IController } from "~/controllers/Interfaces/IController";

export class CreateUserController extends IController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { name, email, password, rule_id } = request.body;

    const user = await prisma.user.create({
      data: { name, email, password, rule_id },
    });

    return response.status(201).json(user);
  }
}
