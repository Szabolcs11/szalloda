import { Request, Router } from "express";
import { addRoomType } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { name, numOfBeds, description, dailyPrice } = req.body;
  if (!name || !numOfBeds || !description || !dailyPrice)
    return res.status(200).send({ success: false, message: "Fill the fields!" });
  const roomType = await addRoomType(name, numOfBeds, description, dailyPrice);
  if (!roomType) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, roomType });
});

export default router;
