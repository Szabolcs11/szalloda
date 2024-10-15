import { Request, Router } from "express";
import { editReservation, getGuestById, getRoomById } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { reservationId, guestId, roomId, startDate, endDate, price } = req.body;
  if (!reservationId || !guestId || !roomId || !startDate || !endDate || !price)
    return res.status(200).send({ success: false, message: "Fill the fields!" });

  const guest = await getGuestById(guestId);
  if (!guest) return res.status(200).send({ success: false, message: "No guest found with that id!" });

  const room = await getRoomById(roomId);
  if (!room) return res.status(200).send({ success: false, message: "No room found with that id!" });

  const reservation = await editReservation(reservationId, guestId, roomId, startDate, endDate, price);
  if (!reservation) return res.status(200).send({ success: false, message: "Unexpected error!" });
  if (reservation == "Already_Reserved")
    return res.status(200).send({ success: false, message: "Room is already reserved for that date!" });

  return res.status(200).send({ success: true, reservation, message: "Successfully edited reservation!" });
});

export default router;
