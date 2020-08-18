import React, { Component } from 'react'
import {Card,Form,Input,Button,Select,Divider,message} from 'antd'
import {Link} from 'react-router-dom'
import {ArrowLeftOutlined} from '@ant-design/icons';

import {reqGetSubject} from '@api/edu/subject'
import {reqAddSubjectList} from '@api/edu/subject'

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

export default class AddSubject extends Component {

  // 定义state数据
  state = {
    total:0,
    items:[]
  }

  // 默认第一页
  page = 1

  // 挂载时发请求获取数据
  async componentDidMount(){

    const result = await reqGetSubject(this.page++,10)

    this.setState(result)
  }

  
  // 点击加载更多回调
  handleGetSubject = async ()=>{
    const result = await reqGetSubject(this.page++,10)

    // 拼接数据
    const newItems =  [...this.state.items,...result.items] 

    this.setState({
      items:newItems
    })
  }


  // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = async values =>{
    // console.log(values)
     await reqAddSubjectList(values.subjectname,values.parentid)
     message.success('新增课程成功，自定跳转课程分类页');
     console.log(111)
     this.props.history.push('/edu/subject/list')
  }



  render() {
    return (
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
                      {this.state.total <= this.state.items.length ? <div style={{ marginLeft: 12,color: '#1DA57A' }}>没有更多数据啦</div> : <Button type='link' onClick={this.handleGetSubject} >点击加载更多</Button>}
                    </div>
                  )
                }
              }
          >
              <Option  value={0} key={0}>
                {'一级分类'}
              </Option>
              {this.state.items.map(item =><Option  value={item._id} key={item._id}>{item.title}</Option>)}
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
}
