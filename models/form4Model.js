const mongoose=require('mongoose');

const form4Schema=new mongoose.Schema({
    hospitalName:{
        type:String,
        required:[true,'Hospital name is a required field']
    },
    wardNo:Number,
    hospitalLocation:{
        type:String,
        required: [true,'Hospital must have a location']
    },
    nameOftheDeceased:{
        type:String,
        required: [true,'Name of the deceased is a required field'],
        unique:true
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
    causeOfDeath:{
        type:String,
        required:[true,'cause of death is a required field']
    },
    immediateCause:String,
    antecedentCause1:String,
    antecedentCause2:String,
    otherSignificantCause:String,
    mannerOfDeath:{
        type:String,
        enum:{
            values:['natural','accident','suicide','homicide','pending information'],
            message:'you have entered wrong value'
        }
    },
    onsetDate:Date,
    deathDate:Date,
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

form4Schema.virtual('betweenOnsetAndDeath').get(function (){
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

const Form4=mongoose.model('Form4',form4Schema);

module.exports=Form4;