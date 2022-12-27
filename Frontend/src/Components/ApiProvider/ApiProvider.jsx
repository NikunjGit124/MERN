import axios from "axios";
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export const HTTP_SERVICE_CALL = async (url, type, body, params) => {
  return new Promise(async function (resolve, reject) {
    try{
     let response =  await axios({
        method: type,
        url: url,
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        data: body,
        params: params,
      });
      console.log("response",response)
      if (response.status === 200 || response.status === 201) {
        return resolve(response);
      }else{
        return resolve(response);
      }
    }catch(error){
      return reject(error.toJSON());
    }
  });
};
export const gloabaltoastmessage = (message,duration,type) => {
    if(type==='success'){
      toast.success(message, {
      position: toast.POSITION.TOP_RIGHT, autoClose:duration
      })

    }else if(type==='error'){
      toast.error(message, {
      position: toast.POSITION.TOP_RIGHT, autoClose:duration
      })
    }else if(type==='warning'){
      toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT, autoClose:duration
      })
    }else{
      toast.info(message, {
      position: toast.POSITION.TOP_RIGHT, autoClose:false
      })  
    }    
}


