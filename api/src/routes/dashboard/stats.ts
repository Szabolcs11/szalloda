import { Request, Router } from "express";
import { checkSession, getStats, getUserById } from "../../modules/helper/queryHelper";
const router = Router();

router.get("/", async (req: Request, res: any) => {
  const { sessiontoken } = req.cookies;
  if (!sessiontoken) return res.status(200).send({ success: false, message: "You are not logged in!" });
  const userId = await checkSession(sessiontoken);
  if (!userId) return res.status(200).send({ success: false, message: "Invalid session token!" });
  const stats = await getStats();

  const user = await getUserById(userId);
  return res.status(200).send({ success: true, stats, user });
});

export default router;
