import { Router } from "express";
import { router as userRouter } from "./user.route";

const router = Router();
router.use(userRouter);

export { router };
