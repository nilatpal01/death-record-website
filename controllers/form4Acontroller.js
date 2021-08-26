const Form4A =require('../models/form4aModel');
const APIFeatures=require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync=require('../utils/catchAsync');

exports.verifiedForm4as =(req,res,next)=>{
    req.query.isVerified=true;
    next();
};

exports.getAllForm= catchAsync(async (req,res )=>{
        const features=new APIFeatures(Form4A.find(),req.query).filter().sort().limitFields().pagination();
        const form4As=await features.query;
        res.status(200).json({
        status:'success',
        results:form4As.length,
        data:{
           form4As
        }
    });
});

exports.getForm= catchAsync(async (req,res)=>{
    
    const form4A= await Form4A.findById(req.params.id);
    if(!form4A){
        return next(new AppError('No form found with that ID', 404));
    }
    res.status(200).json({
         status:'success',
         data:{
             form4A
         }
     });
 });
 
 exports.createForm=catchAsync(async (req,res)=>{

    const newForm4A=await Form4A.create(req.body);
    res.status(201).json({
        status:"success",
        data:{
        form:newForm4A
       }
    })
});

exports.updateForm=catchAsync(async (req,res)=>{

    const form4A= await Form4A.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    if(!form4A){
        return next(new AppError('No form found with that ID', 404));
    }
    res.status(200).json({
    status:'success',
    data:{
        form:form4A
    }
});
});

exports.deleteForm=catchAsync(async (req,res)=>{

   const form4A= await Form4A.findByIdAndDelete(req.params.id);

    if(!form4A){
        return next(new AppError('No form found with that ID', 404));
    }
    res.status(204).json({
    status:'success',
    data: null
    });
});

exports.getForm4Astats=catchAsync(async(req,res)=>{
        const stats= await Form4A.aggregate([
            {
                $match:{age:{$gte:55}}
            },
            {
                $group: {
                _id:{$toUpper:'$sex'},
                num:{$sum:1},
                //numAge:{$sum:'$age'},
                avgAge:{$avg:'$age'},
                minAge:{$min:'$age'},
                maxAge:{$max:'$age'}
            }
            },
            {
                $sort:{age:1},
            },
        ]);
        res.status(200).json({
            status:'success',
            data:{
                stats
            }
        });
});

exports.getMonthlyDeath=catchAsync(async(req,res)=>{
        const year=req.params.year * 1;
        const death=await Form4A.aggregate([
            {
                $unwind:'$deathDate'
            },
            {
                $match:{
                    deathDate:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`),
                    }
                }
             
            },
            {
                $group:{
                    _id:{$month:'$deathDate'},
                    numDeath:{$sum:1},
                    death:{$push:'$nameOftheDeceased'}
                }
            },
            {
                $addFields:{month:'$_id'}
            },
            {
                $project:{
                    _id:0
                }
            },
            {
                $sort:{numDeath:-1}
            },
        ]);

        res.status(200).json({
            status:'success',
            data:{
                death
            }
        });
});
