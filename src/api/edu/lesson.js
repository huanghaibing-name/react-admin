import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";


//获取所有课程列表 请求路径：http://localhost:5000/admin/edu/lesson/get/:chapterId 请求方式：GET
export function reqGetLesson(chapterId) {
  // console.log(courseId)
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
   
  });
}