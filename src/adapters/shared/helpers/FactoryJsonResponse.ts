import { Response } from "express";

export default class FactoryJsonResponse {
  static create(
    response: Response,
    statusCode: number,
    message: string,
    data: object
  ) {
    return response
      .status(statusCode)
      .json({ code: statusCode, message, data });
  }
}
