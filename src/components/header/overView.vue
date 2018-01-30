<template>
  <div class="overView">
    <img class="guide" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517291795730&di=6f65b2e18c0ec24c646336f70f121c64&imgtype=0&src=http%3A%2F%2Fimg.warting.com%2Fallimg%2F2016%2F0219%2Ffowr1rkr3gq-320.jpg" alt="">
    <div class="moneyList">
      <ul class="leftMoney">
        <li>
          <img src="../../assets/image/benjin.png" alt="">
          <div>
            <h3>账户余额
              <span>充值</span>
            </h3>
            <h2 style="color:#ff3341;">100</h2>
          </div>
        </li>
        <li>
          <img src="../../assets/image/yongjin.png" alt="">
          <div>
            <h3 style="line-height:70px">正在努力开发中......</h3>
          </div>
        </li>
      </ul>
    </div>
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
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd'>
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
              <el-select v-model="value1" placeholder="请选择">
                <el-option v-for="item in optionshop" :key="item.value1" :label="item.label" :value="item.value1">
                </el-option>
              </el-select>
            </li>
            <li>
              任务状态:
              <el-select v-model="value2" placeholder="请选择">
                <el-option v-for="item in taskState" :key="item.value2" :label="item.label" :value="item.value2">
                </el-option>
              </el-select>
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
                    <el-button @click="handleClickPass(scope.row)" type="text" size="small">确认</el-button>
                    <el-button @click="handleClickNoPass(scope.row)" type="text" size="small">撤销</el-button>
                  </div>
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
// import { mapGetters, mapActions } from 'vuex'
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
      tableData: [],
      pageSize: 5,
      input: '',
      value3: '',
      options: [{
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
      optionshop: [{
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
  methods: {
    handleClick () {
    }
  }
  // computed: {
  //   ...mapGetters([
  //     'userInfo',
  //     'userMoney'
  //   ])
  // }
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
  .red
    color #FF2933
  .blue
    color #1C95FF
    cursor pointer
  .nav
    background #ffffff
    padding 12px 16px
    padding-right 16px
    margin-bottom 24px
    border-radius 4px
  .moneyList
    margin-bottom 20px
    height 145px
    display flex
    justify-content space-between
    .leftMoney
      flex 1
      display flex
      margin-right 20px
      li
        flex 1
        display flex
        flex-direction row
        max-width 400px
        min-width 220px
        background #ffffff
        margin-right 16px
        padding 20px
        border-radius 4px
        border 1px solid #dedede
        box-shadow 0 0 15px rgba(0, 0, 0, 0.07)
        img
          width 68px
          height 68px
          border-radius 50%
          align-self center
        >div
          flex 2
          padding-top 14px
          margin-left 24px
          h3
            font-size 16px
            line-height 36px
            span
              color #377AFE
              margin-left 40px
          h2
            font-size 24px
            line-height 44px
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