import mongoose from "mongoose";

const holiModel = mongoose.Schema({
  h_dateName: String,
  h_isHoliday: String,
  h_locdate: Number,
  h_seq: Number,
});

export default mongoose.model("tbl_holiday", holiModel);
