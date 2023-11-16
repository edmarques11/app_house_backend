import { app } from "~/external/app";

const PORT = process.env.PORT ?? 3333;

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
