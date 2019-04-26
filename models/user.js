'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    UserId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Id: {
        type: DataTypes.STRING,
        references: 'transactions',
        referencesKey: 'id'
    }
  }, {
      timestamps: false
});
  User.associate = function(models) {
      //User.hasMany(models.Transaction);
  };
  
  return User;
};
