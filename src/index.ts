import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import router from "./routes/Routes.js";
import { errorMiddleware } from "./middleware/errorHandler.js";

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(express.static(path.join(process.cwd(), "static")));
app.use(express.static("public"));
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(parseInt(PORT) || 3001, () =>
      console.log(`Server started on port ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
