import axios from "axios";
// export const BASE_URL = "http://localhost:5000/api";
export const BASE_URL = "https://delightful-pike-kilt.cyclic.app/api";
function getToken(){
    const persistStore =  localStorage.getItem("persist:root");
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) return accessToken;
    if(!persistStore) return "";
    const user = JSON.parse(persistStore).user;
    if(!user) return "";
    const currentUser = JSON.parse(user).currentUser;
    if(!currentUser) return undefined;
   return currentUser.accessToken;
}
export const publicRequest = axios.create({
    baseURL: BASE_URL,
    headers:{'Content-Type': 'multipart/form-data'}
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data'}
});