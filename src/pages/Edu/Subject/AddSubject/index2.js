import React, { Component } from 'react'
import {Card,Form,Input,Button,Select,Divider,message} from 'antd'
import {Link} from 'react-router-dom'
import {ArrowLeftOutlined} from '@ant-design/icons';

import {reqGetSubject} from '@api/edu/subject'
import {reqAddSubjectList} from '@api/edu/subject'

import {useState,useEffect} from 'react'

//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol:{
    span:3
  },
  // 表单项部分
  wrapperCol:{
    span:6
  }
}

// 获取Option组件
const Option = Select.Option

const data = [
  {
    key: 1,
    name: '前端课程',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: '大数据课程',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Java课程',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'C语言课程',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];



export default function AddSubject() {

  // 默认第一页
  page = 1

  total = 0

  items = []

  const [subjectList, setSubjectList] = useState([])

  useEffect(()=>{

    const result = await reqGetSubject(this.page++,10)
    this.total = result.total
    this.items = result.items
  },[])

  // 点击加载更多回调
  handleGetSubject = async ()=>{
    const result = await reqGetSubject(this.page++,10)

    // 拼接数据
    const newItems =  [...this.items,...result.items] 

    this.setState({
      items:newItems
    })
  }

  // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = async values =>{
    // console.log(values)
     await reqAddSubjectList(values.subjectname,values.parentid)
     message.success('新增课程成功，自定跳转课程分类页');
    //  console.log(111)
     this.props.history.push('/edu/subject/list')
  }

  return  (
    <Card  title={
      <>
      {/* 头部 */}
        <Link to='/edu/subject/list' style={{marginRight:20}}>
          <ArrowLeftOutlined />
        </Link>
        <span className='title'>新增课程</span>
      </>
    }>
     
     {/* 主体 */}
     <Form
      {...layout}
      name='subject'
      onFinish = {this.onFinish}
    >
      <Form.Item
        label='课程分类名称:'
        name='subjectname'
        rules={[
          {
            required: true,
            message: '请输入课程分类!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='父级分类ID:'
        name='parentid'
        rules={[
          {
            required: true,
            message: '请选择分类id'
          }
        ]}
      >
        <Select
            dropdownRender={
              menu =>{
                
                return (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    {this.total <= this.items.length ? <div style={{ marginLeft: 12,color: '#1DA57A' }}>没有更多数据啦</div> : <Button type='link' onClick={this.handleGetSubject} >点击加载更多</Button>}
                  </div>
                )
              }
            }
        >
            <Option  value={0} key={0}>
              {'一级分类'}
            </Option>
            {this.items.map(item =><Option  value={item._id} key={item._id}>{item.title}</Option>)}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Card>
  )
}
