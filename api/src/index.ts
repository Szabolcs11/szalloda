import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth/index";
import dashboardRouter from "./routes/dashboard/index";
import guestRouter from "./routes/guest/index";
import errorHandler from "./middleware/errorHandler";
import corsOptions from "./config/corsOptions";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());

const port = process.env.PORT || 80;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/guest", guestRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
