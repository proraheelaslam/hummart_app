const Joi = require('@hapi/joi');
const DeliveryAddress = require('../models/DeliveryAddress');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer  = require('multer');

const getAdresses = async (req,res)=> {

    let customerDAddress;
    try {
        let dAddress = await DeliveryAddress.findOne({
            where: {
                customer_id: req.params.id
            }
        });
        if(dAddress) {
             customerDAddress = successResponse('Delivery address has been fetch',dAddress);
        }else {
             customerDAddress = notFoundResponse('Delivery address not found',dAddress);
        }
        return res.send(customerDAddress);
    }catch (e) {
        return res.send(e.message);
    }
};

const createAddress = async (upload,req, res) => {

    let reqData = req.body;
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        address: Joi.string().required(),
        address_type: Joi.string().required(),
        city: Joi.string().required(),
        customer_id: Joi.string().required(),
        house_flate_number: Joi.string().required(),
        area_colony: Joi.string().required(),

    });


    const { error }  = schema.validate(reqData);
    if(error) {
        res.send(validationResponse(error.message));
    }else {

        let image = '';
        if (req.file !== undefined){
            image = req.file.filename ;
        }
        // create new D Address
        let dAddressRes = await DeliveryAddress.create({
            name: reqData.name,
            email : reqData.email,
            address_type:reqData.address_type,
            address:reqData.address,
            latitude: reqData.latitude,
            longitude: reqData.longitude,
            city: reqData.city,
            customer_id: reqData.customer_id,
            area_colony: reqData.area_colony,
            house_flate_number: reqData.house_flate_number,
            image: image,
        });
        if(dAddressRes) {
            let result = successResponse('Address has been created successfully ',dAddressRes);
            res.send(result);
        }else {
            res.send(errorResponse());
        }
    }

}

const updateAddress = async (upload,req,res)=> {

    let result;
    let reqData = req.body;

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        address: Joi.string().required(),
        address_type: Joi.string().required(),
        city: Joi.string().required(),
        delivery_address_id: Joi.string().required(),
        house_flate_number: Joi.string().required(),
        area_colony: Joi.string().required(),
    });
    const { error } = schema.validate(reqData);
    if(error) {
        res.send(validationResponse(error.message));
    }else {

        let dAddressObj = {
            name: reqData.name,
            email : reqData.email,
            address_type:reqData.address_type,
            address:reqData.address,
            latitude: reqData.latitude,
            longitude: reqData.longitude,
            city: reqData.city,
            area_colony: reqData.area_colony,
            house_flate_number: reqData.house_flate_number,
        };
        if (req.file !== undefined){
            let image = req.file.filename;
            dAddressObj.image = image;
        }
        // update address
      let dAddress = await DeliveryAddress.update(dAddressObj, { where:{ id: reqData.delivery_address_id } , returning:true  });
        //res.send(Object.keys(dAddress[1]).length);
      if(Object.keys(dAddress[1]).length > 0) {
          result = successResponse('Delivery address has been updated successfully', dAddress[1][0].get());
      }else {
          result = notFoundResponse('Delivery address is not update');
      }
      res.send(result);
    }


};


const uploadImage = ()=> {

   const dAddressStorage = multer.diskStorage({
       destination: function (req, file, cb) {

           cb(null, 'public/upload/delivery_address');

       },
       filename: function (req, file, cb) {
           cb(null, Date.now() +file.originalname);
       }
   });
   return dAddressStorage;
};

let dAddress = {};
dAddress.getAdresses = getAdresses;
dAddress.createAddress = createAddress;
dAddress.updateAddress = updateAddress;
dAddress.uploadImage = uploadImage;

module.exports  = dAddress;