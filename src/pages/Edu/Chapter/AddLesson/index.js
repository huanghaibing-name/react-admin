import React, { Component } from 'react'
import {Card,Form,Input,Button,Select,Divider,message,Switch,Upload } from 'antd'
import {Link} from 'react-router-dom'
import {ArrowLeftOutlined,UploadOutlined} from '@ant-design/icons';
import MyUpload from '@comps/Upload'
import {addLesson} from '@api/edu/lesson'

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


export default class Addlesson extends Component {

 
// 新增课时的方法
onFinish = async values => {
  // console.log(values)
  let {title,free,video} = values

  // console.log(this.props.location)
  let data = {
    chapterId:this.props.location.state._id,
    title,
    free,
    video
  }
  await addLesson(data)

  message.success('新增课时成功')

  this.props.history.push('/edu/chapter/list')
}
 


  render() {
    return (
      <Card  title={
        <>
        {/* 头部 */}
          <Link to='/edu/subject/chapter' style={{marginRight:20}}>
            <ArrowLeftOutlined />
          </Link>
          <span className='title'>新增课时</span>
        </>
      }>
       
       {/* 主体 */}
       <Form
        {...layout}
        name='lesson'
        initialValues={{
          free:true
        }}

        onFinish={this.onFinish}
      >
        <Form.Item
          label='课时名称:'
          name='title'
          rules={[
            {
              required: true,
              message: '请输入课时名称!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
        valuePropName="checked"
          label='是否免费:'
          name='free'
          rules={[
            {
              required: true,
              message: '请选择是否免费'
            }
          ]}
        >
              <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </Form.Item>

        <Form.Item
          label='上传视频:'
          name='video'
          rules={[
            {
              required: true,
              message: '请选择要上传的视频'
            }
          ]}
        >
         <MyUpload></MyUpload>
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
