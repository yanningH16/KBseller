<template>
  <div class="wrapBg">
    <div class="bg">
      <div class="title">
        <h2>确认支付</h2>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="sellerTaskId" label="任务编号" align="center">
          </el-table-column>
          <el-table-column prop="taskType" label="任务类型" align="center">
            <template slot-scope="scope">
              <span style="font-size:12px;" v-if="scope.row.taskType==1">手工下单</span>
              <span style="font-size:12px;" v-if="scope.row.taskType==2">批量下单</span>
              <span style="font-size:12px;" v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价/元" align="center">
          </el-table-column>
          <el-table-column prop="totalNum" label="订单数量/单" align="center">
          </el-table-column>
          <el-table-column prop="actualCost" label="总费用/元" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom">
        <p>费用总计:
          <span>¥{{ (taskObj.actualCost) ? (taskObj.actualCost-0).toFixed(2) : '--' }}</span>
        </p>
        <p v-if="moneyObj.balance-taskObj.actualCost<0">余额不足,还需要¥{{ (taskObj.actualCost-moneyObj.balance) ? (taskObj.actualCost-moneyObj.balance-0).toFixed(2) : '--' }}
          <span class="pay" @click="$router.push({name: 'coinPay'})">立即充值</span>
        </p>
        <button v-show="isPosting" class="btn" @click="sureToPay">确认支付</button>
        <button v-show="!isPosting" class="btn">
          <i class="el-icon-loading"></i>
        </button>
        <button class="btn" style="background:#ededed;color:#9b9b9b;" @click="$router.push({name: 'taskList'})">稍后支付</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'pay',
  data () {
    return {
      isPosting: true, // 转菊花, 防止多次支付
      tableData: [],
      taskObj: {},
      moneyObj: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    getTaskList () {
      this.$ajax.post('/api/order/search/getBySellerTaskId', {
        sellerTaskId: this.$route.query.sellerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          let obj = data.data.data
          let arr = [obj]
          this.tableData = arr
          this.taskObj = obj
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
    getMoney () {
      this.$ajax.post('/api/seller/getBalance', {
        sellerAccountId: this.userInfo.sellerAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.moneyObj = data.data.data
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
    // 确认支付按钮
    sureToPay () {
      this.$ajax.post('/api/order/operate/sellerTaskPay', {
        sellerTaskId: this.$route.query.sellerTaskId
      }).then((data) => {
        this.isPosting = false
        if (data.data.code === '200') {
          this.$message({
            message: '支付成功!',
            type: 'success'
          })
          this.$router.push({ name: 'taskList' })
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
    this.getMoney()
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