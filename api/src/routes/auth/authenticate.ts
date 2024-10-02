import { Request, Router } from "express";
import { getUserById, getUserBySessionToken } from "../../modules/helper/queryHelper";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { sessiontoken } = req.cookies;
  if (!sessiontoken) return res.status(200).send({ success: false, message: "You are not logged in!" });
  const userId = await getUserBySessionToken(sessiontoken);
  if (!userId) res.clearCookie("sessiontoken").status(200).send({ success: false, message: "You are logged out!" });
  const user = await getUserById(userId);
  if (!user) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res.status(200).send({ success: true, user });
});

export default router;
