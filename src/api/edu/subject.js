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

// 添加分类课程 请求路径：http://localhost:5000/admin/edu/subject/save 请求方式：POST
export function reqAddSubjectList(title,parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: 'POST',
    data:{
        title,
        parentId
    }
  });
}

// 更新课程分类 请求路径 http://localhost:5000/admin/edu/subject/update  请求方式：PUT
export function reqUpdateSubject(id,title) {
  return request({
    url: `${BASE_URL}/update`,
    method: 'PUT',
    data:{
        id,
        title        
    }
  });
}


// 删除课程分类 请求路径：http://localhost:5000/admin/edu/subject/remove/:id 请求方式：Delete
export function reqDelSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: 'DELETE',
    
  });
}



