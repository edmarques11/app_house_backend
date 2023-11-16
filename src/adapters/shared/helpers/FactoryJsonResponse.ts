import type { Response } from "express";

export default class FactoryJsonResponse {
  public send(
    response: Response,
    statusCode: number,
    message: string,
    data: object
  ): Response {
    return response
      .status(statusCode)
      .json({ code: statusCode, message, data });
  }
}
