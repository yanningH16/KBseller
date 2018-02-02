<template>
  <div class="wrapBg">
    <div class="bg">
      <div class="title">
        <h2>任务详情</h2>
        <p>待支付</p>
      </div>
      <div class="carDate">
        <p>
          <span class="rw">金额:
            <i> 20.00</i>
          </span>
          <span>任务编号:
            <i>rw546546546546</i>
          </span>
        </p>
        <p class="second">
          <span class="rh">电商平台:
            <i>淘宝-品胜店铺</i>
          </span>
          <span>发货地址:
            <i>张三 15868152366 浙江省杭州市余杭区向往街乐富海邦园0001幢</i>
          </span>
        </p>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="taskNum" label="任务编号" align="center">
          </el-table-column>
          <el-table-column prop="taskType" label="任务类型" align="center">
          </el-table-column>
          <el-table-column prop="price" label="单价/元" align="center">
          </el-table-column>
          <el-table-column prop="orderNum" label="订单数量/单" align="center">
          </el-table-column>
          <el-table-column prop="totalNum" label="总费用/元" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom">
        <p>费用总计:
          <span>¥36.00</span>
        </p>
        <p>余额不足,还需要¥30.00
          <span class="pay">立即充值</span>
        </p>
        <button class="btn">确认支付</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'pay',
  data () {
    return {
      tableData: [{
        taskNum: '54646464646',
        taskType: '批量',
        price: '5',
        orderNum: '5',
        totalNum: '25'
      }, {
        taskNum: '54646464646',
        taskType: '批量',
        price: '5',
        orderNum: '5',
        totalNum: '25'
      }]
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
    overflow hidden
    .title
      font-size 16px
      color #444
      padding-bottom 18px
      p
        float right
        color #377AFE
        font-size 14px
    .carDate
      border 1px solid #DEDEDE
      padding 31px 0px 34px 83px
      font-size 14px
      color #9B9B9B
      i
        color #444444
      .second
        margin-top 20px
      .rw
        margin-right 258px
      .rh
        margin-right 178px
    .table
      border 1px solid #DEDEDE
      margin-top 24px
    .bottom
      float right
      margin-top 20px
      margin-right 19px
      text-align center
      font-size 14px
      color #3c3c3c
      p
        padding-bottom 20px
        .pay
          color #326cfe
          cursor pointer
</style>