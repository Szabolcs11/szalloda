import { Router } from "express";
import loginUser from "./addGuest";
import deleteGuest from "./deleteGuest";
import getGuests from "./getGuests";

const router = Router();

router.use("/add", loginUser);
router.use("/delete", deleteGuest);
router.use("/", getGuests);

export default router;
