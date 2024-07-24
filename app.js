import express from "express";
import morgan from "morgan";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import swaggerDoc from "./swagger.json" assert { type: "json" };
import {
  authRoute,
  boardRoute,
  cardRoute,
  columnRoute,
  userRoute,
} from "./routes/index.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", serve, setup(swaggerDoc));
app.use("/api/auth", authRoute);
app.use("/api/boards", boardRoute);
app.use("/api/columns", columnRoute);
app.use("/api/cards", cardRoute);
app.use("/api/users", userRoute);

app.use((_, res, next) => {
  res.status(404).json({ message: "Route not found!" });

  next();
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });

  next();
});

export default app;
