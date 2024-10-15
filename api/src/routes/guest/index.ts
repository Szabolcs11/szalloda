import { Router } from "express";
import loginUser from "./addGuest";
import deleteGuest from "./deleteGuest";
import getGuests from "./getGuests";
import getGuest from "./getGuest";

const router = Router();

router.use("/add", loginUser);
router.use("/delete", deleteGuest);
router.use("/", getGuests);
router.use("/:id", getGuest);

export default router;
