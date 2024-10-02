import { Router } from "express";
import addReservation from "./addReservation";
import deleteReservation from "./deleteReservation";
import getReservation from "./getReservation";

const router = Router();

router.use("/add", addReservation);
router.use("/delete", deleteReservation);
router.use("/:id", getReservation);

export default router;
