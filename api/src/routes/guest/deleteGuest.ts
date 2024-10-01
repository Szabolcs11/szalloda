import { Router, Request } from "express";
import { deleteGuest, getGuestById } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { guestId } = req.body;
  if (!guestId) return res.status(200).send({ success: false, message: "Fill the fields!" });
  const guest = await getGuestById(guestId);
  if (!guest) return res.status(200).send({ success: false, message: "No guest found with id!" });
  const deleted = await deleteGuest(guestId);
  return res.status(200).send({ success: true, message: "Sucessfully deleted guest" });
});

export default router;
