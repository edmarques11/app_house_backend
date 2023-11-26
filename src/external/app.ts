import express from "express";
import { router } from "~/external/routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.ACEPTED_CORS_ORIGINS,
    methods: process.env.ACEPTED_CORS_METHODS,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(router);

export { app };
