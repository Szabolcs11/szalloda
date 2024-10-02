import { Router, Request } from "express";
import { createSession, loginUser } from "../../modules/helper/queryHelper";
const router = Router({ mergeParams: true });

router.post("/", async (req: Request, res: any) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(200).send({ success: false, message: "Fill the fields!" });
  const user = await loginUser(username, password);
  if (!user) return res.status(200).send({ success: false, message: "Invalid username or password!" });
  const token = await createSession(user.id, req);
  if (!user) return res.status(200).send({ success: false, message: "Unexpected error!" });
  return res
    .cookie("sessiontoken", token, { maxAge: 1000 * 60 * 60 * 24 * 7, secure: true })
    .status(200)
    .send({ success: true, message: "Successfully logged in!", user });
});

export default router;
