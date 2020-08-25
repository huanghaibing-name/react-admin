import React, { Component } from 'react'

// 引入栅格系统
import {Row,Col,Statistic,Progress} from 'antd'
import {CaretUpOutlined,CaretDownOutlined} from '@ant-design/icons';
import Card from '@comps/Card'

import './index.less'

import { AreaChart,ColumnChart } from 'bizcharts';

const RowSpan ={
    xs:{span:24},
    md:{span:12},
    lg:{span:6},
}

// 面积图数据源
const areaChartData = [
  { year: '1991', value: 3 },
  { year: '1992', value: 5 },
  { year: '1993', value: 6 },
  { year: '1994', value: 5 },
  { year: '1995', value: 7 },
  { year: '1996', value: 6 },
  { year: '1997', value: 10 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

// 柱状图数据源
const columnChartData = [
	{
		type: '家具家电',
		sales: 38,
	},
	{
		type: '粮油副食',
		sales: 52,
	},
	{
		type: '生鲜水果',
		sales: 61,
	},
	{
		type: '美容洗护',
		sales: 145,
	},
	{
		type: '母婴用品',
		sales: 48,
	},
	{
		type: '进口食品',
		sales: 38,
	},
	{
		type: '食品饮料',
		sales: 38,
	},
	{
		type: '家庭清洁',
		sales: 38,
	},
];



export default class Analysis extends Component {
  render() {
    return (
      <Row
        gutter={[16,16]}
      >
        {/* <Col span={6} className="col">1</Col>
        <Col span={6} className="col">2</Col>
        <Col span={6} className="col">3</Col>
        <Col span={6} className="col">4</Col> */}

        <Col {...RowSpan}>
      <Card title={ <Statistic title="总销售额" prefix="￥" value={112893} ></Statistic>} footer={<span>日销售额 ￥12,423</span>}>
           <span>周同比12% <CaretUpOutlined style={{marginRight:5,color:"red"}} /></span>
           <span>日同比10% <CaretDownOutlined style={{color:"#1DA57A"}}/></span>
          </Card>
        </Col>

        <Col {...RowSpan}>
          <Card title={ <Statistic title="访问量"  value={22222} ></Statistic>} footer={<span>日销售额 ￥12,423</span>}>
          <AreaChart
                data={areaChartData}
                title={{
                  visible: false,
                  
                }}
                xField='year'
                yField='value'
                // 自适应宽高
                forceFit={true}
                // 去除内边距
                padding="0"
                // 去除坐标系
                xAxis={{
                  visible:false
                }}
                yAxis={{
                  visible:false
                }}

                 meta={{
                  type: {
                    alias: '类别',
                  },
                  sales: {
                    alias: '销售额(万)',
                  },
                }}

                // 曲线
                smooth={true}
                // 颜色
                color='pink'
              />
          </Card>
        </Col>
        <Col {...RowSpan}>
          <Card title={ <Statistic title="支付笔数"  value={33333} ></Statistic>} footer={<span>转化率 60%</span>}>

              <ColumnChart
                data={columnChartData}
                title={{
                  visible: false,
                  
                }}
                forceFit={true}
                padding='0'
                xField='type'
                yField='sales'
                meta={{
                  type: {
                    alias: '类别',
                  },
                  sales: {
                    alias: '销售额(万)',
                  },
                }}
                // 去除坐标系
                xAxis={{
                  visible:false
                }}
                yAxis={{
                  visible:false
                }}
              />
          </Card>
        </Col>
        <Col {...RowSpan}>
        <Card title={ <Statistic title="运营结果"  value={44444} ></Statistic>} footer={<span>转化率 80.9%</span>}>

          <Progress percent={80.9} strokeColor={{"0%":'#108ee9',"20%":"#1DA57A","50%":"#87d068","80%":'yellow',"100%":"pink"}} status='active'></Progress>
        </Card>
        </Col>
      </Row>
    )
  }
}
