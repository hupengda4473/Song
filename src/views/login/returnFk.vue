<template>
  <div class="containerPage">
    <div class="gofkMain">
      <img class="txImg" :src="'http://39.98.182.184/mfs/open/file/download/' + userInfo.avatar" alt="">
      <el-form ref="formRef" label-position="left" label-width="80px" :rules="rules" :model="formLabelAlign">
        <el-form-item label="姓名" class="activeBorder" prop="name">
          <el-input v-model="formLabelAlign.name" placeholder="请输入您的姓名" />
        </el-form-item>
        <el-form-item label="手机号" class="activeBorder" prop="region">
          <el-input v-model="formLabelAlign.region" placeholder="请输入您的手机号码" />
        </el-form-item>
        <el-form-item label="验证码" class="activeBorder" prop="code">
          <el-input v-model="formLabelAlign.code" placeholder="请输入验证码">
            <template slot="append">
              <div class="getCode" @click="getCodeFun">获取验证码</div>
            </template>
          </el-input>
        </el-form-item>

      </el-form>
      <el-form ref="typeFormRef" label-position="top" :rules="rules" label-width="80px" :model="formLabelAlign">
        <el-form-item label="反馈内容" prop="type">
          <el-input
            v-model="formLabelAlign.type"
            type="textarea"
            :rows="4"
            placeholder="请输入反馈内容"
            maxlength="30"
            show-word-limit
          /></el-form-item>
        <el-form-item label="添加照片">
          <el-upload
            action="/mfs/open/file/upload"
            list-type="picture-card"
            :limit="3"
            :on-change="imgChange"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus" />
            <div slot="tip" class="el-upload__tip" style="color:#EC504A ">最多上传三张，大小不能超过20兆</div>
          </el-upload>

        </el-form-item>
        <el-form-item label="添加视频">
          <el-upload
            action="/mfs/open/file/upload"
            list-type="picture-card"
            :limit="3"
            :on-preview="handlePictureCardPreview"
            :on-change="videoChange"
            :on-remove="handleRemoveVideo"
          >
            <i class="el-icon-plus" />
          </el-upload>

        </el-form-item>
      </el-form>
      <el-button class="gofkBtn" type="danger" round @click="submitFk">提交反馈</el-button>
      <el-button class="gofkBtn" type="danger" round plain @click="jumpSy">返回首页</el-button>
    </div>
  </div>
</template>

<script>
import { JSEncrypt } from 'jsencrypt'
import { sendFeedbackCode, feedbackSave } from '@/api/feedback'
const PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs5Ix5cnKnLj0EOnOQUepZ+FndV8mKYUEDGL4hLLF7JToSMqE6p6aTqJu4e4W/GIbck/nv3v4yxdC/kwxhdEzZCNLwPCeT49EiLCwKNo9dTRlTNZNoNfxJQ+4oNKpLejQ1VJZtKdQrDGclfaTn3LKmmSphm7UenfBIni1RWzMONnsglkDW/rUEhCDGX8Yc9yXR3N1Vk87UhoarrY957WBkUf5U11g8p+H+2WpR5Ti40+t+lvFfdD2KBFvJX4tJv2P4dshrZxZjBbE/zJA+9x1sPZIeDjzjqaAaOe+VkkbaIJT1rSytsPRxslGg1jfrCzMm6cWgq1OiGOt0LCCam19YQIDAQAB'
export default {
  name: 'ReturnFk',
  data() {
    return {
      userInfo: {},
      rules: {
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请输入您的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入反馈内容', trigger: 'blur' }
        ],
      },
      dialogImageUrl: '',
      imgList: [],
      videoList: [],
      formLabelAlign: {
        name: '',
        code: '',
        region: '',
        type: ''
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(this.$route.query.data)
  },
  methods: {
    handleRemove(file, fileList) {
      this.imgList = fileList
    },
    videoChange(file, fileList) {
      this.videoList = fileList
    },
    handleRemoveVideo(file, fileList) {
      this.videoList = fileList
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    imgChange(file, fileList) {
      this.imgList = fileList
    },
    submitFk() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$refs.typeFormRef.validate((valid) => {
            if (valid) {
              let imgArr = []
              if (this.imgList && this.imgList.length > 0) {
                for (let item of this.imgList) {
                  imgArr.push(item.response.data.id)
                }
              }
              let videoArr = []
              if (this.videoList && this.videoList.length > 0) {
                for (let item of this.videoList) {
                  videoArr.push(item.response.data.id)
                }
              }
              let params = {
                code: this.formLabelAlign.code,
                feedback: this.formLabelAlign.type,
                name: this.formLabelAlign.name,
                phone: this.formLabelAlign.region,
                representId: this.userInfo.id,
                userId: JSON.parse(localStorage.getItem('rendafankui_userinfo')).id,
                feedbackImg: imgArr.join(','),
                feedbackMp4: videoArr.join(',')
              }
              feedbackSave(params).then(res => {
                console.log(res)
                if (res.code === 200) {
                  this.$router.push({ path: '/feedback/successFK' })
                } else {
                  this.$message.error('请输入正确的手机号')
                }
              })
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    jumpSy() {
      this.$router.push({ path: '/feedback/login' })
    },
    getCodeFun() {
      if (!this.formLabelAlign.region) {
        return this.$message.error('请输入您的手机号')
      }
      let reg = /^1\d{10}$/
      if (!reg.test(this.formLabelAlign.region)) {
        return this.$message.error('请输入正确的手机号')
      }

      let encrypt = new JSEncrypt()
      encrypt.setPublicKey(PUBLIC_KEY)
      let encrypted = encrypt.encrypt(this.formLabelAlign.region)
      const params = {
        code: '',
        phone: encrypted
      }
      sendFeedbackCode(params).then(res => {
        console.log(res.msg.slice(-4))
        if (res.code !== 200) {
          return this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
.gofkMain {
  background: #ffffff;
  overflow: hidden;
  margin: .3rem;
  border-radius: 6px;
  padding: .25rem .25rem .4rem;

  .txImg {
    width: 3rem;
    height: 4rem;
    border-radius: 8px;
    display: block;
    margin: 0.5rem auto;
  }
 ::v-deep .el-input--medium .el-input__inner{
    border: none;
   text-align: left;
  }
  .activeBorder{
    border-bottom: 1px solid #ececec;
  }
  ::v-deep .el-textarea__inner{
    border: none;
    background: #F7F7F7;
    display: block;
    width: 100%;
  }
  ::v-deep .el-textarea .el-input__count{
    background: #F7F7F7;
  }
  ::v-deep .el-upload--picture-card,
  ::v-deep .el-upload-list__item{
    width: 2.65rem;
    height: 2.65rem;
  }
}
.gofkBtn{
  display: block;
  width: 85%;
  height: 1.1rem;
  margin: 0.45rem auto;
  font-size: .38rem;
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
.getCode{
  color: red;
}
</style>
