<template>
  <div class="overView">
    <div class="contentShop">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="快递单列表" name="first">
          <ul>
            <li>
              物流平台:
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              发货地址:
              <el-select v-model="value4" placeholder="请选择" value-key="value">
                <el-option v-for="(item,index) in shopAdressArr" :key="index" :label="item.valueName" :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              发货店铺:
              <el-autocomplete style="windth:240px;height:32px" class="inline-input" v-model="value1" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
            </li>
          </ul>
          <ul style="margin-top:20px">
            <li>
              是否付款:
              <el-select v-model="value5" placeholder="请选择">
                <el-option v-for="item in isPay" :key="item.value5" :label="item.label" :value="item.value5">
                </el-option>
              </el-select>
            </li>
            <li>
              下单状态:
              <el-select v-model="value2" placeholder="请选择">
                <el-option v-for="item in orderState" :key="item.value2" :label="item.label" :value="item.value2">
                </el-option>
              </el-select>
            </li>
            <li>
              收件手机:
              <el-input v-model="input2" placeholder="请输入编号"></el-input>
            </li>
          </ul>
          <ul class="ulTow">
            <li>
              任务批号:
              <el-input v-model="input1" placeholder="请输入编号"></el-input>
            </li>
            <li>
              订单编号:
              <el-input v-model="input" placeholder="请输入编号"></el-input>
            </li>
            <li>
              创建时间:
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
              </el-date-picker>
            </li>
            <li>
              <button class="btn">查询</button>
            </li>
          </ul>
          <div class="actTab">
            <el-table :data="tableData" style="width: 100%" border='true'>
              <el-table-column prop="creatTime" align="center" label="创建时间">
              </el-table-column>
              <el-table-column prop="compay" align="center" label="快递公司">
              </el-table-column>
              <el-table-column prop="platform" align="center" label="平台">
              </el-table-column>
              <el-table-column prop="sendInfo" align="center" label="发货信息">
                <template slot-scope="scope">
                  <p>发货人姓名:黄军</p>
                  <p>发货人电话：15700177632</p>
                  <p>发货人手机：15700177632</p>
                  <p>物品质量：2.1kg</p>
                  <p>发货人地址：浙江省杭州市 点点滴滴点点滴滴</p>
                </template>
              </el-table-column>
              <el-table-column prop="shopName" align="center" label="收货信息">
                <template slot-scope="scope">
                  <p>收货人姓名:黄军</p>
                  <p>发货人电话：15700177632</p>
                  <p>发货人手机：15700177632</p>
                  <p>物品质量：2.1kg</p>
                  <p>发货人地址：浙江省杭州市 点点滴滴点点滴滴</p>
                </template>
              </el-table-column>
              <el-table-column prop="orderInfo" align="center" label="订单信息">
                <template slot-scope="scope">
                  <p>平台订单号:4646546156156</p>
                  <p>快递单号:465465948546156</p>
                </template>
              </el-table-column>
              <el-table-column prop="state" align="center" label="状态">
                <template slot-scope="scope">
                  <p>是否付款： 已付款</p>
                  <p>快递单： 获取成功</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="pager">
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
  name: 'overView',
  components: {
    NoCont
  },
  data () {
    return {
      activeName: 'first',
      currentPage: 1,
      tableData: [{
        creatTime: '2018-04-11',
        compay: '圆通',
        platform: '京东'
      }, {
        creatTime: '2018-04-11',
        compay: '圆通',
        platform: '京东'
      }
      ],
      pageSize: 5,
      input: '',
      input1: '',
      input2: '',
      value3: '',
      restaurants: [],
      shopNameArr: [],
      shopAdressArr: [],
      options: [{
        value: '1',
        label: '圆通'
      }],
      value: '',
      value1: '',
      orderState: [{
        value2: '0',
        label: '未获取运单'
      }, {
        value2: '1',
        label: '已获取运单'
      }, {
        value2: '2',
        label: '订单取消'
      }],
      value2: '',
      value4: '',
      isPay: [{
        value5: '0',
        label: '未付款'
      }, {
        value5: '1',
        label: '已付款'
      }, {
        value5: '2',
        label: '任务取消'
      }],
      value5: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    this.getShopList()
    this.getShopAddress()
    this.restaurants = this.shopNameArr
  },
  methods: {
    handleClick () {
    },
    // 获取所有地址列表
    getShopAddress () {
      this.$ajax.post('/api/seller/shopAddress/getAllAddressList', {
        sellerAccountId: this.userInfo.sellerAccountId
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let obj = {
              valueName: word.province + ' ' + word.city + ' ' + word.region + ' ' + word.address,
              value: word.shipAddressId
            }
            arr.push(obj)
          }
          this.shopAdressArr = arr
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
    // 获取店铺列表
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
    .actTab
      border 1px solid #e5e5e5
      margin-top 20px
</style>