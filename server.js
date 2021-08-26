const mongoose=require('mongoose')
const dotenv=require('dotenv')

process.on('uncaughtException',err=>{
    console.log('UNCAUGHT EXCEPTION! Shutting down....');
    console.log(err.name,err.message);
        process.exit(1);
});

dotenv.config({ path: './config.env'});

const app=require('./app');
const { compile } = require('morgan');

console.log(process.env.NODE_ENV);
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose
    .connect(process.env.DATABASE_LOCAL,{
    //.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=> console.log("DB conection sucessful!"));


/*const testForm4=new Form4({
    hospitalName:'Valley Hospital',
    wardNo:20,
    hospitalLocation:'meherpur',
    nameOftheDeceased:'Parikshit Deb',
    sex:'male',
    causeOfDeath:'allergy',
    mannerOfDeath:'natural',
    howInjuryOccured:'for not having bath for a long time',
    isFemale:false,
    isDelivery:false,
    isVerified:false,
    isApproved:false
});

testForm4.save().then(doc=>{
    console.log(doc);
}).catch(err=>{
    console.log('error:',err);
})
*/

const port=process.env.PORT||3000;

const server=app.listen(port, ()=>{
    console.log(`app running on port ${port}....`);
});

process.on('unhandledRejection', err=>{
    console.log('Unhandled Rejection! Shutting down....');
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    })
});
