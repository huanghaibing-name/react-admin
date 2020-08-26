import request from "@utils/request";

const BASE_URL = "/oauth";

// 请求获取验证码  请求路径 http://localhost:5000/oauth/sign_in/digits 请求方式
export function reqGetCode(mobile){

  return request({
    url:`${BASE_URL}/sign_in/digits `,
    method:'POST',
    data:{
      mobile
    }
  })
}