const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Customer = require('../models/Customer');
const DeliveryAddress = require('../models/DeliveryAddress');
const Address = require('../models/Address');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer  = require('multer');
const verificationCode  = 5050;

//

const register = async (req,res)=> {

    try {

        const schema = Joi.object().keys({
            phone_number: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if(error) {
            res.send(validationResponse(error.message));
        }else {

            let customResponse = {};
            let phoneNumber  = req.body.phone_number;

            let resCustomer = await Customer.findOne({
                where: {
                    phone_number: phoneNumber
                }
            });

            if(resCustomer) {
                let resOb = {
                    phone_number:resCustomer.phone_number,
                    code:5050,
                };
                customResponse = successResponse('You has been register successfully',resOb);
            }else {

                let res = await Customer.create({
                    first_name:'',
                    last_name: '',
                    email:'',
                    latitude:0.0,
                    longitude:0.0,
                    address:'',
                    phone_number:phoneNumber,
                    city:'',
                    area_colony:'',
                    house_flate_number:'',
                });
                customResponse = successResponse('You has been register successfully',{
                    phone_number:res.phone_number,
                    code:5050,
                });
            }
            return res.send(customResponse);
        }

    }catch (e) {
        return res.send(errorResponse());
    }
};

const verifyCode = async (req,res)=> {

    try {
        let phone  = req.body.phone_number;
        let code  = req.body.code;

        const schema = Joi.object().keys({
            phone_number: Joi.string().required(),
            code: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if(error) {
            res.send(validationResponse(error.message));

        }else {

            let customPhoneRes = await Customer.findOne({
                where: {
                    phone_number: phone
                }
            });
            if(customPhoneRes) {

                if(code == verificationCode){


                     let csObj =  await Customer.update({is_register_number:1 }, { where: { id: customPhoneRes.id }, returning: true });
                     csObj = JSON.parse(JSON.stringify(csObj[1][0].get()));
                     csObj.code = constants.AUTH_TOKEN;
                    res.send(successResponse('You code has been verify' , csObj));
                }else {
                    res.send(notFoundResponse('You code is incorrect'));
                }
            }else {
                res.send(notFoundResponse('You are not register, please register'));
            }
        }

    }catch (e) {
        return res.send(errorResponse());
    }
};

const getProfile = async (req,res)=> {

    try {
        let customerProfile = await Customer.findOne({
            where: {
                id: req.params.id
            }
        });
        let customerProfileRes = successResponse('Profile has been fetch',customerProfile);
        return customerProfileRes;
    }catch (e) {
        return res.send(errorResponse());
    }
};

const updateProfile = async (upload,req,res)=> {

    let reqData = req.body;
    let customerId = reqData.customer_id;
    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        address: Joi.string().required(),
        phone_number: Joi.string().required(),
        city: Joi.string().required(),
        house_flate_number: Joi.string().required(),
        area_colony: Joi.string().required(),
        customer_id: Joi.string().required(),
        //image: Joi.string().required(),

    });
    const { error } = schema.validate(reqData);
    if(error) {
        res.send(validationResponse(error.message));
    }else {

        // update profile
        let profileObj =  {
            first_name: reqData.first_name,
            last_name: reqData.last_name,
            email:reqData.email,
            latitude:reqData.latitude,
            longitude:reqData.longitude,
            address:reqData.address,
            phone_number:reqData.phone_number,
            city:reqData.city,
            area_colony:reqData.area_colony,
            house_flate_number:reqData.house_flate_number,
            is_complete_profile:1,
        };
        let photo = '';
        if (req.file !== undefined){
            photo = req.file.filename ;
            profileObj.photo = photo;
        }
        try {
            const profileResult = await Customer.update(
                profileObj,
                { where: { id: customerId }, returning: true }
            );
            if(profileResult) {

                let dAddress = await DeliveryAddress.findOne({
                    where: {
                        customer_id: customerId
                    }
                });

                if(!dAddress){

                    let dAddresObj = {
                        name: 'Address Name',
                        email : reqData.email,
                        address_type:reqData.address_type,
                        address:reqData.address,
                        latitude: reqData.latitude,
                        longitude: reqData.longitude,
                        city: reqData.city,
                        customer_id: reqData.customer_id,
                        area_colony: reqData.area_colony,
                        house_flate_number: reqData.house_flate_number,
                        image: '',
                    };
                    let dAddressRes = await DeliveryAddress.create(dAddresObj);
                    let address = await Address.create(dAddresObj);
                }
                let result = successResponse('Profile has been updated successfully ',profileResult[1][0].get());
                res.send(result);
            }else {
                res.send(errorResponse());
            }
        }catch (e) {
            res.send(notFoundResponse('Id not exist'));
        }
    }


};

const uploadPhoto = () => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/upload/profile');

        },
        filename: function (req, file, cb) {


            cb(null, Date.now() +file.originalname);
        }
    });
    return storage;
};

let customer = {};
customer.register = register;
customer.verifyCode = verifyCode;
customer.getProfile = getProfile;
customer.updateProfile = updateProfile;
customer.uploadPhoto = uploadPhoto;

module.exports  = customer;