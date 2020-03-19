const Joi = require('@hapi/joi');
const Category = require('../models/Page');

const { successResponse, errorResponse, validationResponse } = require('../utils/apiResponse');




const getPage = async (req,res)=> {

   try {
       let pages = await Category.findOne({
           where: {
               id: req.params.key
           }
       });
       let pageRes = successResponse('Page has been listed',pages);
       return pageRes;
   }catch (e) {
       return errorResponse();
   }
};

let page = {};

page.getPage = getPage;
module.exports  = page;