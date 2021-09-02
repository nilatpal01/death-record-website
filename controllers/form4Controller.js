const Form4 =require('../models/form4Model');
const APIFeatures=require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync=require('../utils/catchAsync');

exports.verifiedFrom4s=(req,res,next)=>{
    req.query.isVerified=true,
    next();
};

exports.getAllForm= catchAsync(async (req,res,next)=>{
         //EXECUTE QUERY
        const features=new APIFeatures(Form4.find(),req.query).filter().sort().limitFields().pagination();
        const form4s=await features.query;

        //SEND RESPONSE
        res.status(200).json({
        status:'success',
        results:form4s.length,
        data:{
           form4s
        }
    });
});

exports.getForm= catchAsync(async (req,res,next)=>{

    const form4= await Form4.findById(req.params.id);
    
    if(!form4){
        return next(new AppError('No form found with that ID', 404));
    }
        
    res.status(200).json({
         status:'success',
         data:{
             form4
         }
     });
 });
 
 exports.createForm=catchAsync(async (req,res,next)=>{
    const newForm4=await Form4.create(req.body);
    res.status(201).json({
        status:"success",
        data:{
        form:newForm4
       }
    });
});

exports.updateForm=catchAsync(async (req,res,next)=>{
       const form4= await Form4.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })

        if(!form4){
            return next(new AppError('No form found with that ID', 404));
        }
            
    res.status(200).json({
    status:'success',
    data:{
        form:form4
    }
});
});

exports.deleteForm=catchAsync(async (req,res,next)=>{
        const form4=await Form4.findByIdAndDelete(req.params.id);

        if(!form4){
            return next(new AppError('No form found with that ID', 404));
        }
            
        res.status(204).json({
        status:'success',
        data: null
    });
});

exports.getForm4Astats=catchAsync(async(req,res,next)=>{
        const stats= await Form4.aggregate([
            // {
            //     $match:{age:{$gte:55}}
            // },
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

exports.getMonthlyDeath=catchAsync(async(req,res,next)=>{
        const year=req.params.year * 1;
        const death=await Form4.aggregate([
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
