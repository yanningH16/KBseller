<template>
  <div class="wrapBg">
    <div class="bg">
      <div class="title">
        <h2>批量发货</h2>
        <p>收费标准:0.28/单</p>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="taskNum" label="任务编号" align="center">
          </el-table-column>
          <el-table-column prop="taskType" label="任务类型" align="center">
          </el-table-column>
          <el-table-column prop="price" label="单价/元">
          </el-table-column>
          <el-table-column prop="orderNum" label="订单数量/单">
          </el-table-column>
          <el-table-column prop="totalNum" label="总费用/元">
          </el-table-column>
        </el-table>
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
    .title
      font-size 16px
      color #444
      border-bottom 1px solid #e5e5e5
      padding-bottom 18px
      p
        float right
        color #ff2933
        font-size 14px
</style>