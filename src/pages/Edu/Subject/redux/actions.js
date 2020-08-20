import {
  reqGetSubject,
  reqGetSecSubject,
  reqUpdateSubject,
  reqDelSubject
} from "@api/edu/subject";

import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  UPDATE_SUBJECT_LIST,
  DELETE_SUBJECT_LIST
} from "./constants";
/**
 * 获取课程一级分类列表数据
 */
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = ( page, limit) => {
  return (dispatch) => {
    return reqGetSubject(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response.total;
    });
  };
};


/**
 * 获取课程二级分类列表数据
 */
const getSecSubjectListSync = (list) => ({
  type: GET_SEC_SUBJECT_LIST,
  data: list,
});

export const getSecSubjectList = ( parentId) => {
  return (dispatch) => {
    return reqGetSecSubject(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response.total;
    });
  };
};



/**
 * 更新课程分类数据
 */
const updateSubjectListSync = (data) => ({
  type: UPDATE_SUBJECT_LIST,
  data: data,
});

export const updateSubjectList = (id,title) => {
  return (dispatch) => {
    return reqUpdateSubject(id,title).then((response) => {
      dispatch(updateSubjectListSync({id,title}));
      return response.total;
    });
  };
};


/**
 * 删除课程分类数据
 */
const deleteSubjectListSync = (data) => ({
  type: DELETE_SUBJECT_LIST,
  data: data,
});

export const deleteSubjectList = (id) => {
  return (dispatch) => {
    return reqDelSubject(id).then((response) => {
      dispatch(deleteSubjectListSync(id));
      return response.total;
    });
  };
};

