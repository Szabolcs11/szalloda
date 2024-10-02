import { Router } from "express";
import addReservation from "./addReservation";

const router = Router();

router.use("/add", addReservation);
// router.use("/delete", deleteReservation);
// router.use("/:id", getReservation);

export default router;
