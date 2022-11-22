import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_holiday",
    {
      h_dateName: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      h_isHoliday: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      h_locdate: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      h_seq: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_holiday",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "h_locdate" }],
        },
      ],
    }
  );
};
