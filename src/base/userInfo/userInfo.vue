<template>
  <div class="userTitle">
    <div class="cont">
      <div class="record">
        <span>余额:¥{{getMon}}</span>
        <span>等级:{{this.userInfo.levelDetail}}</span>
        <span>圆通:¥{{this.userInfo.price}}/单</span>
      </div>
      <div class="info" @click="showInfo=!showInfo">
        <img src="../../assets/image/huaxia.png" alt="">
        <span>{{this.userInfo.telephone}}</span>
        <a class="el-icon-caret-bottom"></a>
        <transition :name="showInfo ? 'el-fade-in-linear' : 'el-fade-in'">
          <ul class="operate" :class="{ 'fadeIn': showInfo, 'fadeOut': !showInfo }" v-show="showInfo">
            <li @click="showPass=true">
              <span>修改密码</span>
            </li>
            <li @click="logout">
              <span>退出登录</span>
            </li>
          </ul>
        </transition>
      </div>
    </div>
    <div class="alert">
      <el-dialog title="修改登录密码" :visible.sync="showPass" :modal-append-to-body="false" width="600px">
        <div class="list">
          <span>输入原密码</span>
          <el-input v-model="fixPassObj.oldpass" type="password" style="width:300px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="list">
          <span>输入新密码</span>
          <el-input v-model="fixPassObj.newpass1" type="password" style="width:300px;" placeholder="请输入内容"></el-input>
        </div>
        <div class="list">
          <span>重新输入新密码</span>
          <el-input v-model="fixPassObj.newpass2" type="password" style="width:300px;" placeholder="请输入内容"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showPass = false">取 消</el-button>
          <el-button type="primary" @click="fixPass">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import md5 from 'md5'
export default {
  name: 'userTitle',
  data () {
    return {
      showPass: false,
      showInfo: false,
      task: false,
      getMon: '',
      fixPassObj: {
        oldpass: '',
        newpass1: '',
        newpass2: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    $route () {
      this.getMoney()
    }
  },
  mounted () {
    this.getMoney()
  },
  methods: {
    logout () {
      this.$confirm('确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ name: 'login' })
      }).catch((err) => {
        console.error(err)
      })
    },
    fixPass () {
      this.$ajax.post('/api/seller/changePwd', {
        sellerAccoountId: this.userInfo.sellerAccountId,
        oldPwd: md5(this.fixPassObj.oldpass),
        newPwd: md5(this.fixPassObj.newpass1),
        rePwd: md5(this.fixPassObj.newpass2)
      }).then((data) => {
        if (data.data.code === '200') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.showPass = false
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
.userTitle
  position relative
  z-index 998
  height 36px
  font-size 12px
  background #ffffff
  box-shadow 0 2px 0 #E8EBF0
  .cont
    float right
    display flex
    text-align right
    >div
      line-height 36px
    .record
      margin-right 24px
      font-size 12px
      color #666
      span
        margin-right 12px
    .info
      cursor pointer
      position relative
      margin-right 10px
      img
        width 18px
        height 18px
        border-radius 50%
        vertical-align middle
      .operate
        position fixed
        top 36px
        right 0
        z-index 999
        width 146px
        background #ffffff
        text-align center
        transition all 0.3s
        box-shadow 0 2px 4px rgba(82, 95, 117, 0.18)
        li
          height 50px
          line-height 50px
          font-size 14px
          color #525F75
          i
            display inline-block
            width 20px
            height 20px
            margin 0 20px
          &:hover
            background #EEF8FF
  .alert
    .list
      padding 0 20px 0 40px
      font-size 14px
      color #525F75
      margin-top 20px
      span
        display inline-block
        min-width 100px
        text-align right
        margin-right 20px
</style>