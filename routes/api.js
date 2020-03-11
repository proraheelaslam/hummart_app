const express = require('express');
const router = express.Router();
const multer  = require('multer');
const auth = require('../middleware/auth');

const category = require('../controllers/category');
const customer = require('../controllers/customer');
const deliverAddress = require('../controllers/deliveryAddress');
const address = require('../controllers/address');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, 'public/upload/categories');

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +file.originalname);
    }
});
const upload = multer({ storage:storage });
const uploadCustomerPhoto = multer({ storage:customer.uploadPhoto() });

const uploadDeliveryAddressImage = multer({ storage:deliverAddress.uploadImage() });

/* API Routes */

router.post('/customer/register', upload.none(), async (req, res, next)=> {
    let profileData = await customer.register(req, res);
    res.send(profileData);
});

router.post('/customer/verifyCode', upload.none(), async (req, res, next)=> {
    let profileData = await customer.verifyCode(req, res);
    res.send(profileData);
});

router.get('/customer/profile/:id', auth, async (req, res, next)=> {
    let profileData = await customer.getProfile(req, res);
    res.send(profileData);
});
router.post('/customer/profile/update', auth, uploadCustomerPhoto.single('photo'), async (req, res, next)=> {

    customer.updateProfile(upload,req,res);
});

router.get('/categories',auth, async (req, res, next) => {
    let categories = await category.getCategory();
    res.send(categories);

});
router.post('/categories/add', upload.single('image'), async function(req, res, next) {
    //return Model.db;
    category.addCategory(upload,req,res);

});

// delivery Address

router.post('/customer/deliveryAddress/create', auth, uploadDeliveryAddressImage.single('image'), async (req, res) => {
    deliverAddress.createAddress(upload,req, res);
});

router.post('/customer/deliveryAddress/update', auth, uploadDeliveryAddressImage.single('image'), async (req,res) => {
    deliverAddress.updateAddress(upload,req,res);
});

router.get('/customer/deliveryAddress/:id', auth, (req,res)=> {
   deliverAddress.getAdresses(req,res);
});

// addresses
router.post('/customer/addresses/create', auth, uploadDeliveryAddressImage.single('image'), async (req, res) => {
    address.createAddress(upload,req, res);
});

router.post('/customer/addresses/update', auth, uploadDeliveryAddressImage.single('image'), async (req,res) => {
    address.updateAddress(upload,req,res);
});

router.get('/customer/addresses/:id', auth, (req,res)=> {
    address.getAdresses(req,res);
});


module.exports = router;
