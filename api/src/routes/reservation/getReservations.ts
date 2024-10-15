import { Request, Router } from "express";
import { getReservations } from "../../modules/helper/queryHelper";
const router = Router({ mergeParams: true });

router.get("/", async (req: Request, res: any) => {
  const reservations = await getReservations();
  if (!reservations) return res.status(200).send({ success: false, message: "No reservation found!" });

  return res.status(200).send({ success: true, reservations });
});

export default router;
