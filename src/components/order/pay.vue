<template>
  <div class="wrapBg">
    <div class="bg">
      <div class="title">
        <h2>确认支付</h2>
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
      tableData: []
    }
  },
  methods: {
    getTaskList () {
      this.$ajax.post('/api/order/search/getSellerTaskByCondition', {
        sellerTaskId: this.$route.query.sellerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          this.tableData = data.data.data
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
    this.getTaskList()
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
      border-bottom 1px solid #e5e5e5
      padding-bottom 18px
      p
        float right
        color #ff2933
        font-size 14px
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