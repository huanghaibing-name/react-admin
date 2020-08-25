import React, { useState,useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";
import {reqGetAllSubjectList,reqGetAllSecSubjectList} from '@api/edu/subject'
import {reqGetAllTeacherList} from '@api/edu/teacher'

import "./index.less";
import {connect} from 'react-redux'
import {getAllCourseList} from '@pages/Edu/Course/redux'

 // 引入FormattedMessage
 import {FormattedMessage,useIntl} from 'react-intl'


const { Option } = Select;

function SearchForm(props) {

    // 定义useState
    const [subjectList,setSubjectList] = useState([])
    const [teachertList,setTeacherList] = useState([])
    const [options,setOptions] = useState([])

    // 调用 useIntl 得到一个intl对象
    const intl = useIntl()
  
  // 页面挂载时，发请求获取数据
  useEffect( ()=>{

    async function fetchData(){

      // await reqGetAllSubjectList()
      // await reqGetAllTeacherList()

      const [subject,teacher] = await Promise.all([reqGetAllSubjectList(),reqGetAllTeacherList()])

      setSubjectList(subject)
      setTeacherList(teacher)

      const optionList = subject.map(item =>{
        return{
          value: item._id,
          label: item.title,
          // false 代表有子数据 true代表没有
          isLeaf: false,
        }
      })

      setOptions(optionList)
    }

    fetchData()
    
  },[])


  const [form] = Form.useForm();

  // const [options, setOptions] = useState([
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     isLeaf: false
  //   },
  //   {
  //     value: "jiangsu",
  //     label: "Jiangsu",
  //     isLeaf: false
  //   }
  // ]);

  // const options = [
  //   {
  //     value: 'zhejiang',
  //     label: 'Zhejiang',
  //     isLeaf: false,
  //   },
  // ];

 

  const onChange = async (value, selectedOptions) => {
    console.log(value, selectedOptions);
    
   
  };

  const loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    // 展示加载效果
    targetOption.loading = true;

      // 发请求获取数据
      const res = await reqGetAllSecSubjectList(targetOption.value)
      // console.log(res)
      if(res.items.length){
        // 说明有数据
        targetOption.loading = false;
        // 添加children属性
        targetOption.children = res.items.map(item =>{

          return {
            value:item._id,
            label:item.title
          }
        })
      }else{

        // 没有数据
        targetOption.loading = true;
      }

      // 让视图重新渲染
      setOptions([...options])
    
  };

  const resetForm = () => {
    form.resetFields();
  };


  // onFinish 事件
  const onFinish = async () =>{
     await props.getAllCourseList()
      console.log(props)
  }

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="title" label={<FormattedMessage id='title'/>}>
        <Input placeholder={intl.formatMessage({
             id: 'courseTitle'
            })}
        style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id='teacher'></FormattedMessage>}>
        <Select
          allowClear
          placeholder={
            intl.formatMessage({
              id:"courseTeacher"
            })
          }
          style={{ width: 250, marginRight: 20 }}
        >
          {/* <Option value="lucy1">Lucy1</Option>
          <Option value="lucy2">Lucy2</Option>
          <Option value="lucy3">Lucy3</Option> */}

          {teachertList.map(item =>(
            <Option value={item._id} key={item._id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id="sort"></FormattedMessage>}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder={intl.formatMessage({
            id:"courseSort"
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          {<FormattedMessage id="query"></FormattedMessage>}
        </Button>
        <Button onClick={resetForm}>
          {<FormattedMessage id="reset"></FormattedMessage>}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null,{getAllCourseList,})(SearchForm);
