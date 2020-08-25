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

// 获取七牛云上传凭证  请求路径：http://localhost:5000/uploadtoken 请求方式 ：GET
export function reqGetUploadToken() {
  return request({
    url: `/uploadtoken`,
    method: "GET",
   
  });
}


// 新增课时  请求路径：http://localhost:5000/admin/edu/lesson/save 请求方式：POST
export function addLesson({chapterId,title,free,video}) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data:{
      chapterId,
      title,
      free,
      video
    }   
  });
}

// 批量删除多个课时 请求路径：http://localhost:5000/admin/edu/lesson/batchRemove 请求方式：DELETE
export function reqBatchRemoveLessonList(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data:{
      idList
    }   
  });
}