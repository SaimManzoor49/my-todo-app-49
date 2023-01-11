import {toast} from 'react-toastify';

window.notify = (msg,type)=>{

    const options= {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        };

    switch(type){
        case 'success':
             toast.success(msg,options);
             break;
        case 'error':
             toast.error(msg,options);
             break;
        case 'warning':
             toast.warning(msg,options);
             break;
             
             default:
             toast(msg,options);
            }
}

window.getRandomId=()=>{

    return Math.random().toString(36).slice(2);
}