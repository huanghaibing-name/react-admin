import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// mock路径
const MOCK_URL = 'http://localhost:8888/admin/edu/subject'

// 获取课程一级分类列表数据  请求路径：http://localhost:5000/admin/edu/subject 请求方式：GET
export function reqGetSubject(page,limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}


// 获取课程二级分类列表数据  请求路径：http://localhost:5000/admin/edu/subject/get/:parentId 请求方式：GET
export function reqGetSecSubject(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: 'GET'
    
  });
}




