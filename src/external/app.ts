import express from "express";
import { router } from "~/external/routes/index";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(router);
app.use(
  cors({
    origin: "*",
  })
);

export { app };
