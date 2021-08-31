const express=require('express');
const viewController=require('../controllers/viewController');
const authController=require('../controllers/authController');

const router=express.Router();

router.get('/',viewController.getOverview);

//router.use(authController.isLoggedIn);

router.get('/form4',viewController.getForm4);
router.get('/form4/:id',viewController.getOneForm4);

router.get('/form4a',viewController.getForm4a);


router.get('/login',viewController.getLoginForm);

module.exports=router;