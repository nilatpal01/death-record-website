const express=require('express');
const viewController=require('../controllers/viewController');
const authController=require('../controllers/authController');

const router=express.Router();

router.get('/',authController.isLoggedIn,viewController.getOverview);
router.get('/form4',authController.protect,viewController.getForm4);
router.get('/form4/:id',authController.isLoggedIn,viewController.getOneForm4);
router.get('/form4a',authController.isLoggedIn,viewController.getForm4a);
router.get('/login',authController.isLoggedIn,viewController.getLoginForm);
router.get('/me', authController.protect,viewController.getAccount);

router.post('/submit-user-data', authController.protect,viewController.updateUserData);
module.exports=router;