const express=require("express");

const userController=require('./../controllers/userController');
const authController=require('./../controllers/authController');

const router=express.Router();

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forgot-password',authController.forgotPassword);
router.patch('/reset-password/:token',authController.resetPassword);

router.patch('/updateMyPassword',authController.protect,authController.updatePassword);
router.patch('/updateMe',authController.protect,userController.updateMe);
router.patch('/deleteMe',authController.protect,userController.deleteMe);


router
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports=router;