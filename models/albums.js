
module.exports = function(sequelize, DataTypes) {
    var Album = sequelize.define("Album", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      cover: {
        type: DataTypes.STRING,
        allowNull: false
      },

      link: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  return Album;
};