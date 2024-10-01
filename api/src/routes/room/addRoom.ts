import { Request, Router } from "express";
import { createRoom } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { roomNumber, roomType } = req.body;
  if (!roomNumber || !roomType) return res.status(200).send({ success: false, message: "Fill the fields!" });
  const room = await createRoom(roomNumber, roomType);
  if (!room) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, room });
});

export default router;
