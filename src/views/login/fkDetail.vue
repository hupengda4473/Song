<template>
  <div class="containerPage">
    <div class="gofkMain">
      <div class="detailUl">
        <div v-for="(i,key) in 3" :key="key" class="detailLi">
          <div class="top">
            <i class="el-icon-user-solid tx" />
            <div class="text">
              <span class="name">李红</span>
              <span class="phone">13316565656</span>
            </div>
          </div>
          <div class="detailMain">
            <div class="title">反馈内容</div>
            <div class="text">
              fankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhffankuineisalkjlkahfljksdhf
            </div>
            <div class="imgList">
              <img src="@/assets/imgs/99.png" alt="">
              <img src="@/assets/imgs/99.png" alt="">
              <img src="@/assets/imgs/99.png" alt="">
            </div>
            <div class="time">
              反馈时间：2024年1月6日
            </div>
          </div>
        </div>
      </div>
      <el-button class="gofkBtn" type="danger" round plain @click="jumpMy">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FkDetail',
  created() {
    this.$route.meta.title = this.$route.query.title + '的反馈'
  },
  methods: {
    jumpMy() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.gofkMain{

  overflow: hidden;
  margin: .3rem;
  border-radius: 6px;
  //padding: .25rem .25rem .4rem;
  .detailUl{
    .detailLi{
      overflow: hidden;
      background: #ffffff;
      padding: .25rem .25rem .4rem;
      margin-bottom: .3rem;
      .top{
        overflow: hidden;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: .4rem;
        .tx{
          width: 1.5rem;
          height: 1.5rem;
          margin-top: .6rem;
          color: #ffffff;
          border-radius: 50%;
          text-align: center;
          line-height: 1.5rem;
          font-size: 1rem;
          background: #EC504A;
          float: left;

        }
        .text{
          float: left;
          font-size: .4rem;
          margin-top: 1rem;
          .name{
            margin-left: .5rem;
            margin-right: .6rem;
          }

        }
      }

      .detailMain{
        overflow: hidden;
        .title{
          font-size: .5rem;
          margin-top: .5rem;
        }
        .text{
          font-size: .4rem;
          color: #666666;
          word-wrap: break-word;
          margin-top: .3rem;
        }
        .imgList{
          margin-top: .8rem;
          img{
            width: 2.2rem;
            height: 2.2rem;
            margin-right: .2rem;
            border-radius: 12px;
          }
        }
        .time{
          font-size: .3rem;
          color: #999;
        }
      }
    }
  }
}
.gofkBtn{
  display: block;
  width: 85%;
  height: 1.1rem;
  margin: 0.65rem auto 3rem;
  font-size: .38rem;
}
</style>
