const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A user must have a name'],
    },
    email:{
        type:String,
        required:[true,'A user must have an email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail ,'Please provide a valid email']
    },

    role:{
        type:String,
        enum:['user','admin','super-admin'],
        default:'user'
    },
    password:{
        type:String,
        required:[true,'A user must have an password'],
        minLength:8,
        select:false
    },

    passwordConfirm:{
        type:String,
        required:[true,'A user must have an passwordConfirm'],
        validate:{
            //this only works on CREATE & SAVE!!!!!
            validator:function(el){
                return el===this.password;
            },
            message:'password and confirm password should have same value'
        }
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    }
});

UserSchema.pre('save',async function(next){
    //only run this funnction if password was actually modified
    if(!this.isModified('password')) return next();
    
    //hash the password with cost of 12
    this.password=await bcrypt.hash(this.password,12);

    //Delete the password confirm field
    this.passwordConfirm=undefined;
    next();
});

UserSchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt=Date.now()-1000;
    next();

});

UserSchema.pre(/^find/, function(next){
    //query middleware this points to current query
    this.find({active:{$ne:false}});
    next();
});

UserSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return  await bcrypt.compare(candidatePassword,userPassword);
};

UserSchema.methods.changedPasswordAfter=function(JWTTimeStamp){
    if(this.passwordChangedAt){
        const changedTimeStamp=parseInt(this.passwordChangedAt.getTime()/1000, 10);
        //console.log(changedTimeStamp,JWTTimeStamp);
        return JWTTimeStamp<changedTimeStamp; // 100<200
    }

    //False means not changed
    return false;
};

UserSchema.methods.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');

    this.passwordResetToken= crypto.createHash('sha256').update(resetToken).digest('hex');
    //console.log({resetToken});
    //console.log(this.passwordResetToken);

    this.passwordResetExpires=Date.now()+10*60*1000;

    return resetToken;
}



const User=mongoose.model('User',UserSchema);

module.exports=User;
