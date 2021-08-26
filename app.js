const path=require('path');
const express=require('express');
const morgan=require('morgan');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');

const AppError=require('./utils/appError');
const globalErrorHandler=require('./controllers/errorController');
const form4Router=require('./routes/form4Routes');
const form4ARouter=require('./routes/form4ARoutes');
const userRouter=require('./routes/userRoutes');
const viewRouter=require('./routes/viewRoutes');

//Start express app
const app=express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//GLOBAL MIDDLEWARES

//Set security HTTP headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}

//Limit request from same API
const limiter=rateLimit({
    max:200,
    windowMs:60*60*1000,
    message:"too many request from this IP, please try again in an hour"
});

app.use('/api', limiter);

//Body parser,reading data from the body into req.body
app.use(express.json({limit:'10kb'}));

//Data sanitization aganist NOSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter polution
app.use(hpp({
    whitelist:['age']
}));

//Serving static files
app.use(express.static(path.join(__dirname,'public')));

//test middleware
app.use((req,res,next)=>{

    req.requestTime=new Date().toISOString();
    //console.log(req.headers);
    next();
});

//ROUTES
app.use('/',viewRouter);
app.use('/api/v1/forms',form4Router);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/form4a',form4ARouter);

app.all('*',(req,res,next)=>{
   next(new AppError(`can't find ${req.originalUrl} on this server!`,400));
});

app.use(globalErrorHandler);

module.exports=app;

