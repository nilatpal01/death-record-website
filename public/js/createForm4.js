import axios from 'axios';
import { showAlert } from './alert';

export const createForm4=async(hospitalName,wardNo,deathDate,deathTime,nameOftheDeceased,sex,age,ageType,intervalOnsetDeath,immediateCause,antecedentCause,
    otherSignificantCause,mannerOfDeath,howInjuryOccured,isPregnent,isDelivery)=>{
    try{
        const res=await axios({
            method:'POST',
            url:'http://127.0.0.1:8000/api/v1/forms',
            data:{
                hospitalName,wardNo,deathDate,deathTime,nameOftheDeceased,sex,age,ageType,intervalOnsetDeath,immediateCause,antecedentCause,otherSignificantCause,mannerOfDeath,
                howInjuryOccured,isPregnent,isDelivery
            },
        });
    if(res.data.status==='success'){
        console.log('Form has been submitted')
        showAlert('success', 'form has been submitted successfully!');
        window.setTimeout(()=>{
            location.assign('/post-form4')
          },2000);
        }

    } catch(err){
        console.log('something wrong')
        showAlert('error', err.response.data.message);
    }
    };
