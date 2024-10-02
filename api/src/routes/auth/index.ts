import { Router } from "express";
import loginUser from "./loginUser";
import authenticate from "./authenticate";

const router = Router();

router.use("/login", loginUser);
router.use("/authenticate", authenticate);

export default router;
