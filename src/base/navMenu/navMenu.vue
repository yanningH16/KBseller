<template>
  <div class="menu" @dblclick="copyText">
    <div class="logo">
      <!-- <img src="../../assets/image/logow.png" alt="Logo" class="img"> -->
      <span style="color:#ffffff;line-height:80px;font-size:18px;">包裹网</span>
    </div>
    <div class="router">
      <div class="routerBox" v-for="(item,index) in menus" :key="index" ref="routerBox" @click="setRouterActive">
        <div class="routerHeader" :class="{'routerHeaderActive':isActive===index}">
          <span class="icon" :class="item.icon"></span>
          <span class="text">{{item.header}}</span>
        </div>
        <router-link tag="div" class="routerLine" v-for="(line,lineIndex) in item.lines" :key="lineIndex" :to="{name:line.link}" ref="routerLine">
          <span class="text">{{line.text}}</span>
          <span class="bradge" v-if="line.bradge">{{line.bradge}}</span>
        </router-link>
      </div>
    </div>
    <div class="state">
      <p class="balance">客服微信:{{userInfo.serviceWechatNum}}</p>
      <p class="balance">
        <span class="qq">客服QQ:</span>
        <span class="setWidth">{{userInfo.serviceQQ}}</span>
      </p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'navMenu',
  data () {
    return {
      pull: false,
      isActive: 0,
      favorWaitPassCount: 0,
      notPassTaskCount: 0,
      orderWaitPassCount: 0,
      toAddFavorCount: 0
    }
  },
  created () {
    // this.pointNum()
  },
  computed: {
    menus: {
      get () {
        return [
          {
            icon: 'el-icon-menu',
            header: '首页',
            routerHead: 'header',
            lines: [
              {
                text: '总览',
                link: 'overView'
                // bradge: this.notPassTaskCount
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            header: '任务管理',
            routerHead: 'order',
            lines: [
              {
                text: '下单',
                link: 'batchOrder'
                // bradge: this.orderWaitPassCount
              },
              {
                text: '任务列表',
                link: 'taskList'
                // bradge: this.toAddFavorCount
              },
              {
                text: '快递单列表',
                link: 'courierList'
                // bradge: this.favorWaitPassCount
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            header: '资金管理',
            routerHead: 'coin',
            lines: [
              {
                text: '充值',
                link: 'coinPay'
              },
              {
                text: '交易流水',
                link: 'coinApply'
              },
              {
                text: '银行卡管理',
                link: 'coinList'
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            header: '地址管理',
            routerHead: 'storeAdmin',
            lines: [
              {
                text: '地址管理',
                link: 'shopAdminList'
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            header: '其它管理',
            routerHead: 'othersAdmin',
            lines: [
              {
                text: '申请底单',
                link: 'pushAdmin'
              },
              {
                text: '公告',
                link: 'myReport'
              }
            ]
          }
        ]
      },
      set (val) {
        return val
      }
    },
    ...mapGetters([
      'userInfo',
      'userMoney'
    ])
  },
  watch: {
    $route () {
      // this.pointNum()
    }
  },
  methods: {
    // pointNum () {
    //   this.$ajax.post('/api/order/search/sellerStatistics', {
    //     sellerUserId: this.userInfo.sellerUserId
    //   }).then((data) => {
    //     console.log(data)
    //     let res = data.data
    //     if (res.code === '200') {
    //       this.notPassTaskCount = res.data.notPassTaskCount
    //       this.orderWaitPassCount = res.data.orderWaitPassCount
    //       this.favorWaitPassCount = res.data.favorWaitPassCount
    //       this.toAddFavorCount = res.data.toAddFavorCount
    //     } else {
    //       this.$message({
    //         message: res.message,
    //         type: 'warning'
    //       })
    //     }
    //   }).catch(() => {
    //     this.$message.error('网络错误，刷新下试试')
    //   })
    // },
    setRouterActive () {
      this.$nextTick(() => {
        let activeRouter = this.$route.path
        if (activeRouter.indexOf('header') !== -1) {
          this.isActive = 0
        } else if (activeRouter.indexOf('order') !== -1) {
          this.isActive = 1
        } else if (activeRouter.indexOf('coin') !== -1) {
          this.isActive = 2
        } else if (activeRouter.indexOf('othersAdmin') !== -1) {
          this.isActive = 3
        }
      })
    },
    personInfo () {
      this.pull = !this.pull
    },
    copyText () {
      // this.pointNum()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.menu
  background #090723
  height 100%
  width 180px
  position fixed
  overflow auto
  .logo
    height 80px
    text-align center
    .img
      position relative
      top 10px
      width 150px
  .router
    .routerBox
      font-size 0
      .routerHeader
        height 40px
        line-height 40px
        color #ffffff
        font-size 16px
        cursor pointer
        position relative
        &.routerHeaderActive
          color $color-hover
        .text
          margin-left 48px
        .icon
          text-align center
          position absolute
          top 12px
          left 20px
      .routerLine
        position relative
        height 40px
        line-height 40px
        color #e7e7e7
        font-size 14px
        cursor pointer
        &:hover
          background $bg-active
          transition background-color 0.3s, color 0.3s
          &::before
            content ''
            height 100%
            width 5px
            background $bg-red
            position absolute
            transition all 0.3s
        &.router-link-active
          background $bg-active
          &::before
            content ''
            height 100%
            width 5px
            background $bg-red
            position absolute
        .text
          margin-left 48px
        .bradge
          position absolute
          height 12px
          line-height 12px
          margin 12px 0
          right 15px
          background $bg-red
          border-radius 10px
          padding 2px 4px
          text-align center
  .state
    margin-top 36px
    margin-bottom 40px
    margin-left 10px
    color #FFFFFF
    font-size 14px
    .balance
      margin-top 12px
      .qq
        vertical-align top
        line-height 20px
      .setWidth
        vertical-align top
        width 100px
        // background red
        display inline-block
        word-break break-all
        word-wrap break-word
        line-height 20px
</style>
