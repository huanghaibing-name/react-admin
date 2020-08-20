import request from "@utils/request";

const BASE_URL = "/admin/edu/chapter";


//获取所有课程列表 请求路径：http://localhost:5000/admin/edu/chapter/:page/:limit 请求方式：GET
export function reqGetChapter(courseId) {
  // console.log(courseId)
  return request({
    url: `${BASE_URL}/1/5`,
    method: "GET",
    params:{
      courseId
    }
  });
}