const Joi = require('@hapi/joi');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');
const ProductDiscount = require('../models/ProductDiscount');
const Bundle = require('../models/Bundle');
const BundleCategory = require('../models/BundleCategory');

const { successResponse, errorResponse, validationResponse } = require('../utils/apiResponse');




const bundleCategoryProducts = async (req, res)=> {

   try {

       let bundles = await Bundle.findAll({});
       let products = await Product.findAll({ include:[  { model: ProductImage } , { model: ProductDiscount } ],  limit: 4 });
       let categories = await Category.findAll( { include: [ SubCategory ] });

       let productObj = {};
       productObj.bundles = bundles;
       productObj.product_features = products;
       productObj.categories = categories;

       let dataRes = successResponse('Data has been listed',productObj);
       return res.send(dataRes);
   }catch (e) {
       console.log(e.message);
       return res.send(errorResponse());
   }
};

const getBundleCategoryProducts = async (req, res)=> {

    try {
        let bundleId = req.params.id;
        let bundles = await Bundle.findOne({
            include:
                [
                    {
                        model: BundleCategory,
                        include: [
                            {
                                model: SubCategory,
                                include: Product

                            }

                        ]

                    }
                ]

            , where: { id: bundleId }});

        let dataRes = successResponse('Data has been listed',bundles);
        return res.send(dataRes);
    }catch (e) {
        console.log(e.message);
        return res.send(errorResponse());
    }
};




let product = {};

product.bundleCategoryProducts = bundleCategoryProducts;
product.getBundleCategoryProducts = getBundleCategoryProducts;
module.exports  = product;