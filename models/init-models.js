import _tbl_holiday from "./holiday_model.js";
const initModels = (sequelize) => {
  const tbl_holiday = _tbl_holiday(sequelize);

  return {
    tbl_holiday,
  };
};

export default initModels;
