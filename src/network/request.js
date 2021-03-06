import axios from 'axios';

export function request(config) {
    // 1. 创建axios实例，
  const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/w6',
        // timeout:50000,

    })
 // 2. axios拦截器
instance.interceptors.request.use(config=>{
    return config
},err=>{
    console.log(err);
})   
instance.interceptors.response.use(res=>{
    return res.data
})
return instance(config)
}

