<template>
  <div class="containerPage">
    <div class="gofkMain">
      <div style="text-align: center">
        <i class="el-icon-circle-check txImg" />
      </div>
      <div class="sucText">反馈已提交成功，</div>
      <div class="sucText">请耐心等待代表回复。</div>
    </div>
    <el-button class="gofkBtn" type="danger" round @click="jumpSy">返回首页</el-button>
    <el-button class="gofkBtn" type="danger" round plain @click="showList">查看反馈记录</el-button>
  </div>
</template>

<script>
export default {
  name: 'SuccessFK',
  methods: {
    jumpSy() {
      this.$router.push({ path: '/feedback/login' })
    },
    showList() {
      this.$router.push({ path: '/feedback/myInfo' })
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
   font-size: 3rem;
    color: #70C33E;
    border-radius: 8px;
    display: inline-block;
    margin: 0.5rem auto;
  }
  .sucText{
    font-size: .4rem;
    text-align: center;
    line-height: 1.6;
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
