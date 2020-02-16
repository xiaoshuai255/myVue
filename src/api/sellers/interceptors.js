import axios from "axios"
const objAxios = axios.create({
  // baseURL:"https://api.github.com",
  timeout:15000
})


objAxios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});


objAxios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});


export default objAxios
