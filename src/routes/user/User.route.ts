import { Router } from "express";
import { IController } from "~/controllers/Interfaces/IController";

class UserRouter {
  constructor(private router: Router, private createUser: IController) {
    this.handerPost();
  }

  private handerPost(): void {
    this.router.post("/user", this.createUser.handler);
  }
}

export { UserRouter };
