import React, { Component } from 'react'
import {Tabs } from 'antd'
import { 
  RingProgressChart,
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util 
} from 'bizcharts';

const {TabPane} = Tabs

const data = [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 7
  },
  {
    month: "Jan",
    city: "London",
    temperature: 3.9
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 6.9
  },
  {
    month: "Feb",
    city: "London",
    temperature: 4.2
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 9.5
  },
  {
    month: "Mar",
    city: "London",
    temperature: 5.7
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 14.5
  },
  {
    month: "Apr",
    city: "London",
    temperature: 8.5
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 18.4
  },
  {
    month: "May",
    city: "London",
    temperature: 11.9
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 21.5
  },
  {
    month: "Jun",
    city: "London",
    temperature: 15.2
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 25.2
  },
  {
    month: "Jul",
    city: "London",
    temperature: 17
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 26.5
  },
  {
    month: "Aug",
    city: "London",
    temperature: 16.6
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 23.3
  },
  {
    month: "Sep",
    city: "London",
    temperature: 14.2
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 18.3
  },
  {
    month: "Oct",
    city: "London",
    temperature: 10.3
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 13.9
  },
  {
    month: "Nov",
    city: "London",
    temperature: 6.6
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 9.6
  },
  {
    month: "Dec",
    city: "London",
    temperature: 4.8
  }
];
const cols = {
  month: {
    range: [0, 0.8]
  }
};

export default class Search extends Component {
  render() {
    return (
      <>
          <Tabs defaultActiveKey='0' tabPosition={'top'} style={{ height: 800 }}>
          {[...Array(30).keys()].map(i => (
            <TabPane tab={
              <>
                <div>store-{i}</div>
                <RingProgressChart
                width={30}
                height={30}
                percent={Math.random()}
                />
              </>
              } 
              key={i} 
              disabled={i === 28}
              >
                <Chart height={400} data={data} scale={cols} autoFit>
                  <Legend/>
                  <Axis name="month"/>
                  <Axis
                    name="temperature"
                    label={{
                      formatter: val => `${val}°C`
                    }}
                  />
                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                   
                  >
                  {
                    (title, items) => {
                      // 配置了 class="g2-tooltip-list" 则会将模版中的内容渲染进来
                      // 您也可以根据 items 自行渲染
                      return (<table>
                        <thead>
                          <tr>
                            <th>&nbsp;</th>
                            <th>名称</th>
                            <th>值</th>
                          </tr>
                        </thead>
                          <tbody
                            className="g2-tooltip-list"
                          >
                        </tbody>
                        </table>);
                    }
                  }
                  </Tooltip>
                  <Geom
                    type="line"
                    position="month*temperature"
                    size={2}
                    color={"city"}
                    shape={"smooth"}
                  />
                  <Geom
                    type="point"
                    position="month*temperature"
                    size={4}
                    shape={"circle"}
                    color={"city"}
                    style={{
                      stroke: "#fff",
                      lineWidth: 1
                    }}
                  />
                </Chart>
            </TabPane>
          ))}

          
          </Tabs>

      </>
    )
  }
}
