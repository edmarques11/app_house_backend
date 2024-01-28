import express from "express";
import { router } from "~/external/routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const acceptedOrigins = process.env.ACEPTED_CORS_ORIGINS?.split(",");
const acceptedMethods = process.env.ACEPTED_CORS_METHODS?.split(",");

app.use(
  cors({
    origin: acceptedOrigins,
    methods: acceptedMethods,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

export { app };
