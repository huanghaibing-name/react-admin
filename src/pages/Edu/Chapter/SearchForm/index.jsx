import React ,{useState,useEffect}from "react";
import { Form, Select, Button } from "antd";

import "./index.less";

import {connect} from "react-redux"
import {getCourseList,getChapterList} from "@pages/Edu/Chapter/redux"
const { Option } = Select;

function SearchForm(props) {
  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
  };

  // 挂载时获取数据
  useEffect(() =>{
     
      props.getCourseList()
  },[])

  // onFinish回调函数
  const onFinish = (values) =>{
    // console.log(values)
      props.getChapterList(values.courseId)
  }
// console.log(props)
  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="courseId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {/* <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option> */}
          {props.courseList.map(item => (
            <Option value={item._id} key={item._id}>{item.title}</Option> 
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
         
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}


export default connect(state=>({courseList:state.chapterList.courseList}),{getCourseList,getChapterList})(SearchForm);
