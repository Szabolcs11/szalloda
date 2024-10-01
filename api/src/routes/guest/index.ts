import { Router } from "express";
import loginUser from "./addGuest";
import deleteGuest from "./deleteGuest";

const router = Router();

router.use("/add", loginUser);
router.use("/delete", deleteGuest);

export default router;
