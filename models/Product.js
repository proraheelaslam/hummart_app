const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');
const ProductDiscount = require('./ProductDiscount');
const ProductImage = require('./ProductImage');
const SubCategory = require('./SubCategory');


class Product extends Sequelize.Model {}

Product.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    unit_price: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    unit: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    is_product_available: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    sub_category_id: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },

}, {
    sequelize, modelName: 'Product',  timestamps: false,
    tableName:'products' });

Product.ProductDiscount = Product.hasOne(ProductDiscount, { foreignKey: 'product_id' });
Product.ProductImage = Product.hasMany(ProductImage,{ foreignKey: 'product_id' });

//Product.SubCategory = Product.belongsTo(SubCategory, { foreignKey: 'sub_category_id' });


module.exports = Product;