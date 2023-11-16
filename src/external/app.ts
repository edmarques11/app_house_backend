import express from "express";
import { router } from "~/external/routes/index";

const app = express();

app.use(express.json());
app.use(router);

export { app }
