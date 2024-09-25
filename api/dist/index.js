"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/auth/index"));
dotenv_1.default.config();
const port = process.env.PORT || 80;
const corsOptions = {
    origin: [process.env.APPURL],
    credentials: true,
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/auth", index_1.default);
app.use((err, req, res, next) => {
    console.log("err", err);
    res.status(500).send("Something went wrong");
});
app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});
