import React, { Component } from 'react'

import {Card,Radio } from 'antd'

import {
  Chart,
  registerShape,
  Geom,
  Axis,
  Tooltip,
  Interval,
  Interaction,
  Coordinate,
  Legend,
  Annotation
} from "bizcharts";

// 饼图数据
const data = [
  {
    type: "分类一",
    value: 20
  },
  {
    type: "分类二",
    value: 18
  },
  {
    type: "分类三",
    value: 32
  },
  {
    type: "分类四",
    value: 15
  },
  {
    type: "Other",
    value: 15
  }
];

// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
const sliceNumber = 0.01;

// 自定义 other 的图形，增加两条线
registerShape("interval", "sliceShape", {
  draw(cfg, container) {
    const points = cfg.points;
    let path = [];
    path.push(["M", points[0].x, points[0].y]);
    path.push(["L", points[1].x, points[1].y - sliceNumber]);
    path.push(["L", points[2].x, points[2].y - sliceNumber]);
    path.push(["L", points[3].x, points[3].y]);
    path.push("Z");
    path = this.parsePath(path);
    return container.addShape("path", {
      attrs: {
        fill: cfg.color,
        path: path
      }
    });
  }
});

export default class Static extends Component {

  // 要展示的数据
  state ={
    value:""
  }

  onChange = (e) =>{

    console.log(e.target.value)
  }

  intervalClick = e =>{
    // console.log(e)
    const value = e.data.data.value
    this.setState({
      value
    })
  }


  render() {
    return (
      <Card
       title="销售额占比"
      //  卡片右上角的操作区域
       extra={
         <>
            {/* defaultValue:高亮 */}
            <Radio.Group onChange={this.onChange} defaultValue="all">
              <Radio.Button value="all" style={{marginRight:5}}>全部渠道</Radio.Button>
              <Radio.Button value="line" style={{marginRight:5}}>线上</Radio.Button>
              <Radio.Button value="shop" style={{marginRight:5}}>门店</Radio.Button>
              <Radio.Button value="out" style={{marginRight:5}}>外贸</Radio.Button>
            </Radio.Group>
         </>
       }
      >
         {/* 
          data:图表中要用的数据
          height: 图表的高度(要有)
          autoFit: 自适应父容器 
          onIntervalClick: 点击饼图数据时触发. 可以接收一个事件对象(event). 通过event.data.data可以获取到对应的那条数据
         */}
       <Chart data={data} height={500} autoFit onIntervalClick={this.intervalClick}>

         {/* 
            Coordinate 坐标系配置
            type: 坐标系类型
            radius: 饼图半径 0~1
            innerRadius: 饼图内部空白半径 0~1
           */}
          <Coordinate type="theta" radius={0.8} innerRadius={0.75} />

          {/* 
            Axis坐标轴配置: 
            visible: 就是不展示坐标轴 
          */}
          <Axis visible={false} />

          {/* 
            Tooltip提示信息配置: 
            showTitle: 是否展示 tooltip 标题,
            在Tooltip子节点位置可以自定义样式
          */}
          <Tooltip showTitle={false} >
            {(title,items) =>{
              // title:触发的数据 items 这个数据所有信息
              console.log(title,items)
              const color =items[0].color

              return (
                <>
                  <div style={{padding:10}}>
                      {/* 圆点 */}
                      <span 
                      style={{
                        width:10,
                        height:10,
                        display:"inline-block",
                        borderRadius:"50%",
                        backgroundColor:color
                      }}
                      ></span>

                      {/* 内容 */}
                      <span style={{marginRight:10,marginLeft:10}}>
                        {title}：
                      </span>
                      <span>￥{items[0].value}</span>
                      
                  </div>
                </>
              )
            }}
          </Tooltip>
            {/* 
              绘制饼图的组件
              adjust: 几何标记对象的数据调整方式(不同的展示样式) 
              值: 'stack', 'dodge', 'jitter', 'symmetric'
              position: 根据数据中某个数字字段渲染
              color: 根据数据中某个字段控制颜色
              shape:将数据值映射到图形的形状上的方法
              值: 'rect'	默认矩形
                  'hollowRect'	空心的矩形
                  'line'	线段
                  'tick'	线段
                  'stroke'	带边框的矩形
                  'funnel'	漏斗图
                  'pyramid'	金字塔图
          */}
          <Interval
            adjust="stack"
            position="value"
            color="type"
            shape="sliceShape"
          />

           {/* 图例配置(饼图右侧的列表): position:表示位置*/}
          <Legend position='right' />

          {/* 图形标注(饼图内的展示内容)
            position: 标注的位置 [水平, 垂直]
            content: 标注的内容
          */}
          <Annotation.Text
            position={['50%', '45%']}
            content='销售量'
            style={{
              lineHeight: '240px',
              fontSize: '30',
              fill: '#f00', //颜色
              textAlign: 'center'
            }}
          />

          <Annotation.Text 
          position={['50%', '55%']}
          content={this.state.value}
          style={{
            lineHeight: '240px',
            fontSize: '30',
            fill: '#262626', //颜色
            textAlign: 'center'
          }}
          />
          <Interaction type="element-single-selected" />
        </Chart>
      </Card>
    )
  }
}
