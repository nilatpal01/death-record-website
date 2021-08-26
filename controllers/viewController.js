const Form4=require('../models/form4Model');
const Form4A =require('../models/form4aModel');
const catchAsync=require('../utils/catchAsync');


exports.getOverview=(req,res)=>{
    res.status(200).render('overview',{
        title:'Homepage'
    })
};

exports.getForm4=catchAsync(async(req,res,next)=>{
    //1)get form data from collection
    const forms=await Form4.find();
    //2)build template

    //3)Render that template using form data from 1
    res.status(200).render('form4',{
        title:'All forms 4',
        forms
    })
});

exports.getOneForm4=catchAsync(async(req,res,next)=>{
    //1)get a form from the collection
    console.log(req.params.id);
    const form=await Form4.findById(req.params.id);

    //2)build template

    //render that template
    res.status(200).render('form4Detail',{
        title:form.nameOftheDeceased,
        form
    })
});

exports.getForm4a=catchAsync(async(req,res,next)=>{
     //1)get form data from collection
    const forms=await Form4A.find();
     //2)build template
 
     //3)Render that template using form data from 1
    res.status(200).render('form4a',{
        title:'All forms 4a',
        forms
    })
});
