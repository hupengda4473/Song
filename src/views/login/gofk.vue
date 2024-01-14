<template>
  <div class="containerPage">
    <div class="gofkMain">
      <img class="txImg" :src="'http://39.98.182.184/mfs/open/file/download/' + userInfo.avatar" alt="">
      <div class="gofkInfo">
        <el-row :gutter="20" class="gofkInfoLi">
          <el-col class="infoText active" :span="8">姓名：</el-col>
          <el-col class="infoText" :span="16">{{ userInfo.name }}</el-col>
        </el-row>
        <el-row :gutter="20" class="gofkInfoLi">
          <el-col class="infoText active" :span="8">所属单位：</el-col>
          <el-col class="infoText" :span="16">{{ userInfo.dept }}</el-col>
        </el-row>
        <el-row :gutter="20" class="gofkInfoLi">
          <el-col class="infoText active" :span="8">代表级别：</el-col>
          <el-col class="infoText" :span="16">{{ userInfo.level }}</el-col>
        </el-row>
        <el-row :gutter="20" class="gofkInfoLi">
          <el-col class="infoText active" :span="8">联系电话：</el-col>
          <el-col class="infoText" :span="16">{{ userInfo.phone }}</el-col>
        </el-row>
      </div>
      <el-button class="gofkBtn" type="danger" round @click="jumpReturnFk">向我反馈</el-button>
      <el-button class="gofkBtn" type="danger" round plain @click="jumpSy">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gofk',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.userInfo = JSON.parse(this.$route.query.data)
  },
  methods: {
    jumpReturnFk() {
      this.$router.push({ path: '/feedback/returnFk', query: { data: this.$route.query.data }})
    },
    jumpSy() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.gofkMain{
  background: #ffffff;
  overflow: hidden;
  margin: .3rem;
  border-radius: 6px;
  padding: .25rem .25rem .4rem;
  .txImg{
    width: 3rem;
    height: 4rem;
    border-radius: 8px;
    display: block;
    margin: 0.5rem auto;
  }
  .gofkInfo{
    border-top: 1px solid #dddddd;
    padding: 0 .4rem;
    margin-bottom: .8rem;
    .gofkInfoLi{
      margin-top: .5rem;
    }
  }
  .infoText{
    font-size: .45rem;
  }
  .active{
    color: #EC504A;
  }
}
.gofkBtn{
  display: block;
  width: 85%;
  height: 1.1rem;
  margin: 0.35rem auto;
  font-size: .38rem;
}
</style>
