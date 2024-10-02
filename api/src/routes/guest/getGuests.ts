import { Request, Router } from "express";
import { getGuests } from "../../modules/helper/queryHelper";
const router = Router();

router.get("/", async (req: Request, res: any) => {
  const guests = await getGuests();
  if (!guests) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, guests });
});

export default router;
