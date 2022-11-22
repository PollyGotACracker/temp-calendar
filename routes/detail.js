import express from "express";

const router = express.Router();
router.get("/:id", (req, res) => {
  const id = 111;
  // const id = req.params.id
  res.render("detail");
});

export default router;
