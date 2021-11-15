const mongoose=require('mongoose');

const form4Schema=new mongoose.Schema({
    hospitalName:{
        type:String,
        required:[true,'Hospital name is a required field']
    },
    wardNo:Number,
    nameOftheDeceased:{
        type:String,
        required: [true,'Name of the deceased is a required field'],
    },
    sex:{
        type:String,
        required:[true,'Sex is a required field'],
        enum:{
            values:['male','female','other'],
            message:'sex should be either:male,female,other'
        }
    },
    age:Number,
    ageType:
    {type:String,
    required:true
    },
    fullAge:String,
    deathDate:Date,
    deathTime:String,
    immediateCause:String,
    deseaseCode:String,
    deseaseName:String,
    antecedentCause:String,
    otherSignificantCause:String,
    mannerOfDeath:{
        type:String,
        enum:{
            values:['natural','accident','suicide','homicide','pending investigation'],
            message:'you have entered wrong value'
        }
    },
    intervalOnsetDeath:{
        type:String,
        required:true
    },
    howInjuryOccured:{
        type:String,
        minLength:[10, 'length should be between 10words to 45 words'],
        maxLength:[45, 'length should be between 10words to 45 words'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },

    isPregnent:Boolean,
    isDelivery:Boolean,
    isVerified:{
        type:Boolean,
        default:false,
    },
    isApproved:{
        type:Boolean,
        default:false,
    },
    rejectReason:String,
    formNo:{
        type:String,
        unique:true
    },
    
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});


form4Schema.pre('save', function(next){
   this.fullAge = "" + this.age + " " + this.ageType;
   next();
});

form4Schema.pre('save',function(next){
    const val=this.immediateCause.split(" ");
    this.deseaseCode=val[0];
    this.deseaseName=val[1];
    next();
});

form4Schema.pre('save',function(next){
    let val=this.createdAt.toLocaleString();
    val=val.split(',');
    val=val[0];
    val=val.split('/').join('');
    id=this._id.toString();
    const last=id.substr(id.length - 4);
    this.formNo=`${val}-${last}`;
    console.log(this.formNo);
    next();
})
// form4Schema.virtual('betweenOnsetAndDeath').get(function (){
//     const interval=Math.abs(this.deathDate-this.onsetDate);
//     const days=interval/(1000 * 60 * 60*24);
//     if(days>=1){
//         return `${days} days`;
//     }
//     else{
//         const hours=interval/(1000 * 60 * 60);
//         if(hours>=1){
//             return `${hours} hours`;
//         }
//         else{
//             const minutes=interval/(1000 * 60)
//             return `${minutes} minutes`
//         }
//     }
    
// });

const Form4=mongoose.model('Form4',form4Schema);

module.exports=Form4;