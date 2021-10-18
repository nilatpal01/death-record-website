const Form4=require('../models/form4Model');
const Form4A =require('../models/form4aModel');
const User =require('../models/userModel');
const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');
const APIFeatures=require('../utils/apiFeatures');


exports.getOverview=(req,res)=>{
    res.status(200).render('overview',{
        title:'Homepage'
    })
};

exports.getForm4=catchAsync(async(req,res,next)=>{
    //1)get form data from collection
    const features=new APIFeatures(Form4.find(),req.query).filter().sort().limitFields().pagination();
    const forms=await features.query;
    //const forms=await Form4.find();
    //2)build template

    //3)Render that template using form data from 1
    res.status(200).render('form4',{
        title:'Non verified forms',
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
        title:form.nameOftheDeceased || 'error',
        form
    })
});

exports.getForm4a=catchAsync(async(req,res,next)=>{
     //1)get form data from collection
    const features=new APIFeatures(Form4A.find(),req.query).filter().sort().limitFields().pagination();
    const forms=await features.query;  //2)build template
 
     //3)Render that template using form data from 1
    res.status(200).render('form4a',{
        title:'All forms 4a',
        forms
    })
});

exports.getOneForm4a=catchAsync(async(req,res,next)=>{
  //1)get form data from collection
 const form=await Form4A.findById(req.params.id);
  //2)build template

  //3)Render that template using form data from 1
 res.status(200).render('form4aDetail',{
     title:'All forms 4a',
     form
 })
});

exports.getLoginForm = catchAsync(async (req, res) => {
    res
      .status(200)
      .set(
        'Content-Security-Policy',
        "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
      )
      .render('login', {
        title: 'Login to your account',
      });
  });

exports.getSignupForm = catchAsync(async (req, res) => {
    res
      .status(200)
      .set(
        'Content-Security-Policy',
        "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
      )
      .render('signup', {
        title: 'Signup for a new account',
      });
  });
     

  exports.getUserOverview=catchAsync(async(req,res)=>{
      res
      .status(200)
      .set(
        'Content-Security-Policy',
        "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
      )
      .render('userOverview', {
        title: 'welcome',
      });
  });

  exports.getAdminOverview=catchAsync(async(req,res)=>{
    res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
    )
    .render('adminOverview', {
      title: 'welcome',
    });
});

  exports.getAccount=(req,res)=>{
    res
    .status(200)
    .render('account', {
      title: 'Your account',
    });
}

exports.updateUserData=catchAsync(async(req,res,next)=>{
    const updatedUser= await User.findByIdAndUpdate(req.user.id,{
        name:req.body.name,
        email:req.body.email
    },{
        new:true,
        runValidators:true
    });
    res.status(200).render('account', {
        title: 'Your account',
        user:updatedUser
    });
});


exports.createForm4=catchAsync(async(req,res,next)=>{
  res
  .status(200)
  .set(
    'Content-Security-Policy',
    "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
  )
  .render('fillForm4', {
    title: 'Fill Form No.4',
  });
});

exports.createForm4a=catchAsync(async(req,res,next)=>{
  res
  .status(200)
  .set(
    'Content-Security-Policy',
    "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
  )
  .render('fillForm4a', {
    title: 'Fill Form No.4a',
  });
});