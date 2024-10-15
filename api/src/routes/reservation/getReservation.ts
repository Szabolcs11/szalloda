import { Request, Router } from "express";
import { getReservationById } from "../../modules/helper/queryHelper";
const router = Router({ mergeParams: true });

router.get("/", async (req: Request, res: any) => {
  const { id } = req.params;
  if (!id) return res.status(200).send({ success: false, message: "Fill the fields!" });

  const reservation = await getReservationById(Number(id));
  if (!reservation) return res.status(200).send({ success: false, message: "No reservation found with that id!" });

  return res.status(200).send({ success: true, reservation });
});

export default router;
