const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');
const BundleCategory = require('./BundleCategory');
const SubCategory = require('./SubCategory');


class Bundle extends Sequelize.Model {}

Bundle.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
    },
    fullImagePath: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.image != '') {
                return `${constants.APP_URL}/upload/bunldes/${this.image}`;
            }
        }
    }

}, {
    sequelize, modelName: 'Bundle',  timestamps: false,
    tableName:'bundles' });

Bundle.BundleCategory = Bundle.hasMany(BundleCategory, { foreignKey: 'bundle_id' });


 module.exports = Bundle;