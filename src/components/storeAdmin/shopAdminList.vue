<template>
  <div class="wrap">
    <div class="content">
      <h2>地址列表</h2>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="淘宝" name="two">
          <table class="border" v-for="(item,index) in shopList" :key="index">
            <div class="icon">
            </div>
            <tr>
              <i style="margin-left:20px">店铺名称:
                <em style="font-size:16px;color:#ff3341">{{item.shopName}}</em>
                <span class="right">
                  <!-- <em>{{item.status}}</em> -->
                  <i style="margin-right:10px;margin-left:10px;cursor:pointer" @click="change(item.shopId)">修改</i>
                  <!-- <i class="el-icon-delete" style="cursor:pointer" @click="open2(index)"></i> -->
                </span>
              </i>
            </tr>
            <tr v-for="(itemOne,index) in item.addressId" :key="index">
              <i style="margin-left:20px">
                地址{{index+1}}:{{itemOne.senderName+' '+itemOne.senderPhone+' '+itemOne.province+' '+itemOne.city+' '+itemOne.region+' '+itemOne.address}}
                <span class="setAddress color" v-if="item.defaultAddressId!=itemOne.shipAddressId" @click="setAddress(item.addressId[index],item.shopId)">设为默认地址</span>
                <span class="setAddress" v-if="item.defaultAddressId===itemOne.shipAddressId">默认地址</span>
              </i>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label='天猫' name="three">
          <table class="border" v-for="(item,index) in shopList" :key="index">
            <div class="icon">
            </div>
            <tr>
              <i style="margin-left:20px">店铺名称:
                <em style="font-size:16px;color:#ff3341">{{item.shopName}}</em>
                <span class="right">
                  <!-- <em>{{item.status}}</em> -->
                  <i style="margin-right:10px;margin-left:10px;cursor:pointer" @click="change(item.shopId)">修改</i>
                  <!-- <i class="el-icon-delete" style="cursor:pointer" @click="open2(index)"></i> -->
                </span>
              </i>
            </tr>
            <tr v-for="(itemOne,index) in item.addressId" :key="index">
              <i style="margin-left:20px">
                地址{{index+1}}:{{itemOne.senderName+' '+itemOne.senderPhone+' '+itemOne.province+' '+itemOne.city+' '+itemOne.region+' '+itemOne.address}}
                <span class="setAddress color" v-if="item.defaultAddressId!=itemOne.shipAddressId" @click="setAddress(item.addressId[index],item.shopId)">设为默认地址</span>
                <span class="setAddress" v-if="item.defaultAddressId===itemOne.shipAddressId">默认地址</span>
              </i>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="京东" name="first">
          <table class="border" v-for="(item,index) in shopList" :key="index">
            <div class="icon">
            </div>
            <tr>
              <i style="margin-left:20px">店铺名称:
                <em style="font-size:16px;color:#ff3341">{{item.shopName}}</em>
                <span class="right">
                  <!-- <em>{{item.status}}</em> -->
                  <i style="margin-right:10px;margin-left:10px;cursor:pointer" @click="change(item.shopId)">修改</i>
                  <!-- <i class="el-icon-delete" style="cursor:pointer" @click="open2(index)"></i> -->
                </span>
              </i>
            </tr>
            <tr v-for="(itemOne,index) in item.addressId" :key="index">
              <i style="margin-left:20px">
                地址{{index+1}}:{{itemOne.senderName+' '+itemOne.senderPhone+' '+itemOne.province+' '+itemOne.city+' '+itemOne.region+' '+itemOne.address}}
                <span class="setAddress color" v-if="item.defaultAddressId!=itemOne.shipAddressId" @click="setAddress(item.addressId[index],item.shopId)">设为默认地址</span>
                <span class="setAddress" v-if="item.defaultAddressId===itemOne.shipAddressId">默认地址</span>
              </i>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label='拼多多' name="four">
          <table class="border" v-for="(item,index) in shopList" :key="index">
            <div class="icon">
            </div>
            <tr>
              <i style="margin-left:20px">店铺名称:
                <em style="font-size:16px;color:#ff3341">{{item.shopName}}</em>
                <span class="right">
                  <!-- <em>{{item.status}}</em> -->
                  <i style="margin-right:10px;margin-left:10px;cursor:pointer" @click="change(item.shopId)">修改</i>
                  <!-- <i class="el-icon-delete" style="cursor:pointer" @click="open2(index)"></i> -->
                </span>
              </i>
            </tr>
            <tr v-for="(itemOne,index) in item.addressId" :key="index">
              <i style="margin-left:20px">
                地址{{index+1}}:{{itemOne.senderName+' '+itemOne.senderPhone+' '+itemOne.province+' '+itemOne.city+' '+itemOne.region+' '+itemOne.address}}
                <span class="setAddress color" v-if="item.defaultAddressId!=itemOne.shipAddressId" @click="setAddress(item.addressId[index],item.shopId)">设为默认地址</span>
                <span class="setAddress" v-if="item.defaultAddressId===itemOne.shipAddressId">默认地址</span>
              </i>
            </tr>
          </table>
        </el-tab-pane>
        <!-- <el-tab-pane label='其它' name="five">
          <table class="border" v-for="(item,index) in shopList" :key="index">
            <div class="icon">
            </div>
            <tr>
              <i style="margin-left:20px">店铺名称:
                <em style="font-size:16px;color:#ff3341">{{item.shopName}}</em>
                <span class="right">
                  <i style="margin-right:10px;margin-left:10px;cursor:pointer" @click="change(item.shopId)">修改</i>
                </span>
              </i>
            </tr>
            <tr v-for="(itemOne,index) in item.addressId" :key="index">
              <i style="margin-left:20px">
                地址{{index+1}}:{{itemOne.senderName+' '+itemOne.senderPhone+' '+itemOne.province+' '+itemOne.city+' '+itemOne.region+' '+itemOne.address}}
                <span class="setAddress color" v-if="item.defaultAddressId!=itemOne.shipAddressId" @click="setAddress(item.addressId[index],item.shopId)">设为默认地址</span>
                <span class="setAddress" v-if="item.defaultAddressId===itemOne.shipAddressId">默认地址</span>
              </i>
            </tr>
          </table>
        </el-tab-pane> -->
      </el-tabs>
      <button class="btn" @click="addShop">+添加店铺</button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'shopAdminList',
  data () {
    return {
      activeName: 'two',
      shopList: [],
      addList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    if (this.$route.query.activeName === 'first') {
      this.activeName = 'first'
    } else if (this.$route.query.activeName === 'two') {
      this.activeName = 'two'
    } else if (this.$route.query.activeName === 'three') {
      this.activeName = 'three'
    } else if (this.$route.query.activeName === 'four') {
      this.activeName = 'four'
    } else if (this.$route.query.activeName === 'five') {
      this.activeName = 'five'
    } else {
      this.activeName = 'two'
    }
    this.shoplist()
  },
  methods: {
    // 点击添加店铺进行相应的跳转
    addShop () {
      this.$router.push({ name: 'shopAdmin', query: { number: this.activeName === 'first' ? 3 : this.activeName === 'two' ? 1 : this.activeName === 'three' ? 2 : this.activeName === 'four' ? 4 : 5 } })
    },
    // 点击切换进行相应的请求
    handleClick () {
      this.shoplist()
    },
    // 设置默认地址
    setAddress (val, id) {
      this.$ajax.post('/api/seller/shopAddress/setDefaultShopAddress', {
        shopId: id,
        shipAddressId: val.shipAddressId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: data.data.data,
            type: 'success'
          })
          this.shoplist()
        }
      })
    },
    // 删除店铺的操作
    // open2 (index) {
    //   console.log(this.shopList[index])
    //   this.$confirm('此操作将永久删除该店铺, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$ajax.post('/api/seller/shop/deleteShop', {
    //       sellerShopId: this.shopList[index].shopId
    //     }).then((data) => {
    //       let res = data.data
    //       if (res.code === '200') {
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功!'
    //         })
    //         // this.refresh()
    //         this.shoplist()
    //       } else {
    //         this.shoplist()
    //         this.$message({
    //           message: data.data.message,
    //           type: 'warning'
    //         })
    //       }
    //     }).catch((err) => {
    //       console.log(err)
    //       this.$message.error('未知错误！')
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 刷新本地用户信息
    refresh () {
      this.$ajax.post('/api/buyerAccount/refresh', {
        telephone: this.userInfo.telephone
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.setUserInfo(res.data)
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('服务器错误！')
      })
    },
    // 获取店铺列表的接口
    shoplist () {
      this.$ajax.post('/api/seller/shopAddress/getShopDetailList', {
        sellerAccountId: this.userInfo.sellerAccountId,
        type: this.activeName === 'first' ? 3 : this.activeName === 'two' ? 1 : this.activeName === 'three' ? 2 : this.activeName === 'four' ? 4 : 5
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          let arr1 = []
          // 用来判断是否存在res.data
          if (res.data) {
            for (let word of res.data) {
              let goods = {
                shopName: word.shopName,
                shopHomePageUrl: word.shopUrl,
                status: word.status === '1' ? '已审核' : '已审核',
                shopId: word.sellerShopId,
                addressId: word.list,
                defaultAddressId: word.defaultAddressId
              }
              arr.push(goods)
              arr1.push(goods.addressId)
            }
          }
          this.shopList = arr
          this.addList = arr1
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error(err)
      })
    },
    change (val) {
      this.$router.push({ name: 'changeShop', query: { shopId: val, number: this.activeName === 'first' ? 3 : this.activeName === 'two' ? 1 : this.activeName === 'three' ? 2 : this.activeName === 'four' ? 4 : 5 } })
    },
    ...mapActions([
      'setUserInfo'
    ])
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
  .content
    background #fff
    margin-top 24px
    padding 0 0 336px
    position relative
    h2
      font-size 14px
      color #444444
      padding 20px 0px 16px 22px
      border-bottom 1px solid #E5E5E5
      margin-bottom 20px
    .border
      border 1px solid rgba(204, 204, 204, 1)
      width 100%
      line-height 40px
      margin-top 15px
      font-size 14px
      min-width 500px
      tr:nth-child(2n-1)
        border 1px solid rgba(204, 204, 204, 1)
        background #fafafa
      .right
        float right
        margin-right 20px
    .btn
      position absolute
      bottom 110px
      left 50%
    .setAddress
      margin-left 10px
      color #ff3341
    .color
      cursor pointer
      color black
</style>