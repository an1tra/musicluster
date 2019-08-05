//
// Creating our User model
//Set it as export because we will need it required on the server
module.exports = function(sequelize, DataTypes) {
    var Album = sequelize.define("Album", {
      // The email cannot be null, and must be a proper email before creation
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    // Album.associate = function(models) {
    //     Album.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
  return Album;
};