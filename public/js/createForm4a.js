import axios from 'axios';
import { showAlert } from './alert';

export const createForm4a=async(namePrefix,nameOftheDeceased,relation,relationName,residentLoction,treatmentStartOn,treatmentEndOn,patientDiedOn,
    deathTime,sex,age,ageType,causeOfDeath,intervalOnsetDeath,antacedentCause,
    immediateCause,otherSignificantCause,mannerOfDeath,howInjuryOccured,isFemale,isDelivery)=>{
    try{
        const res=await axios({
            method:'POST',
            url:'http://127.0.0.1:8000/api/v1/form4a',
            data:{
                namePrefix,nameOftheDeceased,relation,relationName,residentLoction,treatmentStartOn,treatmentEndOn,patientDiedOn,
                deathTime,sex,age,ageType,causeOfDeath,intervalOnsetDeath,antacedentCause,immediateCause,otherSignificantCause,mannerOfDeath,
                howInjuryOccured,isFemale,isDelivery
            },
        });
    if(res.data.status==='success'){
        showAlert('success', 'form has been submitted successfully!');
        window.setTimeout(()=>{
            location.assign('/post-form4a')
          },1500);
        }

    } catch(err){
        showAlert('error', err.response.data.message);
    }
    };