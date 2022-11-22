import express from "express";
import DB from "../models/index.js";
const Holiday = DB.models.tbl_holiday;

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const holidays = await Holiday.findAll();
  const holiArr = [];
  const areaInfo = [
    { id: "seoul", name: "서울", eng: "seoul" },
    { id: "gwangju", name: "광주", eng: "gwangju" },
  ];

  const genres = [
    { g_id: "jazz", g_name: "째즈" },
    { g_id: "trot", g_name: "트롯" },
    { g_id: "classic", g_name: "클래식" },
  ];

  // for (let i of holidays) {
  //   holiArr.push(i.dataValues);
  // }
  // console.log(holidays);
  // res.json(holidays);
  //
  res.render("calendar", { holidays, areaInfo, genres });
});

export default router;
