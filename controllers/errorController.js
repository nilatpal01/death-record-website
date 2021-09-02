const AppError=require('../utils/appError');

const handleCastErrorDB=err=>{
    const message=`There is no form found with that ID`;
    return new AppError(message,400);
};

const handleJWTError=()=>new AppError('Invalid Token,PLease login again', 401);

const handleJWTExpiredError=()=>new AppError('Session expired,Please login again',401);

const handleDuplicateFieldsDB=(err)=>{
    const value=err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    console.log(value);
    const message=`Duplicate field value:${value}.Please use another value!`;

    return new AppError(message,400);
};

const handleValidationErrorDB=err=>{
    const errors=Object.values(err.errors).map(el=>el.message);
    const message=`Invalid input Data. ${errors.join('. ')}`;
    return new AppError(message,400);
}

const sendErrorDev=(err,req,res)=>{
    //A)API
    if(req.originalUrl.startsWith('/api')){
    return res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    });
}
    //B)RENDERED WEBSITE
    console.error('ERROR',err);
    return res.status(err.statusCode).render('error',{
        title:'Something went wrong',
        msg:err.message
    })
};

const sendErrorProd=(err,req,res)=>{
    //A)API
    if(req.originalUrl.startsWith('/api')){
    //A)Opeartional,trusted error:send message to client
    if(err.isOperational){
    return res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    });
    }
    //B)Programming or other unknown error: Don't leak error details
    //1)Log error
    console.error('ERROR',err);
    //2)Send generic message
    return res.status(500).json({
        status:'error',
        message:'Something went very wrong'
    });
    }
    //B)RENDERED WEBSITE
    if(err.isOperational){
    return res.status(err.statusCode).render('error',{
            title:'Something went wrong',
            msg:err.message
     });
    }
    //Programming or other unknown error: Don't leak error details
        //1)Log error
        console.error('ERROR',err);
    
        //2)Send generic message
        return res.status(err.statusCode).render('error',{
            title:'Something went wrong',
            msg: 'PLease try again later'
     });
    };


module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode || 500;
    err.status=err.status || 'error';

    if(process.env.NODE_ENV==='development'){
       sendErrorDev(err,req,res);
    }
    else if(process.env.NODE_ENV==='production'){
    if(err.name==='CastError') err=handleCastErrorDB(err);
    if(err.code===11000) err=handleDuplicateFieldsDB(err);
    if(err.name==='ValidationError') err=handleValidationErrorDB(err);
    if(err.name==='JsonWebTokenError') err=handleJWTError();
    if(err.name==='TokenExpiredError') err=handleJWTExpiredError();
    sendErrorProd(err,req,res);
    }
};