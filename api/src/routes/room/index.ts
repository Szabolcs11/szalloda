import { Router } from "express";
import addRoom from "./addRoom";
import editRoom from "./editRoom";
import deleteRoom from "./deleteRoom";
import getRooms from "./getRooms";
import getRoom from "./getRoom";

const router = Router();

router.use("/add", addRoom);
router.use("/edit", editRoom);
router.use("/delete", deleteRoom);
router.use("/", getRooms);
router.use("/:id", getRoom);

export default router;
