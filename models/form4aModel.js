const mongoose=require('mongoose');

const Form4aSchema=new mongoose.Schema({
    nameOftheDeceased:{
        type:String,
        required: [true,'Name of the deceased is a required field'],
        unique:true
    },
    namePrefix:String,

    fullName:String,

    relation:{
        type:String,
        enum:{
            values:['son of','wife of','daughter of'],
            message:'entered wrong input'
        }
    },
    relationName:{
        type:String,
        required:['true','it is a required field']
    },
    residentLocation:String,
    treatmentStartOn:Date,
    patientDiedOn:Date,
    treatmentEndOn:Date,
    deathTime:String,
    sex:{
        type:String,
        required:[true,'Sex is a required field'],
        enum:{
            values:['male','female','other'],
            message:'sex should be either:male,female,other'
        }
    },
    age:Number,
    ageType:String,
    fullAge:String,
    causeOfDeath:{
        type:String,
        required:[true,'cause of death is a required field']
    },
    immediateCause:String,
    antecedentCause1:String,
    otherSignificantCause:String,
    mannerOfDeath:{
        type:String,
        enum:{
            values:['natural','accident','suicide','homicide','pending information'],
            message:'you have entered wrong value'
        }
    },
    intervalOnsetDeath:String,
    howInjuryOccured:String,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },

    isFemale:Boolean,
    isDelivery:Boolean,
    isVerified:Boolean,
    isApproved:Boolean
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

Form4aSchema.pre('save', function(next){
    this.fullAge = "" + this.age + " " + this.ageType;
    this.fullName=this.namePrefix+" "+this.nameOftheDeceased;
    next();
 })
/*

form4ASchema.virtual('betweenOnsetAndDeath').get(function (){
    const interval=Math.abs(this.deathDate-this.onsetDate);
    const days=interval/(1000 * 60 * 60*24);
    if(days>=1){
        return `${days} days`;
    }
    else{
        const hours=interval/(1000 * 60 * 60);
        if(hours>=1){
            return `${hours} hours`;
        }
        else{
            const minutes=interval/(1000 * 60)
            return `${minutes} minutes`
        }
    }
    
});
*/

const Form4a=mongoose.model('Form4a',Form4aSchema);

module.exports=Form4a;