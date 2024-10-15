import { Request, Router } from "express";
import { getGuestById, getGuests } from "../../modules/helper/queryHelper";
const router = Router({ mergeParams: true });

router.get("/", async (req: Request, res: any) => {
  if (!req.params.id) return res.status(200).send({ success: false, message: "Room not found" });
  const guest = await getGuestById(Number(req.params.id));
  if (!guest) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, guest });
});

export default router;
