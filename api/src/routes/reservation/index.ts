import { Router } from "express";
import addReservation from "./addReservation";
import deleteReservation from "./deleteReservation";
import getReservation from "./getReservation";
import getReservations from "./getReservations";
import editReservation from "./editReservation";

const router = Router();

router.use("/add", addReservation);
router.use("/delete", deleteReservation);
router.use("/:id", getReservation);
router.use("/", getReservations);
router.use("/edit", editReservation);

export default router;
