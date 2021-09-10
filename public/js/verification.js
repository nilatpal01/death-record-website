import axios from 'axios';
import {showAlert} from './alert';

export const verification = async(id,isVerified)=>{
    try { 
        const res=await axios({
            method: 'PATCH',
            url:`http://127.0.0.1:8000/api/v1/forms/${id}`,
            data:{
                isVerified
            }
        });
        if(res.data.status==='success'){
           showAlert('success', 'form has been verfied!');
           window.setTimeout(()=>{
            location.assign('/admin-overview')
          },1500);
        }
    } catch(err) {
        showAlert('error', err.response.data.message);
        window.setTimeout(()=>{
            location.assign('/admin-overview')
          },1500);
    }
}

export const rejection = async(id,rejectReason)=>{
    try { 
        const res=await axios({
            method: 'PATCH',
            url:`http://127.0.0.1:8000/api/v1/forms/${id}`,
            data:{
                rejectReason
            }
        });
        if(res.data.status==='success'){
           showAlert('error', 'form has been rejected!');
           window.setTimeout(()=>{
            location.assign('/admin-overview')
          },1500);
        }
    } catch(err) {
        showAlert('error', err.response.data.message);
        window.setTimeout(()=>{
            location.assign('/admin-overview')
          },1500);
    }
}

