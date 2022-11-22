import express from "express";
import DB from "../models/index.js";
const Holiday = DB.models.tbl_holiday;

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const holidays = await Holiday.findAll();
  const holiArr = [];
  // for (let i of holidays) {
  //   holiArr.push(i.dataValues);
  // }
  // console.log(holidays);
  // res.json(holidays);
  //
  res.render("calendar", { holidays: Promise.all(holidays) });
});

export default router;
