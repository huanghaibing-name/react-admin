import React, { Component } from "react";
import { Button, message, Tooltip, Modal, Alert, Table } from "antd";
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";

import "./index.less";
import {getLessonList,batchRemoveChapterList,batchRemoveLessonList} from '@pages/Edu/Chapter/redux'
//1、安装 2、导入知乎视频播放
import Player from 'griffith'
//2. 导入
import screenfull from 'screenfull'


dayjs.extend(relativeTime);

@connect(
  (state) => ({
   
    chapterList:state.chapterList.chapterList
   
  }),
  { getLessonList,batchRemoveChapterList,batchRemoveLessonList }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [],
    play_url:"",
  };

  showImgModal = (img) => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img,
      });
    };
  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  // 发请求获取章节
  handleLesson = (expand,record)=>{
    // console.log(expand,record)

    if(expand){
      this.props.getLessonList(record._id)
    }
    
   }


  //  跳转到新增课时页面的回调
  handleGoAddLesson = data => () =>{

    this.props.history.push('/edu/chapter/addlesson',data)
  }

  // 预览视频
  handlePreviewVideo = record => () =>{
    console.log(record)
    this.setState({
      previewVisible: true,
      play_url:record.video
    })
  }

  // 批量删除回调
  handleBatchRemove = async () =>{

    // 1、拿到所有章节数据并遍历
    //获取章节id
    const chapterIdList = []
    this.props.chapterList.forEach(item =>{

      if(this.state.selectedRowKeys.indexOf(item._id) > -1){

        chapterIdList.push(item._id)
      }
    })

    // 获取课时id
    // const lessonIdList = []
    // this.state.selectedRowKeys.forEach(item =>{

    //   if(chapterIdList.indexOf(item) === -1){

    //     lessonIdList.push(item)
    //   }
    // })
    const lessonIdList = this.state.selectedRowKeys.filter(item => chapterIdList.indexOf(item) === -1)
    
    // console.log('章节id',chapterIdList)
    // console.log('课时id',lessonIdList)

      await this.props.batchRemoveChapterList(chapterIdList)
      await this.props.batchRemoveLessonList(lessonIdList)

      message.success('删除成功')
  }


  // 全屏显示
  handleScreenfull = ()=> {
    // screenfull.request()
    screenfull.toggle() // 点击全屏按钮,可以展开也可以关闭
  }


  render() {
    // console.log(this.props)
    const { previewVisible, previewImage, selectedRowKeys } = this.state;

    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
        
      },
      {
        title: "是否免费",
        dataIndex: "free",
        render: (isFree) => {
          return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },
      {
        title: "视频",
        // dataIndex: "free",
        render: (record) => {
          return (record.free && <Button onClick={this.handlePreviewVideo(record)}>预览</Button>)
        },
      },
      {
        title: "操作",
        width: 210,
        fixed: "right",
        render: (data) => {
        
            return (
              <div>
                <Tooltip title="新增课时">
                  <Button type="primary" onClick={this.handleGoAddLesson(data)}>
                    <PlusOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="查看详情">
                  <Button type="primary" style={{ margin: "0 10px" }}>
                    <FormOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="删除章节">
                  <Button type="danger">
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </div>
            );
          }
        },
      
    ];

    const data = [
      {
        id: "111",
        title: "第一章节",
        children: [
          {
            id: "1",
            title: "第一课时",
            free: false,
            videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
          },
          {
            id: "2",
            title: "第二课时",
            free: true,
            videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
          },
          {
            id: "3",
            title: "第三课时",
            free: true,
            videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
          },
        ],
      },
      {
        id: "222",
        title: "第二章节",
        children: [
          {
            id: "4",
            title: "第一课时",
            free: false,
            videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
          },
          {
            id: "5",
            title: "第二课时",
            free: true,
            videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
          },
          {
            id: "6",
            title: "第三课时",
            free: true,
            videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
          },
        ],
      },
      {
        id: "333",
        title: "第三章节",
        children: [
          {
            id: "1192252824606289921",
            title: "第一课时",
            free: false,
            videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
          },
          {
            id: "1192628092797730818",
            title: "第二课时",
            free: true,
            videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
          },
          {
            id: "1192632495013380097",
            title: "第三课时",
            free: true,
            videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
          },
        ],
      },
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
    };

    // 3、定义source,为了视频播放
  const sources = {
    hd: {
      // play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
      play_url:this.state.play_url,
      bitrate: 1,
      duration: 1000,
      format: '',
      height: 500,
      size: 160000,
      width: 500
    },
  
  }


 
    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type="danger" style={{ marginRight: 10 }} onClick={this.handleBatchRemove}>
                <span>批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn" onClick={this.handleScreenfull}>
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            expandable={{
             onExpand:this.handleLesson
            }}
            columns={columns}
            dataSource={this.props.chapterList}
            rowKey="_id"
          />
        </div>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
          // 解决取消按钮挡住问题
          title='预览课时视频'
          // 解决视频关掉还在播放问题
          destroyOnClose={true}
          width={500}
        >
         {/* 4、使用player组件 */}
         <Player 
         sources={sources} 
         // 解决id报错问题 id必须是字符串
         id={'1'}
        //  解决cove报错问题
        cover={'http://localhost:3000/logo512.png'}
        // 解决duration报错问题
        duration={1000}
      
         />
        </Modal>
      </div>
    );
  }
}

export default Chapter;
