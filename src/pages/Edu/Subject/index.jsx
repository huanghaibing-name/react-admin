import React, { Component } from "react";
import { Button,Table,Tooltip } from 'antd';
import { PlusOutlined ,FormOutlined, DeleteOutlined} from '@ant-design/icons';
import './index.less'
import {connect} from 'react-redux'
import {getSubjectList,getSecSubjectList} from './redux/actions'




const columns = [
  { title: '分类名称', dataIndex: 'title', key: 'name' },
 
  {
    title: '操作',
    dataIndex: '',
    key: 'action',
    render: () => (<>
      <Tooltip placement="top" title={'更新课程'}>
          <Button icon={<FormOutlined />} type='primary' style={{marginRight:20,width:40}}></Button>
      </Tooltip>
       
      <Tooltip placement="top" title={'删除课程'}>
          <Button icon={<DeleteOutlined />} type='danger' style={{width:40}}></Button>
      </Tooltip>
       
    </>),
    width:200,
  },
];

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

@connect(state =>({subjectList:state.subjectList}),{getSubjectList,getSecSubjectList})
 class Subject extends Component {

  // 定义默认当前页
  current = 1

  // 挂载时，发异步请求
  componentDidMount(){
    this.props.getSubjectList(1,5)
  }

  // 页码改变的回调
  handleChange = (page,pageSize)=>{
    // page:当前页 pageSize:每页数量
    // console.log(page,pageSize)
    this.props.getSubjectList(page,pageSize)

    this.current = page
  }

  // 每页数量改变的回调
  handleShowSizeChange = (current,size) =>{
     // current:当前页 size:每页数量
    // console.log(current,size)
    this.props.getSubjectList(current,size)

    this.current = current
  }

  // 可展开回调
  handleExpand = (expanded, record) => {
    if(expanded){
      //发送请求
      this.props.getSecSubjectList(record._id)
    }
  }

  render() {
    console.log(this.props)
    return <div className='subject'>
      <Button className='subject-btn' type="primary" icon={<PlusOutlined  />}>
        新建
      </Button>

      <Table
        columns={columns}
        expandable={{
          // expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          // rowExpandable: record => record.name !== 'Not Expandable',
          onExpand:this.handleExpand
        }}
        dataSource={this.props.subjectList.items}
        rowKey='_id'
        pagination={{
          // 数据总数
          total:this.props.subjectList.total,
          // 是否展示切换器
          showSizeChanger:true,
          // 指定每页可以显示多少条
          pageSizeOptions:['5','10','15'],
          // 是否可以快速跳转至某页
          showQuickJumper:true,
          // 默认每页数据数量
          defaultPageSize:5,
          // 页码改变的回调
          onChange:this.handleChange,
          // 每页数量改变的回调
          onShowSizeChange:this.handleShowSizeChange,
          // 当前页
          current:this.current
        }}
        
        
      />,
  </div>;
  }
}

export default Subject
