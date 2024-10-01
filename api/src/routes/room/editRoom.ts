import { Request, Router } from "express";
const router = Router();

router.post("/", async (req: Request, res: any) => {
  const { params } = req.body;
  //Edit room
  return res.status(200).send({ success: true });
});

export default router;
