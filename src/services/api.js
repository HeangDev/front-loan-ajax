import axios from 'axios';
 
const http = axios.create({
    baseURL: 'https://subadmin.smeservice.net/',
    // baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true
});
 
export default http;