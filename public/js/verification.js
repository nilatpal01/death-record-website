import axios from 'axios';
import {showAlert} from './alert';

export const verification4 = async(id,isVerified,rejectReason)=>{
    try { 
        const res=await axios({
            method: 'PATCH',
            url:`http://127.0.0.1:8000/api/v1/forms/${id}`,
            data:{
                isVerified,
                rejectReason
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

export const approver = async(id,isApproved,rejectReason)=>{
    try { 
        const res=await axios({
            method: 'PATCH',
            url:`http://127.0.0.1:8000/api/v1/forms/${id}`,
            data:{
                isApproved,
                rejectReason
            }
        });
        if(res.data.status==='success'){
           showAlert('success', 'form has been approved!');
           window.setTimeout(()=>{
            location.assign('/approver-overview')
          },1500);
        }
    } catch(err) {
        showAlert('error', err.response.data.message);
        window.setTimeout(()=>{
            location.assign('/approver-overview')
          },1500);
    }
}
export const verification4a = async(id,isVerified,rejectReason)=>{
    try { 
        const res=await axios({
            method: 'PATCH',
            url:`http://127.0.0.1:8000/api/v1/form4a/${id}`,
            data:{
                isVerified,
                rejectReason
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

export const rejection4 = async(id,rejectReason)=>{
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

export const rejection4a = async(id,rejectReason)=>{
    try { 
        const res=await axios({
            method: 'PATCH',
            url:`http://127.0.0.1:8000/api/v1/form4a/${id}`,
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

