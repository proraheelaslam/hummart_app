const express = require('express');
const router = express.Router();
const multer  = require('multer');
const auth = require('../middleware/auth');

const category = require('../controllers/category');
const customer = require('../controllers/customer');


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

/* API Routes */
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

module.exports = router;
