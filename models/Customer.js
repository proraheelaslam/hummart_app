const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class Customer extends Sequelize.Model {}

Customer.init({
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    email: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    latitude: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    longitude: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    phone_number: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
    address: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
    city: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
    photo: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
    status: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    house_flate_number: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    area_colony: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    is_complete_profile: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    is_register_number: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    address_type: {
        type: Sequelize.STRING,
        defaultValue: 'home'
        // allowNull defaults to true
    },
    fullImagePath: {

        type: DataTypes.VIRTUAL,
        get() {
            if (this.photo != '') {
                return `${constants.APP_URL}/upload/profile/${this.photo}`;
            }
        }
    }

}, {
    sequelize, modelName: 'Customer',  timestamps: false,
    tableName:'customers' });


module.exports = Customer;