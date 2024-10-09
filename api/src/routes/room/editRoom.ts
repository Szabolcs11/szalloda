import { Request, Router } from "express";
import { updateRoom } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { roomId, roomNumber, roomType } = req.body;
  if (!roomId || !roomNumber || !roomType) return res.status(200).send({ success: false, message: "Fill the fields!" });
  const updated = await updateRoom(roomId, roomNumber, roomType);
  if (!updated) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, roomId, message: "Room updated successfully!" });
});

export default router;
