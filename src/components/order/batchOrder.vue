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
            <el-option v-for="(item,index) in postAddressArr" :key="index" :label="item.senderName + ' ' + item.senderPhone + ' ' + item.province+item.city+item.region+item.address" :value="item">
            </el-option>
          </el-select>
        </li>
        <li class="radio">
          <el-radio v-model="postOrderType" label="1">批量下单(表格)</el-radio>
          <el-radio v-model="postOrderType" label="2">手工单条下单</el-radio>
        </li>
        <!-- 批量发货 -->
        <li class="text" v-if="postOrderType==1">
          <em>上传订单信息</em>
          <span>1、支持淘宝、京东、天猫、拼多多导出的订单直接上传，点击
            <i>查看帮助</i>
          </span>
          <p>2、支持自定义模板上传数据：
            <i>下载模板</i>
          </p>
          <p>3、单次上次最多上传500条记录</p>
          <el-upload accept=".csv" :before-upload="getFileName" :on-success="uploadSuccess" :show-file-list="false" action="/api/task/uploadFile" :data="uploadParams" :headers="headers">
            <button class="btn" :class="{'disabled': canUpload}" :disabled="canUpload">上传CSV文件</button>
          </el-upload>
          <p class="prompt" :class="{ 'short': uploadSuccessObj.totalNum==uploadSuccessObj.realNum }" v-if="uploadSuccessObj.isSuccess">总共{{ uploadSuccessObj.totalNum }}条订单，上传成功{{ uploadSuccessObj.realNum }}条，共{{ uploadSuccessObj.data ? uploadSuccessObj.data.length : 0 }}条SKU
            <span v-if="uploadSuccessObj.totalNum!=uploadSuccessObj.realNum" class="link" @click="downFail">下载失败列表</span>
          </p>
        </li>
        <!-- 手工发货 -->
        <li class="hand" v-if="postOrderType==2">
          <strong style="display:inline-block;width:100px;">收件地址</strong>
          <p style="font-size:12px;color:#ff3341;padding-bottom:10px;display:inline-block;">地址示例：浙江省 杭州市 萧山区 东三路海神苑K幢678（必须包含省市区信息，省市区一定要以空格隔开）</p>
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
          <div v-for="(item, index) in uploadSuccessObj.data" :key="index">
            <p style="margin: 10px 0">{{ index+1 }}.商品名称:
              <span>{{ item.productName }}</span>
            </p>
            <p style="margin-bottom:20px;">
              物品重量
              <el-input v-model="item.minWeight" style="width:75px;" type="number" placeholder="请输入内容"></el-input>&nbsp; kg&nbsp;&nbsp;- &nbsp;&nbsp;
              <el-input v-model="item.maxWeight" style="width:75px;" type="number" placeholder="请输入内容"></el-input>&nbsp;&nbsp;kg
            </p>
          </div>
        </li>
        <li class="creatTask">
          <button class="btn" @click="sureToBuildTask">创建任务</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import md5 from 'md5'
export default {
  name: 'batchOrder',
  data () {
    return {
      uploadSuccessObj: {
        isSuccess: false,
        data: ''
      },
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
    uploadFileName: function (val) {
      if (val) {
        return val
      } else {
        return ''
      }
    },
    uploadParams: function (val) {
      let obj = {
        oldFileName: this.uploadFileName,
        shopType: this.postShop.shopType
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
    // 上传之前
    getFileName (file) {
      let name = md5(file.name) + '.csv'
      this.uploadFileName = name
    },
    randNum (n, m) {
      let num = (Math.random() * (m - n + 1) + n).toFixed(2)
      return num
    },
    // 上传成功
    uploadSuccess (res, file, fileList) {
      if (res.code === '200') {
        let arr = []
        for (let m of res.data.productNames) {
          let min = this.randNum(0.05, 40) - 0
          let max = this.randNum(min, 40) - 0
          arr.push({
            productName: m,
            minWeight: min,
            maxWeight: max
          })
        }
        this.uploadSuccessObj.data = arr
        this.uploadSuccessObj.totalNum = res.data.totalNum
        this.uploadSuccessObj.realNum = res.data.realNum
        this.uploadSuccessObj.uploadFileName = res.data.uploadFileName
        this.uploadSuccessObj.isSuccess = true
      } else {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      }
    },
    // 记住设置的重量
    remberHistory (index, val) {
      if (index === 1) {
        sessionStorage.setItem('__minWeight__', val)
      } else if (index === 2) {
        sessionStorage.setItem('__maxWeight__', val)
      }
    },
    // 下载失败列表
    downFail () {
      window.open('/api/task/downloadErrorOrderIds?fileName=' + this.uploadSuccessObj.uploadFileName)
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
        if (parseInt(this.postOrderType) === 1) {
          this.$ajax.post('/api/task/parseFile', { // 批量
            uploadFileName: this.uploadSuccessObj.uploadFileName,
            shopType: this.postShop.shopType,
            logisticsType: this.postCompant,
            sellerShipAddressId: this.postAddress.shipAddressId,
            sellerAccountId: this.postAddress.sellerAccountId,
            sellerShopId: this.postShop.sellerShopId,
            shopName: this.postShop.shopName,
            realNum: this.uploadSuccessObj.realNum,
            totalNum: this.uploadSuccessObj.totalNum,
            productNames: this.uploadSuccessObj.data
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
            this.$message.error('服务器错误！')
          })
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
              } else {
                this.isCanPostCreat = true
              }
            }
            arr.push(m.thirdOrder)
          }
          if (this.isCanPostCreat) {
            this.$ajax.post('/api/task/checkDuplicateThirdOrderId', { // 请求去重
              thirdOrderIds: arr
            }).then((data) => {
              if (data.data.code === '200') {
                if (data.data.data.length === 0) {
                  this.creatTaskByHandPost()
                } else if (data.data.data.length !== 0) {
                  this.$notify({
                    title: '订单号重复,请修改该订单!',
                    dangerouslyUseHTMLString: true,
                    duration: 10000,
                    offset: 50,
                    type: 'warning',
                    showClose: true,
                    message: data.data.data.join(',<br />')
                  })
                }
              } else {
                this.$message({
                  message: data.data.message,
                  type: 'warning'
                })
              }
            }).catch(() => {
              this.$message.error('服务器错误！')
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
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
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
        this.$message.error('服务器错误！')
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
        this.$message.error('服务器错误！')
      })
    }
  },
  mounted () {
    this.getShopList()
    if (sessionStorage.getItem('__minWeight__')) {
      this.handObj.minWeight = sessionStorage.getItem('__minWeight__')
    }
    if (sessionStorage.getItem('__maxWeight__')) {
      this.handObj.maxWeight = sessionStorage.getItem('__maxWeight__')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapBg
  padding 20px
  .link
    color #ff3341
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
          width 420px
          height 32px
          border-radius 15px
          background #222039
          color white
          line-height 32px
          padding-left 10px
          position relative
          .fontIcon
            font-size 20px
            color white
        .short
          width 300px
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