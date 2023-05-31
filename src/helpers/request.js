import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ShowAlertToast } from '../services/ToastService';
import { LogOut } from '../services/Services';
const http = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
});

http.interceptors.request.use(function (config) {

    let token = localStorage.getItem('token');
    if (token !== null) {
        var tokenDecoded = jwtDecode(token);
        config.headers.Authorization = `Bearer ${token}`
        var timeStampNow=Date.now()/1000;
        if(timeStampNow>tokenDecoded.exp){
            ShowAlertToast("Token expired, please login again!")
            LogOut();
            window.location.reload()
        }
       
    }
    // config.headers.Authorization=null;
    return config;
})
export { http };
axios.defaults.headers.common["Authorization"] = localStorage.getItem('token')