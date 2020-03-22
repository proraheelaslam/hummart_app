const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class ProductDiscount extends Sequelize.Model {}

ProductDiscount.init({
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    discount: {
        type: Sequelize.STRING
    },
}, {
    sequelize, modelName: 'ProductDiscount',  timestamps: false,
    tableName:'product_discount' });



module.exports = ProductDiscount;