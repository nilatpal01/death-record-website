import axios from 'axios';
import { showAlert } from './alert';


export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res.data.data.user.role);
    if(res.data.data.user.role!='admin'){
      showAlert('success', 'logged in successfully');
      window.setTimeout(()=>{
        location.assign('/userOverview')
      },1500);
    }
    else{
      showAlert('success', 'logged in successfully! you are an admin');
      window.setTimeout(()=>{
        location.assign('/admin-overview')
      },1500);
    }

  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try{
    const res = await axios({
      method: 'GET',
      url:'http://127.0.0.1:8000/api/v1/users/logout',
    });
    
    if(res.data.status === 'success'){
      showAlert('success', 'logging you out');
      location.assign('/');
    }
  }
  catch(err) {
    showAlert('error', 'Error logging out! try again')
  }
} 

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      },
    });

    if(res.data.status==='success'){
      showAlert('success', 'account has been created successfully!');
      window.setTimeout(()=>{
        location.assign('/userOverview')
      },1500);
    }

  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};


