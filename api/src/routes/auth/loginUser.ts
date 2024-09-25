import { Router } from "express";
const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  return res.send("Hello from loginUser");
});

export default router;
