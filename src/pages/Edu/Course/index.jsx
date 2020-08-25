import React, { Component } from "react";
import { Button, message, Table, Tooltip, Modal } from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
  FullscreenOutlined,
  // FullscreenExitOutlined,
  RedoOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";
// import { getCourseList } from "./redux";

// import { filterPermissions } from "@utils/permission";
import "./index.less";


 // 引入FormattedMessage
 import {FormattedMessage,useIntl} from 'react-intl'
@connect(
  (state) => ({
    courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
  })
  // { getcourseList }
)
class Course extends Component {
  state = {
    searchLoading: false,
    tableLoading: false,
    page: 1, // 页数
    limit: 5, // 每页显示条数
    previewVisible: false,
    previewImage: "",
  };

  search = (searchName) => {
    this.setState({
      searchLoading: true,
    });

    const { page, limit } = this.state;

    this.getcourseList({ Coursename: searchName, page, limit }).finally(() => {
      this.setState({
        searchLoading: false,
      });
    });
  };

  renderTableItem = () => {
    // const { permissionValueList } = this.props;

    return (
      <div>
        <Tooltip title="发布课程">
          <Button type="primary">
            <UploadOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="更新课程">
          <Button type="primary" className="acl-edit-btn">
            <FormOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="删除课程">
          <Button type="danger">
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </div>
    );
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

  columns = [
    {
      title: <FormattedMessage id="number"></FormattedMessage>,
      dataIndex: "index",
      width: 90,
    },
    {
      title: <FormattedMessage id="courseTitle"></FormattedMessage>,
      dataIndex: "title",
      ellipsis: true,
      width: 200,
    },
    {
      title: <FormattedMessage id="courseDescribe"></FormattedMessage>,
      dataIndex: "description",
      ellipsis: true,
      width: 300,
    },
    {
      title: <FormattedMessage id="courseImages"></FormattedMessage>,
      dataIndex: "cover",
      width: 120,
      render: (img) => (
        <img
          onClick={this.showImgModal(img)}
          style={{ width: 50, height: 40, cursor: "pointer" }}
          src={img}
          alt="课程图片"
        />
      ),
    },
    {
      title: <FormattedMessage id="coursePrice"></FormattedMessage>,
      dataIndex: "price",
      render: (text) => <span>{`￥ ${text}`}</span>,
      width: 120,
      sorter: {
        compare: (a, b) => b.price - a.price,
      },
      // sorter: true // 后台排序~
    },
    {
      title: <FormattedMessage id="courseTeacher"></FormattedMessage>,
      dataIndex: "teacherId",
      width: 120,
    },
    {
      title: <FormattedMessage id="belongTOSort"></FormattedMessage>,
      dataIndex: "subjectParentId",
      width: 150,
    },
    {
      title: "总课时",
      dataIndex: "lessonNum",
      width: 100,
      render: (text) => <span>{`${text} 小时`}</span>,
    },
    {
      title: "总阅读量",
      dataIndex: "viewCount",
      width: 100,
      render: (text) => <span>{`${text} 次`}</span>,
    },
    {
      title: "总购买量",
      dataIndex: "buyCount",
      width: 100,
      render: (text) => <span>{`${text} 个`}</span>,
    },
    {
      title: "最新修改时间",
      dataIndex: "gmtModified",
      width: 200,
    },
    {
      title: "课程状态",
      dataIndex: "status",
      width: 100,
    },
    {
      title: "版本号",
      dataIndex: "version",
      width: 100,
    },
    {
      title: <FormattedMessage id="operate"></FormattedMessage>,
      render: this.renderTableItem,
      width: 200,
      fixed: "right",
    },
  ];

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



  render() {
    console.log(this.props)
    const {
      page,
      limit,
      tableLoading,
      previewVisible,
      previewImage,
    } = this.state;

     // // 解决序号不显示问题
     let courseList = [...this.props.courseList]
     courseList = courseList.map((item,index)=>{ 
       return{
         ...item,
         index:index+1
       }})

    const total = courseList.length;

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>

        <div className="course-table">
          <div className="course-table-header">
            <h3> <FormattedMessage id="courseDataList"></FormattedMessage></h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新建</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn">
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
          <Table
            columns={this.columns}
            dataSource={courseList}
            rowKey="_id"
            pagination={{
              current: page,
              pageSize: limit,
              pageSizeOptions: ["5", "10", "20", "30", "40", "50", "100"],
              showQuickJumper: true,
              showSizeChanger: true,
              total,
              onChange: this.handleTableChange,
              onShowSizeChange: this.handleTableChange,
            }}
            loading={tableLoading}
            scroll={{ x: 1200 }}
          />
        </div>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Course;
