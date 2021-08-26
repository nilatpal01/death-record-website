const AppError=require('../utils/appError');

const handleCastErrorDB=err=>{
    const message=`Invalid ${err.path}: ${err.value}`;
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

const sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    });
};

const sendErrorProd=(err,res)=>{
    //Opeartional,trusted error:send message to client
    if(err.isOperational){
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    });
}

//Programming or other unknown error: Don't leak error details
else{
    //1)Log error
    console.error('ERROR',err);

    //2)Send generic message
    res.status(500).json({
        status:'error',
        message:'Something went very wrong'
    });
}
};


module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode || 500;
    err.status=err.status || 'error';

    if(process.env.NODE_ENV==='development'){
       sendErrorDev(err,res);
    }
    else if(process.env.NODE_ENV==='production'){
    if(err.name==='CastError') err=handleCastErrorDB(err);
    if(err.code===11000) err=handleDuplicateFieldsDB(err);
    if(err.name==='ValidationError') err=handleValidationErrorDB(err);
    if(err.name==='JsonWebTokenError') err=handleJWTError();
    if(err.name==='TokenExpiredError') err=handleJWTExpiredError();
    sendErrorProd(err,res);
    }
};