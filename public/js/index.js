import '@babel/polyfill';
import { login, logout, signup } from './login';
import { createForm4} from './createForm4';
import { updateSettings} from './updateSettings';
import { createForm4a } from './createForm4a';
import { verification4, approver,rejection4, verification4a, rejection4a  } from './verification';



function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}

const loginForm=document.querySelector('.form--login');
const signupForm=document.querySelector('.form--signup');
const logOutBtn= document.querySelector('.nav__el--logout ');
const updateDataForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-password');
const postForm4 =document.querySelector('.form-create-form4');
const postForm4a =document.querySelector('.form-create-form4a');
const accept=document.querySelector('.btn--accept');
const approve=document.querySelector('.btn--approve');
const reject=document.querySelector('.btn--reject');

const accept4a=document.querySelector('.btn--accept--4a');
const reject4a=document.querySelector('.btn--reject--4a');


 if(loginForm){
 loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
};

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if(signupForm){
  signupForm.addEventListener('submit', (e) => {
     e.preventDefault();
     const name = document.getElementById('name').value;
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     const passwordConfirm = document.getElementById('passwordConfirm').value;
     signup(name, email, password, passwordConfirm);
   });
 };

if(updateDataForm){
  updateDataForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name= document.getElementById('name').value;
    const email=document.getElementById('email').value;
    updateSettings({name, email}, 'data');
  });
};

if(updatePasswordForm){
  updatePasswordForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const passwordCurrent= document.getElementById('password-current').value;
    const password=document.getElementById('password').value;
    const passwordConfirm=document.getElementById('password-confirm').value;
    await updateSettings({passwordCurrent, password, passwordConfirm}, 'password');

    document.getElementById('password-current').value='';
    document.getElementById('password').value='';
    document.getElementById('password-confirm').value='';

  });
};

if(postForm4){
  postForm4.addEventListener('submit', (e)=>{
    e.preventDefault();
    const hospitalName=document.getElementById('hospitalName').value;
    const wardNo=document.getElementById('wardNo').value;
    const deathDate=document.getElementById('deathDate').value;
    const deathTime=document.getElementById('deathTime').value;
    const nameOftheDeceased=document.getElementById('nameOftheDeceased').value;

    let sex;
    if(document.getElementById('male').checked == true){
      sex=document.getElementById('male').value;
    }
    else{
      sex=document.getElementById('female').value;
    };
    console.log(sex);
    
    let age;
    console.log(!(isEmpty((document.getElementById('ageYear').value))));
    console.log(!(isEmpty((document.getElementById('ageMonth').value))));
    console.log(!(isEmpty((document.getElementById('ageYear').value))));
    console.log(!(isEmpty((document.getElementById('ageDay').value))));

    if(!(isEmpty((document.getElementById('ageYear').value)))){
      age=document.getElementById('ageYear').value;
    }
    else if(!(isEmpty((document.getElementById('ageMonth').value)))){
      age=document.getElementById('ageMonth').value;
    }

    else if(!(isEmpty((document.getElementById('ageDay').value)))){
      age=document.getElementById('ageDay').value;
    }

    else{
      age=document.getElementById('ageHour').value;
    }

    console.log(age);

    let ageType;

    if(document.getElementById('typeYear').checked==true){
      ageType=document.getElementById('typeYear').value;
    }
    else if(document.getElementById('typeMonth').checked==true){
      ageType=document.getElementById('typeMonth').value;
    }

    else if(document.getElementById('typeDay').checked==true){
      ageType=document.getElementById('typeDay').value;
    }
    else{
      ageType=document.getElementById('typeHour').value;
    }

    console.log(ageType);

    const intervalOnsetDeath=document.getElementById('intervalOnsetDeath').value;
    const immediateCause=document.getElementById('immediateCause').value;
    const antecedentCause=document.getElementById('antecedentCause').value;
    const otherSignificantCause=document.getElementById('otherSignificantCause').value;

    let mannerOfDeath;

    if(document.getElementById('natural').checked==true){
      mannerOfDeath=document.getElementById('natural').value;
    }
    else if(document.getElementById('accident').checked==true){
      mannerOfDeath=document.getElementById('accident').value;
    }

    else if(document.getElementById('suicide').checked==true){
      mannerOfDeath=document.getElementById('suicide').value;
    }

    else if(document.getElementById('homicide').checked==true){
      mannerOfDeath=document.getElementById('homicide').value;
    }

    else{
      mannerOfDeath=document.getElementById('policeInvestigation').value;
    }

    console.log(mannerOfDeath);

    const howInjuryOccured=document.getElementById('howInjuryOccured').value;

    let isPregnent;
    if(document.getElementById('isPregnentTrue').checked==true){
      isPregnent=document.getElementById('isPregnentTrue').value;
    }
    else{
      isPregnent=document.getElementById('isPregnentFalse').value;
    }

    console.log(isPregnent);

    let isDelivery;

    if(document.getElementById('isDeliveryTrue').checked==true){
      isDelivery=document.getElementById('isDeliveryTrue').value;
    }
    else{
      isDelivery=document.getElementById('isDeliveryFalse').value;
    }

    console.log(isDelivery);

    createForm4(hospitalName,wardNo,deathDate,deathTime,nameOftheDeceased,sex,age,ageType,intervalOnsetDeath,
      immediateCause,antecedentCause,otherSignificantCause,mannerOfDeath,howInjuryOccured,isPregnent,isDelivery);
  });
};

if(postForm4a){
  postForm4a.addEventListener('submit', (e)=>{
    e.preventDefault();
    const namePrefix=document.getElementById('namePrefix').value;
    const nameOftheDeceased=document.getElementById('nameOftheDeceased').value;
    const relation=document.getElementById('relation').value;
    const relationName=document.getElementById('relationName').value;
    const residentLocation=document.getElementById('residentLocation').value;
    const treatmentStartOn=document.getElementById('treatmentStartOn').value;
    const treatmentEndOn=document.getElementById('treatmentEndOn').value;
    const patientDiedOn=document.getElementById('patientDiedOn').value;
    const deathTime=document.getElementById('deathTime').value;

    let sex;
    if(document.getElementById('male').checked == true){
      sex=document.getElementById('male').value;
    }
    else{
      sex=document.getElementById('female').value;
    };
    console.log(sex);
   
    
    let age;
    console.log(!(isEmpty((document.getElementById('ageYear').value))));
    console.log(!(isEmpty((document.getElementById('ageMonth').value))));
    console.log(!(isEmpty((document.getElementById('ageYear').value))));
    console.log(!(isEmpty((document.getElementById('ageDay').value))));

    if(!(isEmpty((document.getElementById('ageYear').value)))){
      age=document.getElementById('ageYear').value;
    }
    else if(!(isEmpty((document.getElementById('ageMonth').value)))){
      age=document.getElementById('ageMonth').value;
    }

    else if(!(isEmpty((document.getElementById('ageDay').value)))){
      age=document.getElementById('ageDay').value;
    }

    else{
      age=document.getElementById('ageHour').value;
    }

    console.log(age);

    console.log(age);
    let ageType;

    if(document.getElementById('typeYear').checked==true){
      ageType=document.getElementById('typeYear').value;
    }
    else if(document.getElementById('typeMonth').checked==true){
      ageType=document.getElementById('typeMonth').value;
    }

    else if(document.getElementById('typeDay').checked==true){
      ageType=document.getElementById('typeDay').value;
    }
    else{
      ageType=document.getElementById('typeHour').value;
    }

    console.log(ageType);

    const intervalOnsetDeath=document.getElementById('intervalOnsetDeath').value;
    const immediateCause=document.getElementById('immediateCause').value;
    console.log(immediateCause);
    const antecedentCause=document.getElementById('antecedentCause').value;
    const otherSignificantCause=document.getElementById('otherSignificantCause').value;
 
    let mannerOfDeath;

    if(document.getElementById('natural').checked==true){
      mannerOfDeath=document.getElementById('natural').value;
    }
    else if(document.getElementById('accident').checked==true){
      mannerOfDeath=document.getElementById('accident').value;
    }

    else if(document.getElementById('suicide').checked==true){
      mannerOfDeath=document.getElementById('suicide').value;
    }

    else if(document.getElementById('homicide').checked==true){
      mannerOfDeath=document.getElementById('homicide').value;
    }

    else{
      mannerOfDeath=document.getElementById('policeInvestigation').value;
    }

    console.log(mannerOfDeath);

    const howInjuryOccured=document.getElementById('howInjuryOccured').value;


    let isPregnent;

    if(document.getElementById('isPregnentTrue').checked==true){
      isPregnent=document.getElementById('isPregnentTrue').value;
    }
    else{
      isPregnent=document.getElementById('isPregnentFalse').value;
    }

    console.log(isPregnent);

    let isDelivery;

    if(document.getElementById('isDeliveryTrue').checked==true){
      isDelivery=document.getElementById('isDeliveryTrue').value;
    }
    else{
      isDelivery=document.getElementById('isDeliveryFalse').value;
    }

    console.log(isDelivery);
    createForm4a(namePrefix,nameOftheDeceased,relation,relationName,residentLocation,treatmentStartOn,treatmentEndOn,
      patientDiedOn,deathTime,sex,age,ageType,intervalOnsetDeath,immediateCause,antecedentCause,
      otherSignificantCause,mannerOfDeath, howInjuryOccured,isPregnent,isDelivery);
});
};

if(accept){
  accept.addEventListener('click', (e)=>{
    e.preventDefault();
    const url=window.location.href;
    const id=url.split('/').pop();
    const isVerified=true;
    const rejectReason="form has been corrected";
    verification4(id,isVerified,rejectReason);
  })
}

if(approve){
  approve.addEventListener('click', (e)=>{
    e.preventDefault();
    const url=window.location.href;
    const id=url.split('/').pop();
    const isApproved=true;
    const rejectReason="form has been corrected";
    approver(id,isApproved,rejectReason);
  })
}


if(accept4a){
  accept4a.addEventListener('click', (e)=>{
    e.preventDefault();
    const url=window.location.href;
    const id=url.split('/').pop();
    const isVerified=true;
    const rejectReason="form has been corrected";
    verification4a(id,isVerified,rejectReason);
  })
}

if(reject){
  reject.addEventListener('click', (e)=>{
    e.preventDefault();
    let markup= `<div>
    <h3>Please give reason for rejection:</h3>
    <input type='text', id='rejectReason' placeholder='your reason here'>
    <button class="btn btn-danger btn-lg btn--reject--final">Confirm Reject  </button>
    </div>
    `
    document.querySelector('.btn--reject').insertAdjacentHTML('afterend', markup);
    const rejected = document.querySelector('.btn--reject--final');
      rejected.addEventListener('click', (e)=>{
        e.preventDefault();
        const reason=document.getElementById('rejectReason').value;
        const rejectReason=reason;
        console.log(rejectReason);
         const url=window.location.href;
        console.log(url)
        const id=url.split('/').pop();
        console.log(id);
        rejection4(id,rejectReason);
      })
    },{once:true})
}

  reject4a.addEventListener('click', (e)=>{
    e.preventDefault();
    let markup= `<div>
    <h3>Please give reason for rejection:</h3>
    <input type='radio', id='rejectReason1'name='reject reason' value='lorem ipsum 1'>
    <label for="reason1">lorem ipsum 1</label>
    <input type='radio', id='rejectReason2'name='reject reason' value='lorem ipsum 2'>
    <label for="reason2">lorem ipsum 2</label>
    <input type='radio', id='rejectReason3'name='reject reason' value='lorem ipsum 3'>
    <label for="reason3">lorem ipsum 3</label><br />
    <p>If any other reason,please mention it below</p>
    <input type="text" placeholder="reason for rejection" id="otherReason"><br/>
    <button class="btn btn-danger btn-lg btn--reject--final">Confirm Reject </button>
    </div>
    `
    document.querySelector('.btn--reject--4a').insertAdjacentHTML('afterend', markup);
    const rejected = document.querySelector('.btn--reject--final');
      rejected.addEventListener('click', (e)=>{
        e.preventDefault();
        let reason;
        if(document.getElementById('rejectReason1').checked==true){
          reason=document.getElementById('rejectReason1').value;
        }
        else if(document.getElementById('rejectReason2').checked==true){
          reason=document.getElementById('rejectReason2').value;
        }
        else if(document.getElementById('rejectReason3').checked==true){
            reason=document.getElementById('rejectReason3').value;
        }
    
        else{
          reason=document.getElementById('otherReason').value;
        }
        const rejectReason=reason;
        console.log(rejectReason);
         const url=window.location.href;
        console.log(url)
        const id=url.split('/').pop();
        console.log(id);
        rejection4a(id,rejectReason);
      })
    },{once:true})



