import { Request, Router } from "express";
import { getRooms } from "../../modules/helper/queryHelper";
const router = Router();

router.get("/", async (req: Request, res: any) => {
  const rooms = await getRooms();
  if (!rooms) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, rooms });
});

export default router;
