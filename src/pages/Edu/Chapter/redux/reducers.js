import {
  GET_COURSE_LIST,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  BATCH_REMOVE_CHAPTER_LIST,
  BATCH_REMOVE_LESSON_LIST
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
        // console.log(action.data.items)
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

      case BATCH_REMOVE_CHAPTER_LIST:

      // 获取章节列表
      let chapters = [...prevState.chapterList]
      // 获取要删除的章节id
      const delChapterIds = action.data
      chapters = chapters.filter(item => delChapterIds.indexOf(item._id) === -1)

      return{
        ...prevState,
        chapterList:chapters
      }

      case BATCH_REMOVE_LESSON_LIST:
        // 获取章节列表
        const chapterLists = [...prevState.chapterList]
         // 获取要删除的课时id
        const delLessonIds = action.data
        chapterLists.forEach(item =>{

          item.children = item.children.filter(SecItem => delLessonIds.indexOf(SecItem._id) === -1)
        })

        return{
          ...prevState,
          chapterList:chapterLists
        }

    default:
      return prevState;
  }
}
