import { Request, Router } from "express";
import { deleteRoomType, getRoomType } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { roomTypeId } = req.body;
  if (!roomTypeId) return res.status(200).send({ success: false, message: "Fill the fields!" });
  const roomType = await getRoomType(roomTypeId);
  if (!roomType) return res.status(200).send({ success: false, message: "No roomtype found with this id!" });
  const deleted = await deleteRoomType(roomTypeId);
  if (!deleted) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, message: "Sucessfully deleted roomtype" });
});

export default router;
