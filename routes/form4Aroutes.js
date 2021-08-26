const express=require("express");
const form4AController=require('../controllers/form4AController');
const authController=require('../controllers/authController');
const router=express.Router();


router
    .route('/verified-form4a')
    .get(authController.protect,authController.restrictTo('super-admin'),form4AController.verifiedForm4as, form4AController.getAllForm);

router
    .route('/form4a-stats')
    .get(form4AController.getForm4Astats);

    router
    .route('/monthly-death/:year')
    .get(form4AController.getMonthlyDeath);

router
    .route('/')
    .get(authController.protect,authController.restrictTo('admin'),form4AController.getAllForm)
    .post(form4AController.createForm);

router
    .route('/:id')
    .get(authController.protect,authController.restrictTo('admin'),form4AController.getForm)
    .patch(authController.protect,authController.restrictTo('admin'),form4AController.updateForm)
    .delete(authController.protect,authController.restrictTo('admin'),form4AController.deleteForm);

module.exports=router;