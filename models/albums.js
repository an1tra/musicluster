
module.exports = function(sequelize, DataTypes) {
    var Album = sequelize.define("Album", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  return Album;
};