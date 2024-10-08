import { Request, Router } from "express";
import { addReservation, getGuestById, getRoomById } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { guestId, roomId, startDate, endDate, price } = req.body;
  if (!guestId || !roomId || !startDate || !endDate || !price)
    return res.status(200).send({ success: false, message: "Fill the fields!" });

  const guest = await getGuestById(guestId);
  if (!guest) return res.status(200).send({ success: false, message: "No guest found with that id!" });

  const room = await getRoomById(roomId);
  if (!room) return res.status(200).send({ success: false, message: "No room found with that id!" });

  //TODO:Check if room available

  const reservation = await addReservation(guestId, roomId, startDate, endDate, price);
  if (!reservation) return res.status(200).send({ success: false, message: "Unexpected error!" });

  return res.status(200).send({ success: true, reservation, message: "Successfully added reservation!" });
});

export default router;
