<template>
  <div class="overView">
    <div class="contentShop">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="任务列表" name="first">
          <ul>
            <li>
              物流平台:
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              创建时间:
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
              </el-date-picker>
            </li>
            <li>
              店铺名称:
              <!-- <el-select v-model="value1" placeholder="请选择">
                <el-option v-for="item in optionshop" :key="item.value1" :label="item.label" :value="item.value1">
                </el-option>
              </el-select> -->
              <el-autocomplete style="windth:240px;height:32px" class="inline-input" v-model="value1" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
            </li>
          </ul>
          <ul class="ulTow">
            <li>
              任务状态:
              <el-select v-model="value2" placeholder="请选择">
                <el-option v-for="item in taskState" :key="item.value2" :label="item.label" :value="item.value2">
                </el-option>
              </el-select>
            </li>
            <li>
              任务编号:
              <el-input v-model="input" placeholder="请输入编号"></el-input>
            </li>
            <li>
              <button class="btn" @click="search">查询</button>
            </li>
            <li>
              <button class="btnBlack">发布任务</button>
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
      restaurants: [],
      shopNameArr: [],
      ceshiData: '',
      apiUrl: '/api/order/search/getSellerTaskByCondition',
      tableData: [],
      pageSize: 5,
      input: '',
      value3: '',
      centerDialogVisible: false,
      sellerTaskId: '',
      options: [{
        value: '1',
        label: '圆通'
      }],
      value: '',
      value1: '',
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
        status: this.value2
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.getShopList()
  },
  methods: {
    setList (data) {
      this.tableData = data
    },
    search () {
      this.getTask()
    },
    handleClick () {
    },
    handleClicklook (val) {
      this.$router.push({ name: 'courierList', query: { sellerTaskId: val.sellerTaskId } })
    },
    // 当点击删除进行删除操作
    handleClickDel (val) {
      console.log(val)
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
    getShopList () {
      this.$ajax.post('/api/seller/shopAddress/getShopShortList', {
        sellerAccountId: this.userInfo.sellerAccountId
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let obj = {
              value: word.shopName,
              sellerShopId: word.sellerShopId
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
      console.log(item)
      this.ceshiData = item.sellerShopId
    }
  },
  mounted () {
    this.restaurants = this.shopNameArr
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.overView
  min-width 1000px
  padding-left 20px
  padding-right 20px
  overflow hidden
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