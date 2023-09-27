import { Request, Response } from "express";

export abstract class IController {
  constructor() {}

  public abstract handler(
    request: Request,
    response: Response
  ): Promise<Response>;
}
