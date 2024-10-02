import { Request, Router } from "express";
import { getRoomTypes } from "../../modules/helper/queryHelper";
const router = Router();

router.get("/", async (req: Request, res: any) => {
  const roomtypes = await getRoomTypes();
  if (!roomtypes) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, roomtypes });
});

export default router;
