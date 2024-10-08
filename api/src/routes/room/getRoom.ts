import { Request, Router } from "express";
import { getRoomById } from "../../modules/helper/queryHelper";
const router = Router({ mergeParams: true });

router.get("/", async (req: Request, res: any) => {
  if (!req.params.id) return res.status(200).send({ success: false, message: "Room not found" });
  const room = await getRoomById(Number(req.params.id));
  if (!room) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, room });
});

export default router;
