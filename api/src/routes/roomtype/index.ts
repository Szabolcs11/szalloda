import { Router } from "express";
import addRoomType from "./addRoomType";
import deleteRoomType from "./deleteRoomType";
import getRoomTypes from "./getRoomTypes";

const router = Router();

router.use("/add", addRoomType);
router.use("/delete", deleteRoomType);
router.use("/", getRoomTypes);

export default router;
