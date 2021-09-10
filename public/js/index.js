import '@babel/polyfill';
import { login, logout, signup } from './login';
import { createForm4} from './createForm4';
import { updateSettings} from './updateSettings';
import { createForm4a } from './createForm4a';
import { verification, rejection } from './verification';

const loginForm=document.querySelector('.form--login');
const signupForm=document.querySelector('.form--signup');
const logOutBtn= document.querySelector('.nav__el--logout ');
const updateDataForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-password');
const postForm4 =document.querySelector('.form-create-form4');
const postForm4a =document.querySelector('.form-create-form4a');
const accept=document.querySelector('.btn--accept');
const reject=document.querySelector('.btn--reject');


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
    const deathTime=document.getElementById('deathTime').value;
    const nameOftheDeceased=document.getElementById('nameOftheDeceased').value;
    const sex=document.getElementById('sex').value;
    const age=document.getElementById('age').value;
    const ageType=document.getElementById('ageType').value;
    const causeOfDeath=document.getElementById('causeOfDeath').value;
    const intervalBetweenOnsetDeath=document.getElementById('intervalBetweenOnsetDeath').value;
    const immediateCause=document.getElementById('immediateCause').value;
    const antacedentCause=document.getElementById('antacedentCause').value;
    const otherSignificantCause=document.getElementById('otherSignificantCause').value;
    const mannerOfDeath=document.getElementById('mannerOfDeath').value;
    const howInjuryOccured=document.getElementById('howInjuryOccured').value;
    const isFemale=document.getElementById('isFemale').value;
    const isDelivery=document.getElementById('isDelivery').value;
    createForm4(hospitalName,wardNo,deathTime,nameOftheDeceased,sex,age,ageType,causeOfDeath,intervalBetweenOnsetDeath,
      immediateCause,antacedentCause,otherSignificantCause,mannerOfDeath,howInjuryOccured,isFemale,isDelivery);
  });
};

if(postForm4a){
  postForm4a.addEventListener('submit', (e)=>{
    e.preventDefault();
    const namePrefix=document.getElementById('namePrefix').value;
    const nameOftheDeceased=document.getElementById('nameOftheDeceased').value;
    const relation=document.getElementById('relation').value;
    const relationName=document.getElementById('relationName').value;
    const residentLoction=document.getElementById('residentLoction').value;
    const treatmentStartOn=document.getElementById('treatmentStartOn').value;
    const treatmentEndOn=document.getElementById('treatmentEndOn').value;
    const patientDiedOn=document.getElementById('patientDiedOn').value;
    const deathTime=document.getElementById('deathTime').value;
    const sex=document.getElementById('sex').value;
    const age=document.getElementById('age').value;
    const ageType=document.getElementById('ageType').value;
    const causeOfDeath=document.getElementById('causeOfDeath').value;
    const intervalBetweenOnsetDeath=document.getElementById('intervalBetweenOnsetDeath').value;
    const immediateCause=document.getElementById('immediateCause').value;
    const antacedentCause=document.getElementById('antacedentCause').value;
    const otherSignificantCause=document.getElementById('otherSignificantCause').value;
    const mannerOfDeath=document.getElementById('mannerOfDeath').value;
    const howInjuryOccured=document.getElementById('howInjuryOccured').value;
    const isFemale=document.getElementById('isFemale').value;
    const isDelivery=document.getElementById('isDelivery').value;
    createForm4a(namePrefix,nameOftheDeceased,relation,relationName,residentLoction,treatmentStartOn,treatmentEndOn,
      patientDiedOn,deathTime,sex,age,ageType,causeOfDeath,intervalBetweenOnsetDeath,immediateCause,antacedentCause,
      otherSignificantCause,mannerOfDeath, howInjuryOccured,isFemale,isDelivery);
});
};

if(accept){
  accept.addEventListener('click', (e)=>{
    e.preventDefault();
    const url=window.location.href;
    const id=url.split('/').pop();
    const isVerified=true;
    verification(id,isVerified);
  })
}

if(reject){
  reject.addEventListener('click', (e)=>{
    e.preventDefault();
    let reason = window. prompt("Please give reason for rejection: "); 
    alert("Form rejected because of " + reason);
    const url=window.location.href;
    const id=url.split('/').pop();
    const rejectReason=reason;
    rejection(id,rejectReason);
  })
}


