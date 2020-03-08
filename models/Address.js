const { sequelize , Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');

class Address extends Sequelize.Model {}

Address.init({
    name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    address_type:{
        type:Sequelize.STRING
    },
    latitude:{
        type:Sequelize.STRING
    },
    address:{
        type:Sequelize.STRING
    },
    customer_id:{
        type:Sequelize.INTEGER
    },
    longitude:{
        type:Sequelize.STRING
    },
    city:{
        type:Sequelize.STRING
    },
    image:{
            type:Sequelize.STRING
     },
     area_colony:{
                 type:Sequelize.STRING
          },
     house_flate_number:{
                      type:Sequelize.STRING
               },
    fullImagePath: {

             type: DataTypes.VIRTUAL,
             get() {
                 if (this.image != '') {
                     return `${constants.APP_URL}/upload/delivery_address/${this.image}`;
                 }
             }
         }
}, {
    sequelize,
    modelName: 'Address',
    timestamps: false,
    tableName: 'addresses'
});

module.exports = Address;