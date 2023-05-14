import axios from "axios";
const BASE_URL = "http://localhost:5000/api";
function  getToken(){

   const persistStore =  localStorage.getItem("persist:root");
   if(!persistStore) return "";
   const user = JSON.parse(persistStore).user;
   if(!user) return "";
   const currentUser = JSON.parse(user).currentUser;
   if(!currentUser) return "";
   return currentUser.accessToken;
}
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer ${getToken()}`}
});
export const multiPartRequest = axios.create({
    baseURL:BASE_URL,
    headers:{
        token:`Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data'
    }
})