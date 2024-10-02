import { Request, Router } from "express";
import { addReservation, addRoomType } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { guestId, roomId, startDate, endDate, price } = req.body;
  if (!guestId || !roomId || !startDate || !endDate || !price)
    return res.status(200).send({ success: false, message: "Fill the fields!" });
  //Check if guest exist, if room exist, if room available
  const reservation = await addReservation(guestId, roomId, startDate, endDate, price);
  if (!reservation) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, reservation });
});

export default router;
