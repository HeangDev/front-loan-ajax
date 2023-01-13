import axios from 'axios';
 
const http = axios.create({
    baseURL: 'https://subadmin.smeservice.net/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true
});
 
export default http;