<template>
  <div class="wrapBg">
    <div class="bg">
      <div class="title">
        <h2>批量发货</h2>
        <p>收费标准:0.28/单</p>
      </div>
      <ul>
        <li>
          <span>快递公司</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in company" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>发货店铺</span>
          <el-select v-model="value1" placeholder="请选择">
            <el-option v-for="item in shop" :key="item.value1" :label="item.label" :value="item.value1">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>发货地址</span>
          <el-select v-model="value2" placeholder="请选择">
            <el-option v-for="item in address" :key="item.value2" :label="item.label" :value="item.value2">
            </el-option>
          </el-select>
        </li>
        <li class="radio">
          <el-radio v-model="radio" label="1">批量发货</el-radio>
          <el-radio v-model="radio" label="2">手工发货</el-radio>
        </li>
        <!-- 批量发货 -->
        <li class="text" v-show="flase">
          <em>上传订单信息</em>
          <span>1、支持淘宝、京东、天猫、拼多多导出的订单直接上传，点击
            <i>查看帮助</i>
          </span>
          <p>2、支持自定义模板上传数据：
            <i>下载模板</i>
          </p>
          <p>3、单次上次最多上传500条记录</p>
          <button class="btn">上传CSV文件</button>
          <p class="prompt">总共350条订单，上传成功340条，共4条SKU 下载失败订单
            <i class="el-icon-circle-close fontIcon"></i>
          </p>
        </li>
        <!-- 手工发货 -->
        <li class="hand">
          <p>
            <em>填写订单信息</em>
            <input type="text" placeholder="订单编号">
            <input type="text" placeholder="姓名">
            <input type="text" class="first" placeholder="地址">
            <input type="text" placeholder="手机号"></p>
          <p class="info">
            <input type="text" placeholder="订单编号">
            <input type="text" placeholder="姓名">
            <input type="text" class="first" placeholder="地址">
            <input type="text" placeholder="手机号"></p>
          <p class="info" v-for="(item,index) in inputArr" :key="index">
            <input type="text" placeholder="订单编号">
            <input type="text" placeholder="姓名">
            <input type="text" class="first" placeholder="地址">
            <input type="text" placeholder="手机号"></p>
          <p class="go" @click="add()">+继续添加</p>
        </li>
        <li class="handText">
          <p class="kg">物品重量 <input type="number">&nbsp; kg&nbsp;&nbsp;- &nbsp;&nbsp;<input type="number">&nbsp;&nbsp;kg</p>
          <p class="text">系统自动会给每个订单在您设置范围内随机生成一个重量，如需固定重要，则填写一致即可</p>
        </li>
        <li class="weight">
          <p>1、包裹重量随机生成，范围在最小和最大重量之间，如果不需要随机把最大和最小重量值设置成一样即可</p>
          <p>2、最小重量不能低于
            <em>0.05KG</em>最小重量不能低于
            <em>40KG</em>
          </p>
        </li>
        <li class="forList" v-show="flase">
          <p>1.商品名称:
            <span>女装外套</span>
          </p>
          <p class="kg">物品重量 <input type="number">&nbsp; kg&nbsp;&nbsp;- &nbsp;&nbsp;<input type="number">&nbsp;&nbsp;kg</p>
        </li>
        <li class="creatTask">
          <router-link :to="{name:'pay'}">
            <button class="btn">创建任务</button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'batchOrder',
  data () {
    return {
      inputArr: [],
      item: '',
      radio: '1',
      company: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      shop: [{
        value1: '选项1',
        label: '黄金糕'
      }, {
        value1: '选项2',
        label: '双皮奶'
      }, {
        value1: '选项3',
        label: '蚵仔煎'
      }, {
        value1: '选项4',
        label: '龙须面'
      }, {
        value1: '选项5',
        label: '北京烤鸭'
      }],
      value1: '',
      address: [{
        value2: '选项1',
        label: '黄金糕'
      }, {
        value2: '选项2',
        label: '双皮奶'
      }, {
        value2: '选项3',
        label: '蚵仔煎'
      }, {
        value2: '选项4',
        label: '龙须面'
      }, {
        value2: '选项5',
        label: '北京烤鸭'
      }],
      value2: ''
    }
  },
  methods: {
    add () {
      this.inputArr.push(this.item)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapBg
  padding 20px
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
          width 400px
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
          border-radius 2px
          padding-left 5px
        .first
          width 305px
      .hand .info
        margin-top 12px
        margin-left 88px
      .hand .go
        margin-left 839px
        font-size 12px
        color #198AFF
        margin-top 5px
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