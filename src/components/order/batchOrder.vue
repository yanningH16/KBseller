<template>
  <div class="wrapBg">
    <div class="bg">
      <div class="title">
        <h2>批量发货</h2>
        <p>收费标准:{{ userInfo.price }}元/单</p>
      </div>
      <ul>
        <li>
          <span>快递公司</span>
          <el-select v-model="postCompant" placeholder="请选择">
            <el-option label="圆通" value="1">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>发货店铺</span>
          <el-select v-model="postShop" @change="getPostAddress" value-key="sellerShopId" placeholder="请选择">
            <el-option v-for="(item,index) in shopListArr" :key="index" :label="item.shopTypeName + '-' + item.shopName" :value="item">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>发货地址</span>
          <el-select v-model="postAddress" value-key="id" placeholder="请选择">
            <el-option v-for="(item,index) in postAddressArr" :key="index" :label="(item.senderName || '--') + ' ' + (item.senderPhone || '--') + ' ' + (item.province||'')+(item.city||'')+(item.region || '')+(item.address||'')" :value="item">
            </el-option>
          </el-select>
        </li>
        <li class="radio">
          <el-radio v-model="postOrderType" @change="testCanCreatTask" label="1">批量下单(表格)</el-radio>
          <el-radio v-model="postOrderType" @change="testCanCreatTask" label="2">手工单条下单</el-radio>
        </li>
        <!-- 批量发货 -->
        <li class="text" v-if="postOrderType==1">
          <em>上传订单信息</em>
          <span>1、支持淘宝、京东、天猫、拼多多导出的订单直接上传，点击
            <i>查看帮助</i>
          </span>
          <p>2、支持自定义模板上传数据：
            <i style="cursor:pointer;" @click="downModel">下载模板</i>
          </p>
          <p>3、单次上次最多上传500条记录</p>
          <!-- :accept="accept" -->
          <!-- :http-request="httpUpload" -->
          <el-upload :accept="['.xlsx','.xls']" :before-upload="getFileName" :on-success="uploadSuccess" :show-file-list="false" action="" :data="uploadParams" :headers="headers">
            <button v-if="!uploadSuccessObj.isSuccess" class="btn" :class="{'disabled': canUpload}" :disabled="canUpload">上传文件</button>
            <button v-if="uploadSuccessObj.isSuccess" class="btn" :class="{'disabled': canUpload}" :disabled="canUpload" style="background:#ededed;color:#9b9b9b;">重新上传</button>
          </el-upload>
          <p class="prompt" :class="{ 'short': uploadSuccessObj.totalNum==uploadSuccessObj.realNum }" v-if="uploadSuccessObj.isSuccess">
            总共
            <span class="red">{{ uploadSuccessObj.totalNum }}</span>条订单， 上传成功
            <span class="red">{{ uploadSuccessObj.realNum }}</span>条， 上传失败
            <span class="red">{{ uploadSuccessObj.totalNum-uploadSuccessObj.realNum }}</span>条, 共
            <span class="red">{{ uploadSuccessObj.data ? uploadSuccessObj.data.length : 0 }}</span>条SKU
          </p>
          <button v-if="uploadSuccessObj.totalNum!=uploadSuccessObj.realNum" class="btn" @click="downFail" style="margin-left:20px;">下载失败列表</button>
        </li>
        <!-- 手工发货 -->
        <li class="hand" v-if="postOrderType==2">
          <strong style="display:inline-block;width:100px;">收件地址</strong>
          <p style="font-size:12px;color:#ff3341;padding-bottom:10px;display:inline-block;">地址示例：浙江省 杭州市 萧山区 东三路海神苑K幢678（必须包含省市区信息，省市区一定要以
            <em style="font-weight:bolder;font-size:16px;">空格隔开</em>）</p>
          <p class="info" v-for="(item,index) in inputArr" :key="index">
            <input type="text" v-model="item.thirdOrder" placeholder="订单编号">
            <input type="text" v-model="item.reciverName" placeholder="姓名">
            <input type="number" v-model="item.telephone" placeholder="手机号">
            <!-- <br v-if="postShop.shopType==4" />
            <input v-if="postShop.shopType==4" type="text" v-model="item.province" placeholder="省">
            <input v-if="postShop.shopType==4" type="text" v-model="item.city" placeholder="市">
            <input v-if="postShop.shopType==4" type="text" v-model="item.region" placeholder="区"> -->
            <input type="text" v-model="item.address" class="first" placeholder="地址">
            <span @click="dele(index)" style="cursor:pointer;" class="el-icon-delete">删除</span>
          </p>
          <p class="go" @click="add">+继续添加</p>
        </li>
        <li class="handText" v-if="postOrderType==2">
          <p class="kg">
            物品重量
            <el-input v-model="handObj.minWeight" @blur="remberHistory(1, handObj.minWeight)" style="width:75px;" type="number" placeholder="请输入内容"></el-input>&nbsp; kg&nbsp;&nbsp;- &nbsp;&nbsp;
            <el-input v-model="handObj.maxWeight" @blur="remberHistory(2, handObj.maxWeight)" style="width:75px;" type="number" placeholder="请输入内容"></el-input>&nbsp;&nbsp;kg
          </p>
          <p class="text">系统自动会给每个订单在您设置范围内随机生成一个重量，如需固定重要，则填写一致即可</p>
          <p class="text">最小重量不能低于
            <em>0.05KG</em>最大重量不能高于
            <em>40KG</em>
          </p>
        </li>
        <li class="weight" v-if="postOrderType==1">
          <p>1、包裹重量随机生成，范围在最小和最大重量之间，如果不需要随机把最大和最小重量值设置成一样即可</p>
          <p>2、最小重量不能低于
            <em>0.05KG</em>最大重量不能高于
            <em>40KG</em>
          </p>
        </li>
        <!-- 上传CSV成功后显示 -->
        <li class="forList" v-if="uploadSuccessObj.isSuccess && postOrderType==1">
          <div v-show="!cantCreatTask" v-for="(item, index) in uploadSuccessObj.data" :key="index">
            <p style="margin: 10px 0; font-weight: bolder;font-size:16px;">{{ index+1 }}.商品名称:
              <span style="color: rgb(13,188,121)">{{ item.productName }}</span>
            </p>
            <p style="margin-bottom:40px;font-size:14px;">
              物品重量
              <el-input v-model="item.minWeight" style="width:75px;" type="number" placeholder="请输入内容"></el-input>&nbsp; kg&nbsp;&nbsp;- &nbsp;&nbsp;
              <el-input v-model="item.maxWeight" style="width:75px;" type="number" placeholder="请输入内容"></el-input>&nbsp;&nbsp;kg
            </p>
          </div>
        </li>
        <li class="creatTask">
          <button v-show="isPosting" class="btn" :class="{ 'disabled': cantCreatTask }" :disabled="cantCreatTask" @click="sureToBuildTask">创建任务</button>
          <button v-show="!isPosting" class="btn">
            <i class="el-icon-loading"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
let socket
/* global io */
/* eslint no-undef: "error" */
export default {
  name: 'batchOrder',
  data () {
    return {
      isPosting: true,
      uploadFileName: '',
      oldFileName: '',
      filePostfix: '', // 文件上传成功后的格式
      uploadUrls: '',
      uploadSuccessObj: {
        isSuccess: false,
        data: ''
      },
      cantCreatTask: true,
      isCanPostCreat: false,
      postCompant: '1',
      postShop: '',
      shopListArr: [],
      postAddress: '',
      postAddressArr: [],
      postOrderType: '1',
      inputArr: [{
        thirdOrder: '',
        reciverName: '',
        // province: '',
        // city: '',
        // region: '',
        address: '',
        telephone: ''
      }],
      handObj: {
        minWeight: '',
        maxWeight: ''
      }
    }
  },
  computed: {
    uploadParams: function (val) {
      let obj = {}
      if (this.oldFileName) {
        obj = {
          oldFileName: this.oldFileName,
          shopType: this.postShop.shopType
        }
      } else {
        obj = {
          oldFileName: '',
          shopType: this.postShop.shopType
        }
      }
      return obj
    },
    headers () {
      return {
        accesstoken: this.userToken,
        userAccountId: this.userInfo.sellerAccountId
      }
    },
    canUpload () { // 是否可以上传文件
      if (this.postCompant === '' || this.postShop === '' || this.postAddress === '') {
        return true
      } else {
        return false
      }
    },
    ...mapGetters([
      'userInfo',
      'userToken'
    ])
  },
  methods: {
    sockets () {
      socket = io.connect('http://10.0.0.9:8089')
      // socket.on('connect', () => {
      //   socket.emit('test', '123')
      //   console.log('connected')
      // })
      // socket.on('my-websocket', () => {
      //   socket.emit('socket', '123')
      //   console.log('my-websocket')
      // })
      socket.on('/topic/send', () => {
        console.log(1111)
      })
    },
    add () {
      this.inputArr.push({
        thirdOrder: '',
        reciverName: '',
        // province: '',
        // city: '',
        // region: '',
        address: '',
        telephone: ''
      })
    },
    dele (index) {
      this.inputArr.splice(index, 1)
    },
    // 下载模板
    downModel () {
      // let model = require('../../assets/model/上传模板.zip')
      window.open('../../../static/上传模板.zip')
    },
    uploadUrl () {
      let url = ''
      let reg1 = /(\.csv)$/g
      let reg2 = /(\.xlsx)$/g
      let reg3 = /(\.xls)$/g
      console.log(this.uploadFileName)
      if (reg1.test(this.uploadFileName)) {
        console.log('csv')
        url = '/api/task/uploadFile'
      } else if (reg2.test(this.uploadFileName) || reg3.test(this.uploadFileName)) {
        console.log('excel')
        url = '/api/task/uploadFile/excel'
      }
      return url
    },
    // 上传之前
    getFileName (file) {
      // let name = md5(file.name) + file.name
      if (this.uploadSuccessObj.uploadFileName) {
        this.oldFileName = this.uploadSuccessObj.uploadFileName
      }
      if ((/(\.csv)$/g).test(file.name)) {
        console.log('csv')
        this.uploadUrls = '/api/task/uploadFile'
      } else if ((/(\.xlsx)$/g).test(file.name) || (/(\.xls)$/g).test(file.name)) {
        console.log('excel')
        this.uploadUrls = '/api/task/uploadFile/excel'
      }
      let fd = new FormData()
      fd.append('file', file)
      if (this.oldFileName) {
        fd.append('oldFileName', this.oldFileName)
      } else {
        fd.append('oldFileName', '')
      }
      fd.append('shopType', this.postShop.shopType)
      this.$message({
        message: '文件上传中, 请稍等!!!',
        type: 'warning'
      })
      this.$ajax.post(this.uploadUrls, fd).then((res) => {
        // console.log(res)
        if (res.data.code === '200') {
          this.uploadSuccess(res.data, file)
        } else if (res.data.code === '1001') {
          this.$message({
            message: '数据缺失,请检查上传文件是否匹配店铺类型',
            type: 'warning'
          })
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.error(err)
      })
      return false
      // this.uploadUrls = this.uploadUrl()
    },
    randNum (n, m) {
      let num = (Math.random() * (m - n + 1) + n).toFixed(2)
      return num
    },
    testCanCreatTask () { // 如果上传文件有失败的
      if (parseInt(this.postOrderType) === 1 && this.uploadSuccessObj.totalNum !== this.uploadSuccessObj.realNum) {
        this.cantCreatTask = true
      } else {
        this.cantCreatTask = false
      }
    },
    // 上传成功
    uploadSuccess (res, file, fileList) {
      if (res.code === '200') {
        let arr = []
        for (let m of res.data.productNames) {
          // let min = this.randNum(0.05, 40) - 0
          // let max = this.randNum(min, 40) - 0
          arr.push({
            productName: m,
            minWeight: '',
            maxWeight: ''
          })
        }
        this.uploadSuccessObj.data = arr
        this.uploadSuccessObj.totalNum = res.data.totalNum
        this.uploadSuccessObj.realNum = res.data.realNum
        this.uploadSuccessObj.uploadFileName = res.data.uploadFileName
        this.uploadSuccessObj.isSuccess = true
        this.filePostfix = res.data.filePostfix || ''
        this.testCanCreatTask()
        this.$message({
          message: '上传完成!',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      }
    },
    // 记住设置的重量
    remberHistory (index, val) {
      // if (index === 1) {
      //   sessionStorage.setItem('__minWeight__', val)
      // } else if (index === 2) {
      //   sessionStorage.setItem('__maxWeight__', val)
      // }
    },
    // 下载失败列表
    downFail () {
      window.open('/api/task/downloadErrorOrderIds?fileName=' + this.uploadSuccessObj.uploadFileName + '&shopType=' + this.postShop.shopType + '&filePostfix=' + this.filePostfix)
    },
    // 验证输入的地址格式
    testAddress (index, val) {
      if (parseInt(this.postShop.shopType) === 1) { // 淘宝

      } else if (parseInt(this.postShop.shopType) === 2) { // 天猫

      } else if (parseInt(this.postShop.shopType) === 3) { // 京东

      } else if (parseInt(this.postShop.shopType) === 4) { // 拼多多

      }
    },
    // 创建任务按钮
    sureToBuildTask () {
      if (this.postShop === '' || this.postAddress === '') {
        this.$message({
          message: '请选择店铺相关信息!',
          type: 'warning'
        })
      } else {
        if (parseInt(this.postOrderType) === 1) { // 批量下单
          let isCan = true
          for (let m of this.uploadSuccessObj.data) {
            for (let i in m) {
              if ((i === 'minWeight' && m[i] === '') || (i === 'maxWeight' && m[i] === '')) {
                isCan = false
                this.$message({
                  message: '请填写完整重量',
                  type: 'warning'
                })
                return false
              } else if ((!(m['minWeight'] - 0 >= 0.05 && m['minWeight'] - 0 <= 40)) || (!(m['maxWeight'] - 0 >= 0.05 && m['maxWeight'] - 0 <= 40))) {
                isCan = false
                this.$message({
                  message: '重量请填写在0.05KG-40KG之间的范围',
                  type: 'warning'
                })
                return false
              } else if (m['minWeight'] - 0 > m['maxWeight'] - 0) {
                isCan = false
                this.$message({
                  message: '最小重量不能大于最大重量',
                  type: 'warning'
                })
                return false
              } else {
                isCan = true
              }
            }
          }
          if (isCan) {
            this.isPosting = false // 点击提交以后的菊花
            let url = ''
            if (this.filePostfix === 'xlsx' || this.filePostfix === 'xls') {
              url = '/api/task/parseFile/excel'
            } else {
              url = '/api/task/parseFile'
            }
            this.$ajax.post(url, { // 批量
              uploadFileName: this.uploadSuccessObj.uploadFileName,
              shopType: this.postShop.shopType,
              logisticsType: this.postCompant,
              sellerShipAddressId: this.postAddress.shipAddressId,
              sellerAccountId: this.postAddress.sellerAccountId,
              sellerShopId: this.postShop.sellerShopId,
              shopName: this.postShop.shopName,
              realNum: this.uploadSuccessObj.realNum,
              totalNum: this.uploadSuccessObj.totalNum,
              productNames: this.uploadSuccessObj.data,
              filePostfix: this.filePostfix
            }).then((data) => {
              if (data.data.code === '200') {
                this.$router.push({ name: 'pay', query: { sellerTaskId: data.data.data.sellerTaskId } })
              } else {
                this.$message({
                  message: data.data.message,
                  type: 'warning'
                })
              }
            }).catch(() => {
              this.$message.error('生意太火爆了, 请稍后再试！')
            })
          }
        } else if (parseInt(this.postOrderType) === 2) { // 手动
          let arr = []
          for (let m of this.inputArr) {
            for (let i in m) {
              if (m[i] === '') {
                this.$message({
                  message: '请完善订单信息!',
                  type: 'warning'
                })
                this.isCanPostCreat = false
                return false
              } else if (i === 'address' && !((/(^(([\u4e00-\u9fa5]+)([\s]+)){3}([\u4e00-\u9fa5]+))/g).test(m[i]))) {
                this.$message({
                  message: '地址格式有误!',
                  type: 'warning'
                })
                this.isCanPostCreat = false
                return false
              } else if (i === 'telephone' && !((/^\d{6,13}$/g).test(m[i]))) {
                this.$message({
                  message: '手机号码格式有误!',
                  type: 'warning'
                })
                this.isCanPostCreat = false
                return false
              } else {
                this.isCanPostCreat = true
              }
            }
            arr.push(m.thirdOrder)
          }
          if (this.handObj.minWeight === '' || this.handObj.maxWeight === '') {
            this.$message({
              message: '请填写重量范围',
              type: 'warning'
            })
            this.isCanPostCreat = false
          } else if (this.handObj.minWeight - 0 > this.handObj.maxWeight - 0) {
            this.$message({
              message: '最小重量不能大于最大重量',
              type: 'warning'
            })
            this.isCanPostCreat = false
          } else if (!(this.handObj.minWeight - 0 >= 0.05 && this.handObj.minWeight - 0 <= 40) || !(this.handObj.maxWeight - 0 >= 0.05 && this.handObj.maxWeight - 0 <= 40)) {
            this.$message({
              message: '重量请填写在0.05KG-40KG之间的范围',
              type: 'warning'
            })
            this.isCanPostCreat = false
          } else {
            this.isCanPostCreat = true
          }
          if (this.isCanPostCreat) {
            this.isPosting = false // 提交以后转菊花
            this.$ajax.post('/api/task/checkDuplicateThirdOrderId', { // 请求去重
              thirdOrderIds: arr
            }).then((data) => {
              if (data.data.code === '200') {
                if (data.data.data.length === 0) {
                  this.creatTaskByHandPost()
                } else if (data.data.data.length !== 0) {
                  this.isPosting = true
                  this.$message({
                    // title: '订单号重复,请修改该订单!',
                    dangerouslyUseHTMLString: true,
                    duration: 10000,
                    // offset: 50,
                    type: 'warning',
                    showClose: true,
                    message: '<p style="font-size:16px;color:#ff3341;margin-bottom: 10px;">订单号重复,请修改该订单!</p>' + data.data.data.join(',<br />')
                  })
                }
              } else {
                this.$message({
                  message: data.data.message,
                  type: 'warning'
                })
              }
            }).catch(() => {
              this.$message.error('生意太火爆了, 请稍后再试！！')
            })
          }
        }
      }
    },
    creatTaskByHandPost () {
      this.$ajax.post('/api/task/createTaskByHand', {
        shopType: this.postShop.shopType,
        logisticsType: this.postCompant,
        sellerShipAddressId: this.postAddress.shipAddressId,
        sellerAccountId: this.postAddress.sellerAccountId,
        sellerShopId: this.postShop.sellerShopId,
        shopName: this.postShop.shopName,
        minWeight: this.handObj.minWeight,
        maxWeight: this.handObj.maxWeight,
        orders: this.inputArr
      }).then((data) => {
        if (data.data.code === '200') {
          this.$router.push({ name: 'pay', query: { sellerTaskId: data.data.data.sellerTaskId } })
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
          this.isPosting = true // 出错关闭菊花
        }
      }).catch(() => {
        this.$message.error('生意太火爆了, 请稍后再试！！')
      })
    },
    // 获取店铺地址
    getShopList () {
      this.$ajax.post('/api/seller/shopAddress/getShopShortList', {
        sellerAccountId: this.userInfo.sellerAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.shopListArr = data.data.data
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('生意太火爆了, 请稍后再试！！')
      })
    },
    // 获取发货地址列表
    getPostAddress (val) {
      this.$ajax.post('/api/seller/shopAddress/getAddressListByShopId', {
        shopId: val.sellerShopId
      }).then((data) => {
        if (data.data.code === '200') {
          let arr = data.data.data.list
          this.postAddressArr = arr
          this.postAddress = arr[0] // 默认地址
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('生意太火爆了, 请稍后再试！！')
      })
    }
  },
  mounted () {
    this.getShopList()
    this.sockets()
  },
  destroyed () {
    socket.disconnect()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapBg
  padding 20px
  .link
    color #1C95FF
    cursor pointer
  .disabled
    cursor not-allowed
  .bg
    background #ffffff
    padding 20px
    .title
      font-size 16px
      color #444
      border-bottom 1px solid #e5e5e5
      padding-bottom 18px
      p
        float right
        color #ff2933
        font-size 14px
    ul
      margin-top 40px
      li
        margin-bottom 24px
        font-size 14px
        color #9b9b9b
        span
          margin-right 40px
      .radio
        margin-left 99px
      .text
        color #3c3c3c
        em
          color #9b9b9b
          margin-right 13px
        i
          color #1C95FF
        p, .btn
          margin-top 12px
          margin-left 101px
        .prompt
          // width 480px
          height 32px
          padding 0 10px
          display inline-block
          border-radius 15px
          background #222039
          color white
          line-height 32px
          padding-left 10px
          position relative
          .red
            margin-right 0
            font-size 20px
            font-weight bold
            color #ff3341
          .fontIcon
            font-size 20px
            color white
      .weight
        color #444444
        font-size 12px
        margin-left 99px
        p
          margin-top 10px
      .forList
        color #444444
        font-size 14px
        margin-left 99px
        .kg
          margin-top 12px
          font-size 12px
          input
            width 76px
            height 30px
            border 1px solid #DEDEDE
            outline none
      .creatTask
        text-align center
      .hand p
        input
          width 140px
          height 36px
          border 1px solid #DEDEDE
          outline none
          margin-left 10px
          margin-bottom 6px
          border-radius 2px
          padding-left 5px
        .first
          width 305px
      .hand .info
        margin-left 88px
      .hand .go
        margin-left 900px
        margin-top 10px
        font-size 12px
        color #198AFF
        cursor pointer
      .handText
        margin-left 99px
        input
          width 76px
          height 36px
          border 1px solid #DEDEDE
          outline none
          margin-left 10px
          border-radius 4px
          padding-left 5px
        .text
          font-size 12px
          color #999999
          margin-top 8px
</style>