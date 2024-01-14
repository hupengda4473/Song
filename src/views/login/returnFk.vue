<template>
  <div class="containerPage">
    <div class="gofkMain">
      <img class="txImg" src="@/assets/imgs/99.png" alt="">
      <el-form label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item label="姓名" class="activeBorder">
          <el-input v-model="formLabelAlign.name" placeholder="请输入您的姓名" />
        </el-form-item>
        <el-form-item label="手机号" class="activeBorder">
          <el-input v-model="formLabelAlign.region" placeholder="请输入您的手机号码" />
        </el-form-item>

      </el-form>
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-form-item label="反馈内容">
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
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="3"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus" />
            <div slot="tip" class="el-upload__tip" style="color:#EC504A ">最多上传三张，大小不能超过20兆</div>
          </el-upload>

        </el-form-item>
        <el-form-item label="添加视频">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="3"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
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
export default {
  name: 'ReturnFk',
  data() {
    return {
      dialogImageUrl: '',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  created() {
    this.$route.meta.title = '向代表' + this.$route.query.title + '反馈'
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    submitFk() {
      this.$router.push({ path: '/feedback/successFK' })
    },
    jumpSy() {
      this.$router.push({ path: '/feedback/login' })
    }
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
   text-align: right;
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
</style>
