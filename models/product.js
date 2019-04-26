'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    SKU: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Name: DataTypes.STRING
  }, {
      timestamps: false
});
  Product.associate = function(models) {
  };
  return Product;
};
