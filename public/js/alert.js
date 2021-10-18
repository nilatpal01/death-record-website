export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el);
};

//type is 'success' or 'error'
export const showAlert = (type,msg)=>{
    hideAlert();
    const markup=`<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('.btn').insertAdjacentHTML('beforebegin', markup);
    window.setTimeout(hideAlert,5000);
};