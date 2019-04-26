'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    Id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Transaction_Revenue: DataTypes.STRING,
    Qty: DataTypes.STRING,
    SKU: {
        type: DataTypes.STRING,
        references: 'products',
        referencesKey: 'SKU'
    }
  }, {
      timestamps: false
});
  Transaction.associate = function(models) {
    //Transaction.hasMany(models.Product)
  };
  
  
  return Transaction;
};
