import request from "@utils/request";

const BASE_URL = "/admin/edu/course";


//获取所有课程列表 请求路径：http://localhost:5000/admin/edu/course 请求方式：GET
export function reqGetCourse() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}