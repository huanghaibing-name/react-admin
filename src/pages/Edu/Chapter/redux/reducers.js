import {
  GET_COURSE_LIST,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST
} from "./constants";

const initChapterList = {
  courseList:[],
  chapterList:[]
};

export default function chapterList(prevState = initChapterList, action) {
  switch (action.type) {
    case GET_COURSE_LIST:
      return {
        ...prevState,
        courseList:action.data
      }

      case GET_CHAPTER_LIST:
        action.data.items.forEach(item =>{

          item.children = []
        })
        return {
          ...prevState,
          chapterList:action.data.items
        }

      case GET_LESSON_LIST:
        // console.log(action.data.response)
        const newChapterList = [...prevState.chapterList]
        newChapterList.forEach(item => {

          if(item._id === action.data.chapterId){

            item.children =  action.data.response
          }
        })
        console.log(action.data.response)

        return{
          ...prevState,
          chapterList:newChapterList
        }
      
    default:
      return prevState;
  }
}
