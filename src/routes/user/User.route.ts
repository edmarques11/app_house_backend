import { Request, Response, Router } from "express";
import { IUserControllers } from "~/controllers/Interfaces/IUserControllers";

class UserRouter {
  constructor(
    private router: Router,
    private userControllers: IUserControllers
  ) {
    this.handerPost();
  }

  private handerPost(): void {
    this.router.post(
      "/user",
      async (request: Request, response: Response): Promise<Response<any>> => {
        return await this.userControllers.createUserController.handler(
          request,
          response
        );
      }
    );
  }
}

export { UserRouter };
