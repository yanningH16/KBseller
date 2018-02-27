<template>
  <div class="wrap">
    <!-- <div class="shop">
      <em class="gray">其他管理</em>>店铺管理</div> -->
    <div class="content">
      <h3>商家绑定店铺</h3>
      <div class="line"></div>
      <ul class="content_info">
        <li style="margin-bottom:20px">
          <span>所属平台&nbsp;&nbsp;</span>
          <!-- <span>{{this.$route.query.number===2?'天猫':'京东'}}</span> -->
          <el-input disabled v-model="input8" placeholder="请输入内容" style="width:384px"></el-input>
        </li>
        <li class="site" v-if="this.$route.query.number != 4">
          <span>店铺首页链接&nbsp;&nbsp;</span>
          <el-input v-model="input" placeholder="请输入内容" style="width:384px"></el-input>
          <!-- <span class="shopInfo" @click="getShopInfo">读取店铺信息</span> -->
        </li>
        <li class="shopName">
          <span>店铺名称&nbsp;&nbsp;</span>
          <el-input v-model="input1" placeholder="请输入内容" style="width:384px"></el-input>
        </li>
        <li class="addTititle">发货地址
          <span>请真实填写发货地址（与淘宝／京东等渠道后台的发货地址一致），否则无法正常匹配揽件公司</span>
        </li>
        <li class="addAddress">
          <i :class='{"activeColor":pull}' class="el-icon-circle-plus" style="color:rgba(23,159,255,1);cursor:pointer" @click="add"> 添加发货地址</i>
          <!-- <em :class='{"activeColor":haveAdd}' class="el-icon-circle-plus" style="color:rgba(23,159,255,1);cursor:pointer" @click="getAdd"> 从地址库选择</em> -->
        </li>
        <li class="addContent" v-for="(item,index) in addArr" :key='index'>
          <!-- <i class="el-icon-delete" style="float:right;font-size:20px;cursor:pointer" @click="remove(index)"></i> -->
          <div>发货地址:
            <span>{{item.itemCode+' '+item.itemCity+' '+((item.itemZone)||'')}}</span>
          </div>
          <div style="margin-top:10px">发货人姓名:
            <span>{{item.sendName}}</span>
          </div>
          <div style="margin-top:10px">街道地址:
            <span>{{item.jieName}}</span>
          </div>
          <div style="margin-top:10px">发货电话:
            <span>{{item.phone}}</span>
          </div>
          <div class="line"></div>
        </li>
        <li class="pullDown" v-show="pull">
          <el-form>
            <el-form-item label="发货人姓名">
              <el-input v-model="sendName" style="width:384px"></el-input>
            </el-form-item>
            <el-form-item label="发货电话">
              <el-input v-model="phone" style="width:384px"></el-input>
            </el-form-item>
            <el-form-item label="发货地址">
              <el-select v-model="itemCode" placeholder="省份" @change="provinceChange">
                <el-option v-for="(item,index) in provinces" :key="index" :label="item.name" :value="item"></el-option>
              </el-select>
              <el-select v-model="itemCity" placeholder="市" style="margin-left:12px;margin-right:12px" @change="cityChange">
                <el-option v-for="(item,index) in city" :key="index" :label="item.name" :value="item"></el-option>
              </el-select>
              <el-select v-model="itemZone" placeholder="区" @change="zoneChange">
                <el-option v-for="(item,index) in zone" :key="index" :label="item.name" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="jieName" style="width:384px"></el-input>
              <!-- <p style="font-size:12px;color:#FF2933;margin-left:20px">添加后无法修改，一个店铺地址最多绑定5个，您还可以绑定3个</p> -->
            </el-form-item>
          </el-form>
          <button class="btn" @click="save">保存</button>
          <button class="btn" style="background:gray" @click="cencel">取消</button>
        </li>

        <!-- <li class="accountTab" v-show="haveAdd">
          <el-table :data="getAddressList" @selection-change="handSelect" style="width: 100%" @select-all="selectAll" border="true">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="address" align="center" label="已添加的地址">
            </el-table-column>
          </el-table>
        </li> -->
        <li class="clickBtn">
          <button class=" btn" style="margin-bottom:60px" @click="addSure">确认绑定</button>
          <router-link :to="{name:'shopAdminList'}">
            <button class=" btnBlack" style="margin-bottom:60px">取消</button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'shopAdmin',
  data () {
    return {
      input8: this.$route.query.number === 3 ? '京东' : this.$route.query.number === 1 ? '淘宝' : this.$route.query.number === 2 ? '天猫' : this.$route.query.number === 4 ? '拼多多' : '其它',
      // 判断按钮是否可用
      disable: false,
      // 判断是否有这个类名的存在
      active: true,
      isCanUpload: false,
      shopType: [],
      provinces: [],
      itemCode: null,
      city: [],
      itemCity: null,
      zone: [],
      itemZone: null,
      provincesCode: '',
      cityCode: '',
      zoneCode: '',
      jieName: '',
      phone: '',
      sendName: '',
      input: '',
      input1: '',
      value: '',
      className: '',
      valueCode: '',
      addArr: [],
      // 存放地址的id
      saveAddressId: [],
      // 已有地址
      haveAdd: false,
      // 添加新的地址
      pull: false,
      shopArd: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.Provinces()
  },
  methods: {
    // 当点击读取店铺信息触发的事件
    getShopInfo () {
      if (this.input === '') {
        this.$message({
          message: '请正确填写店铺链接,不能为空',
          type: 'warning'
        })
        return false
      }
      this.$ajax.post('/api/seller/shopAddress/getShopUrlInfo', {
        shopUrl: this.input,
        shopType: this.$route.query.number
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.input1 = res.data.title
          if (res.data.title === '' || res.data.wangwangId === '') {
            this.$message({
              message: '暂无无法读取店铺信息,请手动填写',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('生意太火爆了, 请稍后再试！！')
      })
    },
    add () {
      this.pull = !this.pull
    },
    cencel () {
      this.pull = false
    },
    // 当点击保存的时候进行收货地的保存
    save () {
      // else if (!(/^1[34578]\d{9}$/.test(this.phone))) {
      //   this.$message({
      //     message: '手机号错误,请重新填写',
      //     type: 'warning'
      //   })
      //   return false
      // }
      if (this.itemCode === '' || this.itemCity === '' || this.jieName === '' || this.phone === '' || this.sendName === '') {
        this.$message({
          message: '请正确填写信息',
          type: 'warning'
        })
        return false
      } else {
        this.$ajax.post('/api/seller/shopAddress/addAddress', {
          sellerAccountId: this.userInfo.sellerAccountId,
          senderName: this.sendName,
          senderTelephone: this.phone,
          province: this.itemCode,
          provinceCode: this.provincesCode,
          city: this.itemCity,
          cityCode: this.cityCode,
          region: this.itemZone,
          regionCode: this.zoneCode,
          address: this.jieName
        }).then((data) => {
          let res = data.data
          if (res.code === '200') {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.saveAddressId.push(res.data.shipAddressId)
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

        this.addArr.push({
          itemCode: this.itemCode,
          itemCity: this.itemCity,
          itemZone: this.itemZone,
          sendName: this.sendName,
          jieName: this.jieName,
          phone: this.phone,
          pCode: this.provincesCode,
          cCode: this.cityCode,
          zCode: this.zoneCode
        })
        this.jieName = ''
        this.phone = ''
      }
      this.pull = false
    },
    // 当点击确认绑定的时候做的请求
    addSure () {
      if (this.input1 === '' || this.saveAddressId.length === 0) {
        this.$message({
          message: '请正确填写所有内容,不能留空哦...',
          type: 'warning'
        })
        return false
      }
      // let shopArr = []
      // for (let i of this.addArr) {
      //   shopArr.push({
      //     province: i.itemCode,
      //     provinceCode: i.pCode,
      //     city: i.itemCity,
      //     cityCode: i.cCode,
      //     region: i.itemZone,
      //     regionCode: i.zCode,
      //     telephone: i.phone,
      //     address: i.jieName
      //   })
      // }
      this.$ajax.post('/api/seller/shopAddress/addShop', {
        sellerAccountId: this.userInfo.sellerAccountId,
        shopType: this.$route.query.number,
        shopName: this.input1,
        shopTyeDetail: this.input8,
        productUrl: this.input,
        shipAddressIds: (this.saveAddressId).join(',')
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '店铺添加成功',
            type: 'success'
          })
          if (this.$route.query.toBindShop) {
            window.history.go(-1)
          } else {
            if (this.$route.query.number === 3) {
              this.$router.push({ name: 'shopAdminList', query: { activeName: 'first' } })
            } else if (this.$route.query.number === 1) {
              this.$router.push({ name: 'shopAdminList', query: { activeName: 'two' } })
            } else if (this.$route.query.number === 2) {
              this.$router.push({ name: 'shopAdminList', query: { activeName: 'three' } })
            } else if (this.$route.query.number === 4) {
              this.$router.push({ name: 'shopAdminList', query: { activeName: 'four' } })
            } else if (this.$route.query.number === 5) {
              this.$router.push({ name: 'shopAdminList', query: { activeName: 'five' } })
            }
          }
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('生意太火爆了, 请稍后再试！！')
      })
    },
    // 刷新本地用户信息
    // refresh () {
    //   this.$ajax.post('/api/buyerAccount/refresh', {
    //     telephone: this.userInfo.telephone
    //   }).then((data) => {
    //     let res = data.data
    //     if (res.code === '200') {
    //       this.setUserInfo(res.data)
    //     } else {
    //       this.$message({
    //         message: data.data.message,
    //         type: 'warning'
    //       })
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //     this.$message.error('生意太火爆了, 请稍后再试！！')
    //   })
    // },
    // 检测当省份发生变化出发的改变事件
    provinceChange () {
      this.getCity()
      this.provincesCode = this.itemCode.code
      this.itemCode = this.itemCode.name
      this.itemCity = null
      this.itemZone = null
    },
    cityChange () {
      this.getZone()
      this.cityCode = this.itemCity.code
      this.itemCity = this.itemCity.name
      this.itemZone = null
    },
    zoneChange () {
      this.zoneCode = this.itemZone.code
      this.itemZone = this.itemZone.name
    },
    // 检测一级分类变化的时候出发效果
    valueChange () {
      this.valueCode = this.value.id
      this.className = this.value.className
      this.value = this.value.className
    },
    // 获取省的接口
    Provinces () {
      this.$ajax.post('/api/config/location/getProvinceList', {
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              code: word.code
            }
            arr.push(goods)
          }
          this.provinces = arr
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('生意太火爆了, 请稍后再试！！')
      })
    },
    // 通过省份获取市
    getCity () {
      this.$ajax.post('/api/config/location/getCityListByProvinceCode', {
        provinceCode: this.itemCode.code
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              code: word.code,
              provinceCode: word.provinceCode
            }
            arr.push(goods)
          }
          this.city = arr
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('生意太火爆了, 请稍后再试！！')
      })
    },
    // 通过市获取区的值
    getZone () {
      this.$ajax.post('/api/config/location/getAreaListByCityCode', {
        cityCode: this.itemCity.code
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              code: word.code,
              cityCode: word.cityCode
            }
            arr.push(goods)
          }
          this.zone = arr
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('生意太火爆了, 请稍后再试！！')
      })
    },
    remove (index) {
      this.addArr.splice(index, 1)
    },
    cancel () {
    },
    // 单选地址的按钮
    handSelect (val) {
      let arr = []
      for (let i = 0; i < val.length; i++) {
        let obj = {
          shop: val[i].shipAddressId
        }
        arr.push(obj.shop)
      }
      this.saveAddressId = arr
    },
    selectAll () {

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
    padding-left 20px
    padding-right 20px
    h3
      padding-top 40px
      font-size 16px
      color rgba(68, 68, 68, 1)
    .line
      height 1px
      background rgba(222, 222, 222, 1)
      margin-top 16px
    .content_info
      margin-top 10px
      font-size 14px
      color rgba(68, 68, 68, 1)
      text-align center
      margin-top 20px
      min-width 800px
      max-width 1100px
      .site
        // margin-left 154px
        margin-left -30px
      .shopName
        margin-top 20px
      .addTititle
        margin-top 20px
        margin-left 120px
        span
          color #FF2933
          font-size 12px
      .type
        margin-top 20px
        margin-left -22px
      .shopInfo
        display inline
        width 164px
        height 36px
        border 1px solid #FF3341
        color #FF3341
        padding 10px 40px
        margin-left 12px
        cursor pointer
      .pic
        margin-top 20px
        .pic_admin
          margin-left -418px
          margin-top 13px
          display inherit
        .avatar-uploader
          border 1px solid #d9d9d9
          cursor pointer
          width 180px
          height 180px
          background rgba(250, 250, 250, 1)
          display inline-block
          margin-top -14px
          margin-left -127px
        .el-icon-plus
          font-size 48px
          line-height 180px
      .addAddress
        margin-top 25px
        margin-left -50px
        em
          margin-left 200px
        .activeColor
          background rgba(0, 0, 0, 0.1)
          border-radius 5px
      .accountTab
        border 1px solid #d9d9d9
        width 50%
        margin-left 28%
        margin-top 20px
      .clickBtn
        margin-top 50px
      .pullDown
        width 480px
        margin-top 20px
        padding 40px
        display inline-block
        box-shadow 0 1px 5px rgba(0, 0, 0, 0.2)
        margin-left 80px
      .person
        margin-top 32px
        margin-left -80%
        font-size 14px
        color rgba(68, 68, 68, 1)
      .personInfo
        margin-top 60px
        padding-bottom 60px
      .addContent
        width 480px
        display inline-block
        margin-top 10px
        padding 40px
        text-align left
</style>