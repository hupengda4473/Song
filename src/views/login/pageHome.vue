<template>
  <div class="containerPage">
    <div class="homeUL">
      <div v-for="(i,key) in this.representList" :key="key" class="homeLi">
        <img :src="'http://39.98.182.184/mfs/open/file/download/' + i.avatar" alt="">
        <span class="name">{{ i.name }}</span>
        <el-button class="Btn" type="danger" @click="jumpGofk(i)">反馈</el-button>
      </div>
    </div>
    <div class="feedback">
      <div class="leftIcon">
        <i class="el-icon-chat-line-round" />
      </div>
      <span class="name">向平台反馈</span>
      <div class="goRight">去反馈 <i class="el-icon-arrow-right" /></div>
    </div>
    <div class="footer">
      <div class="footerLI">
        <img src="@/assets/imgs/sy.png" alt="">
        <span class="active">首页</span>
      </div>
      <div class="footerLI" @click="jumpFK">
        <img src="@/assets/imgs/fk_h.png" alt="">
        <span>代表反馈</span>
      </div>
      <div class="footerLI" @click="jumpMy">
        <img src="@/assets/imgs/my_h.png" alt="">
        <span>个人中心</span>
      </div>
    </div>
    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="80%"
      :before-close="handleClose"
      custom-class="loginModal"
      center
    >

      <el-form ref="loginRef" :rules="rules" :model="loginModal" label-width="80px">
        <el-form-item label="手机号" prop="phone" class="activeBorder">
          <el-input v-model="loginModal.phone" placeholder="请输入您的手机号" />
        </el-form-item>
        <el-form-item label="验证码" prop="code" class="activeBorder">
          <el-input v-model="loginModal.code" placeholder="请输入验证码">
            <template slot="append">
              <div class="getCode" @click="getCodeFun">获取验证码</div>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" :style="{padding: '10px 50px'}" round @click="loginFun">确定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import { JSEncrypt } from 'jsencrypt'
import { getRepresent } from '@/api/deputy'
import { getUserInfo } from '@/api/user'
import { sendLoginCode, phoneLogin } from '@/api/login'
const PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs5Ix5cnKnLj0EOnOQUepZ+FndV8mKYUEDGL4hLLF7JToSMqE6p6aTqJu4e4W/GIbck/nv3v4yxdC/kwxhdEzZCNLwPCeT49EiLCwKNo9dTRlTNZNoNfxJQ+4oNKpLejQ1VJZtKdQrDGclfaTn3LKmmSphm7UenfBIni1RWzMONnsglkDW/rUEhCDGX8Yc9yXR3N1Vk87UhoarrY957WBkUf5U11g8p+H+2WpR5Ti40+t+lvFfdD2KBFvJX4tJv2P4dshrZxZjBbE/zJA+9x1sPZIeDjzjqaAaOe+VkkbaIJT1rSytsPRxslGg1jfrCzMm6cWgq1OiGOt0LCCam19YQIDAQAB'
export default {
  name: 'PageHome',
  data() {
    const judgeCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      loginModal: {
        phone: '',
        code: '',
        resCode: ''
      },
      userInfo: {},
      rules: {
        phone: [
          { required: true, message: '请输入您的手机号', trigger: 'blur' },
        ],
        code: [
          { required: true, validator: judgeCode, trigger: 'blur' }
        ],
      },
      representList: []
    }
  },
  mounted() {
    // this.getUserInfoData()
    this.judgeUserLogin()
  },
  methods: {
    jumpFK() {
      this.$router.push({ path: '/feedback/reply', query: { name: '11', age: '11' }})
    },
    jumpMy() {
      this.$router.push({ path: '/feedback/myInfo', query: { name: '11', age: '11' }})
    },
    jumpGofk(e) {
      this.$router.push({ path: '/feedback/gofk', query: { data: JSON.stringify(e) }})
    },
    judgeUserLogin() {
      let userInfo = localStorage.getItem('rendafankui_userinfo')
      if (!userInfo) {
        return this.dialogVisible = true
      }
      this.getRepresentData()
    },
    getRepresentData() {
      getRepresent().then(res => {
        this.representList = res.data.list || []
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    getCodeFun(){
      if (!this.loginModal.phone) {
        return this.$message.error('请输入您的手机号')
      }
      let reg = /^1\d{10}$/
      if (!reg.test(this.loginModal.phone)){
        return this.$message.error('请输入正确的手机号')
      }

      let encrypt = new JSEncrypt()
      encrypt.setPublicKey(PUBLIC_KEY)
      let encrypted = encrypt.encrypt(this.loginModal.phone)
      const params = {
        code: '',
        phone: encrypted
      }
      sendLoginCode(params).then(res => {
        console.log(res.msg.slice(-4))
        if (res.code !== 200) {
          return this.$message.error(res.msg)
        }
        this.loginModal.resCode = res.msg.slice(-4)
      })
    },
    getUserInfoData() {
      getUserInfo().then(res => {
        localStorage.setItem('rendafankui_userinfo', JSON.stringify(res.data))
        this.getRepresentData()
      })
    },
    loginFun() {
      this.$refs.loginRef.validate((valid) => {
        if (valid) {
          let encrypt = new JSEncrypt()
          encrypt.setPublicKey(PUBLIC_KEY)
          let encrypted = encrypt.encrypt(this.loginModal.phone)
          const params = {
            code: this.loginModal.code,
            phone: encrypted
          }
          phoneLogin(params).then(res => {
            console.log(res)
            if (res.msg === '验证码不匹配，请重试') {
              return this.$message.error('验证码不匹配，请重试')
            }
            localStorage.setItem('rendafankui_token', res.data)
            this.dialogVisible = false
            this.getUserInfoData()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.containerPage{
  max-width: 750px;
  margin: 0 auto;
  background: #F9F9F9;
  min-height: 100vh;
  overflow: hidden;
}
.homeUL{
  overflow: hidden;
  padding:.5rem .3rem 0;
  .homeLi{
    overflow: hidden;
    margin-bottom: .5rem;
    padding: .3rem;
    background: #ffffff;
    img{
      width: 2rem;
      float: left;
      border-radius: 1rem;
    }
    .name{
      float: left;
      font-size: .45rem;
      margin-left: .5rem;
      margin-top: .8rem;
    }
    .Btn{
      float: right;
      font-size: .35rem;
      margin-top: .5rem;
    }
  }
}
.feedback{
  background: #ffffff;
  margin: 0rem .3rem 3rem .3rem;
  padding: .3rem;
  overflow: hidden;
  .leftIcon{
    border: 1px solid #FDE4E5;
    border-radius:4px;
    float: left;
    padding: .2rem;
    background: #FFF6F7;
    i{
      font-size: 1.4rem;
      color: #EE5960;
    }
  }
  .name{
    font-size: .45rem;
    float: left;
    margin-left: .2rem;
    margin-top: .55rem;
  }
  .goRight{
    font-size: .45rem;
    color: #EE5960;
    float: right;
    margin-top: .55rem;
    i{
      font-size: .45rem;
    }

  }
}
.getCode{
  color: red;
}
::v-deep .loginModal{
  border-radius: 20px;
}
::v-deep .el-input--medium .el-input__inner{
  border: none;
  text-align: left;
}
::v-deep .el-input-group__append{
  padding: 0;
  border: none;
  background-color: transparent;
}
::v-deep .el-dialog__body{
  padding-bottom: 14px;
}
.activeBorder{
  border-bottom: 1px solid #ececec;
}
</style>
