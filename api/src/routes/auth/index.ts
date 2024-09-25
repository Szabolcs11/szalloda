import { Router } from "express";
import loginUser from "./loginUser";

const router = Router();

router.use("/login", loginUser);

export default router;
