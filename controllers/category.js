const Joi = require('@hapi/joi');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const { successResponse, errorResponse, validationResponse } = require('../utils/apiResponse');




const getCategory = async ()=> {

   try {
       let categories = await Category.findAll({
       });
       let categoryResult = successResponse('Categories has been listed',categories);
       return categoryResult;
   }catch (e) {
       return errorResponse();
   }
};

const addCategory = async (upload,req,res)=> {

    let reqData = req.body;
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        //image: Joi.string().required(),
    });
    const { error } = schema.validate(reqData);
    if(error) {
        res.send(validationResponse(error.message));
    }else {
        // save category
        let categoryImage = '';
        if (req.file !== undefined){
            categoryImage = req.file.filename ;
        }
        const categoryResult = await Category.create({ name: reqData.name, description: reqData.description, image:categoryImage});
        if(categoryResult) {
            let result = successResponse('Categories has been created successfully ',{});
            res.send(result);
        }else {
            res.send(errorResponse());
        }
    }


};



let category = {};

category.getCategory = getCategory;
category.addCategory = addCategory;

module.exports  = category;