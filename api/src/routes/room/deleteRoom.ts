import { Request, Router } from "express";
import { deleteRoom } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { roomId } = req.body;
  if (!roomId) return res.status(200).send({ success: false, message: "Fill the fields!" });
  const deleted = await deleteRoom(roomId);
  if (!deleted) return res.status(200).send({ success: false, message: "A szoba le van foglalva, nem törölhető!" });
  return res.status(200).send({ success: true, message: "Successfully deleted room!" });
});

export default router;
