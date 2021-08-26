const User =require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync=require('../utils/catchAsync');

const filterObj=(obj, ...allowedFields)=>{
    const newObj={};
    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes[el]) 
        newObj[el]=obj[el];
    });
    return newObj;
};


exports.getAllUser=catchAsync(async(req,res,next)=>{
    const users=await User.find()
    res.status(200).json({
        status:'success',
        results:users.length,
        data:{
           users
        }
    });
    })

exports.createUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet completed'
    })
}

exports.getUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet completed'
    })
}

exports.updateUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet completed'
    })
}

exports.deleteUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'This route is not yet completed'
    })
};

exports.updateMe=catchAsync(async(req,res,next)=>{
    //1)create error if user POSTs password data
    if(req.body.password || req.body.passwordConfirm)
    return next(new AppError('This route is not for password updation. Please use /updateMyPassword',400));

    //2)update user document
    const filterBody=filterObj(req.body,'name', 'email');
    const updatedUser=await User.findByIdAndUpdate(req.user.id,filterBody,{
        new:true,
        runValidators:true
    });

    
    res.status(200).json({
        status:'Success',
        data:{
            user:updatedUser
        }

    });
});

exports.deleteMe=catchAsync(async(req,res,next)=>{

    await User.findByIdAndUpdate(req.user.id, {active:false})

    res.status(204).json({
        status:'success',
        data:null
    })
});