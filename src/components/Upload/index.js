import React, { Component } from 'react'
import {Button,Upload } from 'antd'
import {UploadOutlined} from '@ant-design/icons';
import {reqGetUploadToken} from '@api/edu/lesson'
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'

export default class MyUpload extends Component {

  // 定义状态
  state={
    isShow:true
  }

  constructor(){
    super()
    let jsonStr = localStorage.getItem('UPLOAD_TOKEN') 

    //如果有token
    if(jsonStr){
      // 本地存储
      this.uploadToken = JSON.parse(jsonStr)
      return
    }

    // 如果没有
    this.uploadToken = {}

  }

  // 上传之前回调
  handleBeforeUpload = (file,fileList) => {
    const MAX_SIZE = 10 * 1024 * 1024

    return new Promise( async (resolve,reject) =>{

      if(file.size > MAX_SIZE){
        console.log('视频太大')

        reject()
        
      }

      // 先判断本地有没有token,并且判断token是否过期 this.uploadToken.expires:截止时间
      if(this.uploadToken.expires && this.uploadToken.expires > Date.now()){

        console.log('有token,并且token未过期')
        return resolve()
      }

      let res = await reqGetUploadToken()

      console.log('没有token,发请求')

      
      // 存储token事件，加上有效期，减去发请求获取token浏览器拿到token的时间
      res.expires = Date.now() + res.expires * 1000 - 2 * 60 * 1000

      // 存储数据
      this.uploadToken = res

      localStorage.setItem('UPLOAD_TOKEN',JSON.stringify(res))

      resolve()

      
    })
  }

  customRequest = ({file,onProgress,onSuccess,onError}) => {
      // console.log(option)
    // console.log('自定义上传操作')

    const observer = {
      // 正在上传
      next(res){
        // 上传中会一直触发
        console.log("正在上传",res)
        onProgress({
          percent:res.total.percent
        })
      },
      error(err){
        // 上传错误
        console.log("上传错误",err)
        onError()
      },
      complete : res =>{
        // 上传成功
        console.log("上传成功",res)
        onSuccess()

        this.setState({
          isShow:false
        })

        this.props.onChange('http://qfejj73v2.hn-bkt.clouddn.com/' + res.key)
      }
    }

    // const file = option.file 
    const key = nanoid(10)
    const token = this.uploadToken.uploadToken
    const config = {
      region: qiniu.region.z2 //华南
    };
    // 文件限制
    const putExtra = {
      
      mimeType: "video/*",
     
    };

    const observable = qiniu.upload(file, key, token, putExtra, config)
    this.subscription = observable.subscribe(observer) // 上传开始
  }

  componentWillUnmount(){
    this.subscription && this.subscription.unsubscribe() // 上传取消
  }

  // 删除视频时触发
  handleRemove = () =>{
    this.props.onChange('')
    this.setState({
      isShow:true
    })
  }

  render() {
    return (
      <Upload
      beforeUpload={this.handleBeforeUpload}
      customRequest={this.customRequest}
      onRemove={this.handleRemove}
      // 表示在前端只能选择视频
      accept="video/*"
      >
        {this.state.isShow && <Button>
          <UploadOutlined /> Upload
        </Button>}
      </Upload>
    )
  }
}
