import { Request, Router } from "express";
import { deleteReservation, getReservationById } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { reservationId } = req.body;
  if (!reservationId) return res.status(200).send({ success: false, message: "Fill the fields!" });

  const reservation = await getReservationById(reservationId);
  if (!reservation) return res.status(200).send({ success: false, message: "No reservation found with that id!" });

  const deleted = await deleteReservation(reservationId);
  if (!deleted) return res.status(200).send({ success: false, message: "Unexpected error!" });

  return res.status(200).send({ success: true, message: "Successfully deleted reservation!" });
});

export default router;
