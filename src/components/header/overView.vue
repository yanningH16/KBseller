<template>
  <div class="overView">
    <!-- <img class="guide" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517291795730&di=6f65b2e18c0ec24c646336f70f121c64&imgtype=0&src=http%3A%2F%2Fimg.warting.com%2Fallimg%2F2016%2F0219%2Ffowr1rkr3gq-320.jpg" alt=""> -->
    <ul class="leftMoney">
      <li>
        <h3>我的账户</h3>
        <div class="first">
          <p>¥{{getMon}}</p>
          <p>{{userInfo.levelDetail}}</p>
          <p>{{userInfo.price}}元/单</p>
          <p>{{Math.floor(getMon/userInfo.price)}}</p>
        </div>
        <div class="second">
          <p>余额
            <router-link :to="{name:'coinPay'}">
              <span>充值</span>
            </router-link>
          </p>
          <p>用户等级</p>
          <p>圆通成本</p>
          <p>预计可放单数</p>
        </div>
      </li>
      <li class="carAddress">
        <h3>我的发货地址</h3>
        <p>共计:
          <span style="color:#ff3341;font-size:20px">{{shipAddressSum}}</span> 个</p>
        <p>{{shopArd}}</p>
        <router-link :to="{name:'shopAdminList'}">
          <p class="more">查看更多</p>
        </router-link>
      </li>
    </ul>
    <div class="contentShop">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="任务查询" name="first">
          <ul>
            <li>
              任务编号:
              <el-input v-model="input" placeholder="请输入编号"></el-input>
            </li>
            <li>
              时间:
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
              </el-date-picker>
            </li>
            <li>
              平台:
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </li>
          </ul>
          <ul class="ulTow">
            <li>
              店铺名称:
              <!-- <el-select v-model="value1" placeholder="请选择">
                <el-option v-for="item in optionshop" :key="item.value1" :label="item.label" :value="item.value1">
                </el-option>
              </el-select> -->
              <el-autocomplete style="windth:240px;height:32px" class="inline-input" v-model="value1" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
            </li>
            <li>
              任务状态:
              <el-select v-model="value2" placeholder="请选择">
                <el-option v-for="item in taskState" :key="item.value2" :label="item.label" :value="item.value2">
                </el-option>
              </el-select>
            </li>
            <li>
              <button class="btn" @click="search">查询</button>
            </li>
            <li>
              <router-link :to="{name:'batchOrder'}">
                <button class="btnBlack">发布任务</button>
              </router-link>
            </li>
          </ul>
          <div class="actTab">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="sellerTaskId" align="center" label="任务编号">
              </el-table-column>
              <el-table-column prop="logisticsType" align="center" label="平台">
                <template slot-scope="scope">
                  <span v-if="scope.row.logisticsType==='1'">圆通</span>
                </template>
              </el-table-column>
              <el-table-column prop="shopName" align="center" label="店铺名称">
              </el-table-column>
              <el-table-column prop="taskType" align="center" label="任务类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.taskType==='1'">手工任务</span>
                  <span v-if="scope.row.taskType==='2'">批量任务</span>
                </template>
              </el-table-column>
              <el-table-column prop="importTotalNum" align="center" label="订单数量">
              </el-table-column>
              <el-table-column prop="actualCost" align="center" label="金额">
              </el-table-column>
              <el-table-column prop="status" align="center" label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status==='0'">未支付</span>
                  <span v-if="scope.row.status==='1'">支付成功</span>
                  <span v-if="scope.row.status==='2'">任务删除</span>
                </template>
              </el-table-column>
              <el-table-column prop="gmtCreate" align="center" label="创建时间">
              </el-table-column>
              <el-table-column align="center" label="操作" prop="state1">
                <template slot-scope="scope">
                  <div>
                    <el-button v-if="scope.row.status==='1'" @click="handleClicklook(scope.row)" type="text" size="small">查看</el-button>
                    <el-button v-if="scope.row.status==='1'" @click="handleClickUpload(scope.row)" type="text" size="small">导出</el-button>
                    <el-button v-if="scope.row.status==='0'" @click="handleClickGo(scope.row)" type="text" size="small">去支付</el-button>
                    <el-button v-if="scope.row.status==='0'" @click="handleClickDel(scope.row)" type="text" size="small">撤销</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center :modal-append-to-body='false'>
      <span>确定要删除这个{{sellerTaskId}}这个任务么?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import NoCont from '../../base/noCont/noCont'
import { pageCommon } from '../../assets/js/mixin'
export default {
  name: 'overView',
  mixins: [pageCommon],
  components: {
    NoCont
  },
  data () {
    return {
      activeName: 'first',
      currentPage: 1,
      tableData: [],
      pageSize: 5,
      input: '',
      value3: '',
      getMon: '',
      ceshiData: '',
      centerDialogVisible: false,
      sellerTaskId: '',
      restaurants: [],
      shopNameArr: [],
      options: [{
        value: '1',
        label: '圆通'
      }],
      value: '',
      value1: '',
      shipAddressSum: '',
      apiUrl: '/api/order/search/getSellerTaskByCondition',
      taskState: [{
        value2: '0',
        label: '未支付'
      }, {
        value2: '1',
        label: '支付成功'
      }, {
        value2: '2',
        label: '任务删除'
      }],
      value2: ''
    }
  },
  computed: {
    params () {
      return {
        currPageNo: this.pageNo,
        limit: this.pageSize,
        startTime: this.value3 ? this.value3[0] : null,
        endTime: this.value3 ? this.value3[1] : null,
        logisticsType: this.value,
        sellerShopId: this.ceshiData,
        sellerTaskId: this.input,
        status: this.value2,
        sellerAccountId: this.userInfo.sellerAccountId
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.getAllShop()
    this.getInfoNum()
  },
  mounted () {
    this.getMoney()
    this.getShopList()
    this.restaurants = this.shopNameArr
  },
  methods: {
    // 当点击删除进行删除操作
    handleClickDel (val) {
      this.sellerTaskId = val.sellerTaskId
      this.centerDialogVisible = true
    },
    sure () {
      this.$ajax.post('/api/order/operate/deleteTaskByTaskId', {
        sellerTaskId: this.sellerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: '任务已删除'
          })
          this.centerDialogVisible = false
          this.getTask()
        } else {
          this.$message({
            type: 'error',
            message: data.data.message
          })
        }
      }).catch(() => {
      })
    },
    // 当点击查看触发的事件
    handleClicklook (val) {
      this.$router.push({ name: 'courierList', query: { sellerTaskId: val.sellerTaskId } })
    },
    setList (data) {
      this.tableData = data
    },
    handleClick () {
    },
    // 当点击去支付
    handleClickGo (val) {
      this.$router.push({ name: 'pay', query: { sellerTaskId: val.sellerTaskId } })
    },
    search () {
      this.getTask()
    },
    // 当点击导出的时候进行导出
    handleClickUpload (val) {
      window.open('/api/task/downloadSellerOrdersBySellerTaskId/excel?sellerTaskId=' + val.sellerTaskId)
    },
    // 获取所有地址
    getAllShop () {
      this.$ajax.post('/api/seller/shopAddress/getAllAddressList', {
        sellerAccountId: this.userInfo.sellerAccountId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          for (let i = 0; i < res.data.length; i++) {
            this.shopArd = res.data[0].senderName + ' ' + res.data[0].senderPhone + ' ' + res.data[0].province + ' ' + res.data[0].city + ' ' + ((res.data[0].region) || '') + ' ' + res.data[0].address
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          message: '网络错误,刷新试试',
          type: 'error'
        })
      })
    },
    getInfoNum () {
      this.$ajax.post('/api/seller/getSellerAccountBySellerAccountId', {
        sellerAccountId: this.userInfo.sellerAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.shipAddressSum = data.data.data.shipAddressSum
        } else {
          this.$message({
            type: 'error',
            message: data.data.message
          })
        }
      }).catch(() => {
      })
    },
    // 获取店铺列表
    getShopList () {
      this.$ajax.post('/api/seller/shopAddress/getShopShortList', {
        sellerAccountId: this.userInfo.sellerAccountId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let obj = {
              value: word.shopName
            }
            arr.push(obj)
          }
          this.shopNameArr = arr
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 店铺的名称的一个筛选
    querySearch (queryString, cb) {
      var restaurants = this.shopNameArr
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    handleSelect (item) {
      this.ceshiData = item.sellerShopId
    },
    // 获取资金
    getMoney () {
      this.$ajax.post('/api/seller/getBalance', {
        sellerAccountId: this.userInfo.sellerAccountId
      }).then((data) => {
        if (data.data.code === '200') {
          this.getMon = data.data.data.balance
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.overView
  min-width 1000px
  padding-left 20px
  padding-right 20px
  overflow hidden
  .guide
    width 100%
    height 70px
    display inline-block
  .leftMoney
    width 100%
    display flex
    justify-content space-between
    li
      width 50%
      background #ffffff
      height 150px
      // border 1px solid red
      box-shadow 0px 0px 15px rgba(0, 0, 0, 0.07)
      div
        display flex
        justify-content space-around
        margin-top 26px
      h3
        color #444444
        font-size 16px
        padding 16px 0px 16px 21px
        border-bottom 1px solid #E5E5E5
      .first
        font-size 20px
        color #F5A623
      .second
        color #444
        font-size 12px
        span
          display inline-block
          width 40px
          height 18px
          border 1px solid #4a90e2
          color #4a90e2
          border-radius 4px
          line-height 18px
          text-align center
          margin-left 10px
    .carAddress
      p
        color #444
        font-size 14px
        margin-top 18px
        margin-left 43px
      .more
        float right
        margin-right 27px
        color #377AFE
        font-size 14px
        cursor pointer
        margin-top 10px
  .contentShop
    background #fff
    margin-top 24px
    // padding 0 20px 20px
    font-size 14px
    color rgba(155, 155, 155, 1)
    overflow hidden
    ul
      // margin-top 40px
      display -webkit-box
      display flex
      width 100%
      li
        margin-right 30px
    .pager
      float right
      padding-bottom 20px
    .ulTow
      margin-top 20px
      border-bottom 1px solid #e5e5e5
      padding-bottom 24px
</style>