import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST
} from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细课程列表数据
};

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
    action.data.items.forEach(item => item.children = [])
    // console.log(action.data)
      return action.data;

     case GET_SEC_SUBJECT_LIST:
      //  获取一级列表分类数据
      const FisItems = prevState.items
      // 获取二级列表分类数据
      const SecItems = action.data.items
      console.log(SecItems)
      // SecItems.length && FisItems.forEach(item => {
      //   if(item._id === SecItems[0].parentId){
      //     item.children = SecItems
      //   }
      // })

      SecItems.length && FisItems.find(item =>{
        SecItems.forEach(SecItem =>{
          if(item._id === SecItem.parentId){
            item.children = SecItems
          }    
        })      
      })
       return{
         ...prevState,
         items:FisItems
       }
    default:
      return prevState;
  }
}
