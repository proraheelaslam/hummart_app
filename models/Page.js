const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class Page extends Sequelize.Model {}
Page.init({
    key: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    content: {
        type: Sequelize.STRING,
    },

}, {
    sequelize, modelName: 'Page',  timestamps: false,
    tableName:'pages' });

 module.exports = Page;