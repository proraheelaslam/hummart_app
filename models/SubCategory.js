const { sequelize, Sequelize, DataTypes } = require('./index');
const Product = require('./Product');

class SubCategory extends Sequelize.Model {}

SubCategory.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    image: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    category_id: {
        type: Sequelize.INTEGER
    }
}, { 
    sequelize,
    modelName: 'SubCategory', 
    timestamps: false,
    tableName:'sub_categories'
 });

SubCategory.Product = SubCategory.hasMany( Product,{ foreignKey:'sub_category_id' });


module.exports = SubCategory;