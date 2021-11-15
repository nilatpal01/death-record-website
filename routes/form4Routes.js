const express=require("express");
const form4Controller=require('../controllers/form4Controller');
const authController=require('../controllers/authController');
const router=express.Router();

//router.param('id',formController.checkID)

router
    .route('/verified-form4')
    .get(authController.protect,authController.restrictTo('approver'),form4Controller.verifiedFrom4s, form4Controller.getAllForm);

router
    .route('/form4-stats')
    .get(form4Controller.getForm4Astats);

router
    .route('/monthly-death/:year')
    .get(form4Controller.getMonthlyDeath);

router
    .route('/')
    .get(authController.protect,authController.restrictTo('admin','approver'),form4Controller.getAllForm)
    .post(form4Controller.createForm);

router
    .route('/:id')
    .get(authController.protect,authController.restrictTo('admin', 'approver'),form4Controller.getForm)
    .patch(authController.protect,authController.restrictTo('admin','approver'),form4Controller.updateForm)
    .delete(authController.protect,authController.restrictTo('admin','approver'),form4Controller.deleteForm);

module.exports=router;