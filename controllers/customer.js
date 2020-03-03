const Joi = require('@hapi/joi');
const Customer = require('../models/Customer');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer  = require('multer');


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
    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        address: Joi.string().required(),
        phone_number: Joi.string().required(),
        city: Joi.string().required(),
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
        };
        let photo = '';
        if (req.file !== undefined){
            photo = req.file.filename ;
            profileObj.photo = photo;
        }
        try {
            const profileResult = await Customer.update(
                profileObj,
                { where: { id: 1 }, returning: true }
            );
            if(profileResult) {
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
customer.getProfile = getProfile;
customer.updateProfile = updateProfile;
customer.uploadPhoto = uploadPhoto;

module.exports  = customer;