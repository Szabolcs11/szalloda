import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth/index";
import errorHandler from "./middleware/errorHandler";
import corsOptions from "./config/corsOptions";

dotenv.config();
const app = express();

const port = process.env.PORT || 80;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
