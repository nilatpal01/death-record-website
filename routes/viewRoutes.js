const express=require('express');
const viewController=require('../controllers/viewController');

const router=express.Router();

router.get('/',viewController.getOverview);

router.get('/form4',viewController.getForm4);
router.get('/form4/:id',viewController.getOneForm4);

router.get('/form4a',viewController.getForm4a);

module.exports=router;