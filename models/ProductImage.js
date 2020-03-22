const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class ProductImage extends Sequelize.Model {}

ProductImage.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product_id: {
        type: Sequelize.INTEGER
    },
    fullImagePath: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.name != '') {
                return `${constants.APP_URL}/upload/products/${this.name}`;
            }
        }
    }

}, {
    sequelize, modelName: 'ProductImage',  timestamps: false,
    tableName:'product_images' });

 module.exports = ProductImage;