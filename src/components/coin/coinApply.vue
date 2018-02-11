<template>
  <div class="wrap coinApply">
    <div class="contentShop">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="交易流水" name="first">
          <ul>
            <li>
              交易时间:
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
              </el-date-picker>
            </li>
            <!-- <li>
              交易内容:
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </li> -->
            <li>
              <button class="btn" @click="search">查询</button>
            </li>
          </ul>
          <div class="actTab">
            <noCont v-if="tableData.length===0"></noCont>
            <el-table :data="tableData" style="width: 100%" v-if="tableData.length!==0">
              <el-table-column prop="number" align="center" label="流水号">
              </el-table-column>
              <el-table-column prop="typeContet" align="center" label="交易内容">
              </el-table-column>
              <el-table-column prop="revenue" align="center" label="交易金额">
              </el-table-column>
              <el-table-column prop="balance" align="center" label="余额">
              </el-table-column>
              <el-table-column prop="type" align="center" label="状态">
              </el-table-column>
              <el-table-column prop="sureTime" align="center" label="交易时间">
              </el-table-column>
              <el-table-column prop="remark" align="center" label="备注">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="pager" v-if="showPager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import NoCont from '../../base/noCont/noCont'
export default {
  name: 'coinApply',
  components: {
    NoCont
  },
  data () {
    return {
      activeName: 'first',
      value3: '',
      input: '',
      currentPage: 1,
      totalCount: 0,
      pageSize: 5,
      tableData: []
    }
  },
  computed: {
    showPager: function () {
      if (this.activeName === 'first' && this.tableData.length !== 0) {
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
  created () {
    this.sercherOne(1, this.pageSize)
  },
  methods: {
    // handleClick (tab, event) {
    //   this.sercherOne(1, this.pageSize)
    // },
    handleSizeChange (val) {
      this.sercherOne(1, val)
    },
    handleCurrentChange (val) {
      this.sercherOne(val, this.pageSize)
    },
    search () {
      this.sercherOne(1, this.pageSize)
    },
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/seller/recharge/getFundFlowBySellerAccountId', {
        pageNo: pageNo,
        pageSize: pageSize,
        sellerAccountId: this.userInfo.sellerAccountId,
        startTime: this.value3 ? this.value3[0] : null,
        endTime: this.value3 ? this.value3[1] : null
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.total
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.datas) {
            let goods = {
              sureTime: word.gmtModify,
              revenue: (word.afterMoney - word.beforMoney).toFixed(2) || '--',
              type: word.statusDetail,
              balance: word.afterMoney,
              number: word.sellerFundFlowId,
              remark: word.content,
              typeContet: word.flowTypeDetail
            }
            arr.push(goods)
          }
          this.tableData = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
        // this.$message.error('网络错误，刷新下试试')
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 0 20px 0 20px
  .shop
    background #fff
    height 36px
    line-height 36px
    padding-left 20px
    font-size 14px
    color rgba(60, 60, 60, 1)
    .gray
      color rgba(137, 137, 137, 1)
  .contentShop
    background #fff
    margin-top 24px
    // padding 0 20px 20px
    font-size 14px
    color rgba(155, 155, 155, 1)
    overflow hidden
    ul
      margin-top 40px
      display -webkit-box
      display flex
      width 100%
      border-bottom 1px solid #e5e5e5
      padding-bottom 24px
      li
        margin-right 20px
    .pager
      float right
      padding-bottom 20px
</style>