
import {GET_ALL_COURSE} from './constants'
import {reqGetCourse} from '@api/edu/course'

// 同步action
// 获取所有课程列表数据
function getAllCourseListSync(data){

  return {
    type:GET_ALL_COURSE,
    data
  }
}
export const getAllCourseList = ( ) => {
  return (dispatch) => {
    return reqGetCourse().then((response) => {
      // console.log(response)
      dispatch(getAllCourseListSync(response));
    
    });
  };
};
