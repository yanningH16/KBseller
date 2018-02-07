<template>
  <div class="overView">
    <div class="contentShop">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="任务列表" name="first">
          <ul>
            <li>
              平台:
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
              <button class="btn">查询</button>
            </li>
            <li>
              <button class="btnBlack">发布任务</button>
            </li>
          </ul>
          <div class="actTab">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="taskNumber" align="center" label="任务编号">
              </el-table-column>
              <el-table-column prop="platform" align="center" label="平台">
              </el-table-column>
              <el-table-column prop="shopName" align="center" label="店铺名称">
              </el-table-column>
              <el-table-column prop="TaskType" align="center" label="任务类型">
              </el-table-column>
              <el-table-column prop="orderNum" align="center" label="订单数量">
              </el-table-column>
              <el-table-column prop="money" align="center" label="金额">
              </el-table-column>
              <el-table-column prop="state" align="center" label="状态">
              </el-table-column>
              <el-table-column prop="creatTime" align="center" label="创建时间">
              </el-table-column>
              <el-table-column align="center" label="操作" prop="state1">
                <template slot-scope="scope">
                  <div>
                    <el-button @click="handleClicklook(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="handleClickDel(scope.row)" type="text" size="small">撤销</el-button>
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
      apiUrl: '',
      tableData: [{
        taskNumber: '546546546546',
        platform: '京东'
      }
      ],
      pageSize: 5,
      input: '',
      value3: '',
      options: [{
        value: '1',
        label: '圆通'
      }],
      value: '',
      value1: '',
      taskState: [{
        value2: '选项2',
        label: '双皮奶'
      }, {
        value2: '选项3',
        label: '蚵仔煎'
      }, {
        value2: '选项4',
        label: '龙须面'
      }],
      value2: ''
    }
  },
  computed: {
    params () {
      return {
        channelId: this.userInfo.channelId,
        pageNo: this.pageNo,
        pageSize: this.pageSize
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
    handleClick () {
    },
    handleClicklook () {
      this.$router.push({ name: 'pay' })
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
      this.shopNameId = item.shopNameId
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