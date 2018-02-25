<template>
  <div class="login">
    <div class="logo">
      <!-- <h2>包裹网 </h2> -->
    </div>
    <div class="cont">
      <div class="board">
        <h2>登&nbsp;录</h2>
        <div class="inputCont" @keyup.13="login">
          <div class="input">
            <span class="el-icon-edit"></span>
            <input type="text" placeholder="输入账号" v-model="username">
          </div>
          <div class="input">
            <span class="el-icon-edit-outline"></span>
            <input type="password" placeholder="输入登录密码" v-model="password">
            <h3 class="textBottom">系统已升级，登入账户更改为绑定手机号、初始密码为：123456 登入后请尽快修改密码</h3>
          </div>
          <button @click="login">登&nbsp;录</button>
          <h3>
            <router-link :to="{name:'Password'}">
              <span>忘记密码</span>
            </router-link>
            <router-link :to="{name:'reg'}">
              <span style="margin-right:20px">注册</span>
            </router-link>
          </h3>
        </div>
      </div>
    </div>
    <el-dialog title="绑定手机号" :visible.sync="dialogVisible" width="390px" :before-close="handleClose" :modal-append-to-body='false'>
      <div class="contTwo">
        <div class="board">
          <h2>请绑定您的手机号,便于更好的为您服务</h2>
          <div class="inputCont">
            <div class="input">
              <img src="../../assets/image/phone.png" alt="">
              <input @input="isCanUse" v-model="phoneNum" type="number" placeholder="输入手机号" autofocus>
            </div>
            <div class="inputCode">
              <div class="smInput input" :class="{'actives':focusCode}">
                <img src="../../assets/image/password.png" alt="">
                <input type="text" v-model="code" placeholder="输入验证码">
              </div>
              <span class="testButton" v-show="!isCan">
                验证码
              </span>
              <span class="testButton" :class="{'active':isSendMsg}" v-show="isCan">
                <span v-show="show" @click="send">获取验证码</span>
                <span v-show="!show">{{time}} s</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureBind">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import md5 from 'md5'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      ip: '',
      dialogVisible: false,
      phoneNum: '',
      code: '',
      show: false,
      isCan: false,
      time: 60
    }
  },
  methods: {
    login () {
      if (this.username === '' || this.password === '') {
        this.$message({
          message: '请输入正确用户名或密码',
          type: 'warning'
        })
        return false
      } else if (this.password.length < 6) {
        this.$message({
          message: '密码不少于6位',
          type: 'warning'
        })
        return false
      } else {
        // 登录
        this.$ajax.post('/api/seller/login', {
          telephone: this.username,
          password: md5(this.password)
        }).then((data) => {
          if (data.data.code === '200') {
            this.setUserInfo(data.data.data)
            this.setUserToken(data.headers.accesstoken)
            if (data.data.data.status === '2') {
              this.$message({
                message: '您的账号已被冻结,请及时联系管理员',
                type: 'warning'
              })
              return false
            } else if (data.data.data.telephoneBound === '0') {
              this.dialogVisible = true
              this.phoneNum = data.data.data.bindingTelephone
              if (/^1[34578]\d{9}$/.test(this.phoneNum)) {
                this.isCan = true
                this.isSendMsg = true
                this.show = true
              } else {
                this.isCan = false
              }
            } else {
              this.$message({
                message: '登录成功,页面跳转中...',
                type: 'success',
                onClose: () => {
                  this.$router.push({ name: 'overView' })
                }
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
          this.$message.error('服务器错误！')
        })
      }
    },
    isCanUse () {
      if (/^1[34578]\d{9}$/.test(this.phoneNum)) {
        this.isCan = true
        this.isSendMsg = true
        this.show = true
      } else {
        this.isCan = false
      }
    },
    send () {
      this.isSendMsg = false
      this.$ajax.post('/api/config/sms/sendSms', {
        telephone: this.phoneNum,
        type: 1
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
          let me = this
          me.show = false
          let interval = window.setInterval(function () {
            if ((me.time--) <= 0) {
              me.time = 60
              me.show = true
              this.isCan = true
              me.isSendMsg = true
              window.clearInterval(interval)
            }
          }, 1000)
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
    sureBind () {
      this.$ajax.post('/api/seller/bindingTelephone', {
        telephone: this.username,
        bindingTelephone: this.phoneNum,
        type: 1,
        code: this.code
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            message: '绑定成功,跳转中....',
            type: 'success',
            onClose: () => {
              this.$router.push({ name: 'overView' })
            }
          })
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
    ...mapActions([
      'setUserInfo',
      'setUserToken'
    ]),
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>
<style lang="stylus" scoped>
.login
  position fixed
  min-width 800px
  width 100%
  height 100%
  background #f8f8f8
  .logo
    font-size 30px
    height 75px
    padding 26px 45px
    overflow hidden
    img
      height 75px
      float left
      vertical-align middle
    span
      font-size 18px
      line-height 33px
      margin-left 12px
      color #FF2933
  .cont
    display flex
    justify-content space-around
    align-content center
    height calc(100% - 200px)
    background url('../../assets/image/bg.png') no-repeat
    background-size 1980px
    .text
      align-self center
      font-size 24px
      line-height 33px
      color #ffffff
    .board
      align-self center
      background #ffffff
      border 1px solid #cccccc
      box-shadow 0 1px 12px rgba(255, 255, 255, 0.5)
      h2
        font-size 24px
        color #7c7c7c
        line-height 60px
        box-shadow 0 1px 0 #cfc9c9
        text-align center
      .inputCont
        padding 30px
        .input
          width 310px
          height 22px
          border 1px solid #cccccc
          padding 15px 8px
          margin-bottom 16px
          span
            display inline-block
            width 24px
            height 24px
            text-align center
          input
            width 250px
            margin-left 15px
            outline none
            border none
            font-size 16px
            line-height 22px
          .textBottom
            margin-top 10px
            line-height 20px
            font-size 12px
        button
          margin-top 40px
          width 100%
          border none
          outline none
          line-height 52px
          color #ffffff
          font-size 16px
          background #ff3341
          cursor pointer
          border-radius 2px
          margin-bottom 16px
          &:hover
            background #ff3341
          &:active
            color white
        h3
          overflow hidden
          span
            font-size 12px
            float right
            line-height 38px
            cursor pointer
            &:hover
              color red
  .contTwo
    display flex
    justify-content space-around
    align-content center
    height calc(100% - 200px)
    .text
      align-self center
      font-size 24px
      line-height 33px
      color #ffffff
    .board
      align-self center
      background #ffffff
      // border 1px solid #BAC6DC
      box-shadow 0 1px 12px rgba(255, 255, 255, 0.5)
      h2
        color #525F75
        line-height 60px
        box-shadow 0 1px 0 #cfc9c9
        text-align center
      .inputCont
        padding 30px
        overflow hidden
        position relative
        .inputCode
          display flex
          .smInput
            width 176px
            height 16px
            border 1px solid #BAC6DC
            padding 14px 9px
            margin-bottom 24px
            span
              display inline-block
              width 24px
              height 24px
              text-align center
            input
              margin-left 15px
              width 130px
              outline none
              border none
              font-size 16px
              line-height 16px
            :-moz-placeholder /* Mozilla Firefox 4 to 18 */
              color lightgray
            ::-moz-placeholder /* Mozilla Firefox 19+ */
              color lightgray
            input:-ms-input-placeholder
              color lightgray
            input::-webkit-input-placeholder
              color lightgray
          .testButton
            display inline-block
            border-radius 2px
            text-align center
            cursor pointer
            margin-left 23px
            width 108px
            height 44px
            line-height 44px
            color #ffffff
            background #BAC6DC
            font-size 16px
          .testButtonPic
            display inline-block
            border-radius 2px
            text-align center
            cursor pointer
            margin-left 23px
            width 108px
            height 30px
            line-height 30px
            // color red
            // background white
            border 1px solid #BAC6DC
            font-size 16px
          .change
            position absolute
            right 60px
            top 135px
            font-size 12px
            color #40B6FF
            cursor pointer
          .active
            background #40b6ff
          .actives
            border 1px solid #40b6f2
        .input
          width 310px
          height 16px
          border 1px solid #BAC6DC
          padding 14px 9px
          margin-bottom 17px
          img
            display inline-block
            // width 24px
            height 24px
            text-align center
            vertical-align middle
          input
            width 250px
            margin-left 15px
            outline none
            border none
            font-size 16px
            line-height 22px
          :-moz-placeholder /* Mozilla Firefox 4 to 18 */
            color lightgray
          ::-moz-placeholder /* Mozilla Firefox 19+ */
            color lightgray
          input:-ms-input-placeholder
            color lightgray
          input::-webkit-input-placeholder
            color lightgray
        .pCont
          margin-bottom 42px
          &:after
            content '6-18位数字/字母'
            display inline-block
            font-size 12px
            color #525F75
            line-height 28px
            margin-top 5px
        .left
          float left
          width 176px
        .right
          float left
          width 108px
        button
          clear both
          width 100%
          border none
          outline none
          line-height 52px
          color #ffffff
          font-size 16px
          background #40b6ff
          cursor pointer
          border-radius 2px
          margin-bottom 16px
          &:hover
            background #40b6f2
        h3
          overflow hidden
          span
            font-size 14px
            float right
            line-height 38px
            cursor pointer
            color #525F75
            // :hover
            // color #40b6ff
        .actives
          border 1px solid #40b6f2
</style>