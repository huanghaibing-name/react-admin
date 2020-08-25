import {GET_ALL_COURSE} from './constants'


const initCourseList=[]

export default function courseList(prevState=initCourseList,action){

    switch(action.type){

      case GET_ALL_COURSE:
        console.log(action.data)
        return action.data

      default :

        return prevState

    }

}