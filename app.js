import express, { json } from "express";
import { itzamnaRoutes } from "./routes/routes.js";
import { corsMiddlewares } from "./middlewares/cors.js";
import dotenv from "dotenv";

const PORT = process.env.PORT ?? 1234;
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config()
app.use(corsMiddlewares());

app.use("/inventarioItzamna", itzamnaRoutes);

app.listen(PORT, () => {
  console.log(`server on port: http://localhost:${PORT}`);
});
