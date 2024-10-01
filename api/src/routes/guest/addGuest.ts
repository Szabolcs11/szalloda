import { Router, Request } from "express";
import { createGuest, createSession, loginUser } from "../../modules/helper/queryHelper";
const router = Router({ mergeParams: true });

router.post("/", async (req: Request, res: any) => {
  const { FullName, Email, Phone, BirthDate } = req.body;
  if (!FullName || !Email || !Phone || !BirthDate)
    return res.status(200).send({ success: false, message: "Fill the fields!" });
  const guestId = await createGuest(FullName, Email, BirthDate, Phone);
  return res.status(200).send({ success: true, guestId });
});

export default router;
