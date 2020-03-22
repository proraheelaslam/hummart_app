const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');
const SubCategory = require('./SubCategory');


class BundleCategory extends Sequelize.Model {}

BundleCategory.init({
    bundle_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sub_category_id: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
}, {
    sequelize, modelName: 'BundleCategory',  timestamps: false,
    tableName:'bundle_categories' });


//BundleCategory.SubCategory = BundleCategory.belongsTo(SubCategory, { foreignKey: 'sub_category_id' });

BundleCategory.SubCategory = BundleCategory.belongsTo(SubCategory, { foreignKey: 'sub_category_id' });


 module.exports = BundleCategory;