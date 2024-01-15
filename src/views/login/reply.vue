<template>
  <div class="containerPage">
    <div class="gofkMain">
      <div class="detailUl">
        <div v-for="(i,key) in dataList" :key="key" class="detailLi">
          <div class="top">
            <img class="txImg" :src="'http://39.98.182.184/mfs/open/file/download/' + i.representAvatar" alt="">
            <div class="text">
              <span class="name">{{ i.representName }}</span>
              <span class="phone">{{ i.phone }}</span>
              <span class="goDetail" @click="jumpDetail(i.id)">详情 ></span>
            </div>
          </div>
          <div class="detailMain">
            <div class="title">反馈内容</div>
            <div class="text">{{ i.feedback }}</div>
          </div>
          <div v-if="i.status == 1" class="line" />
          <div v-if="i.status == 1" class="top">
            <i class="el-icon-user-solid tx" />
            <div class="text">
              <span class="name">古亚男</span>
            </div>
          </div>
          <div v-if="i.status == 1" class="detailMain">
            <div class="title active">回复内容</div>
            <div class="text">{{ i.reply }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footerLI" @click="jumpSY">
        <img src="@/assets/imgs/sy_h.png" alt="">
        <span>首页</span>
      </div>
      <div class="footerLI" @click="jumpFK">
        <img src="@/assets/imgs/fk.png" alt="">
        <span class="active">代表反馈</span>
      </div>
      <div class="footerLI" @click="jumpMy">
        <img src="@/assets/imgs/my_h.png" alt="">
        <span>个人中心</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getFeedbackList } from '@/api/feedback'
export default {
  name: 'Reply',
  data() {
    return {
      dataList: []
    }
  },
  mounted() {
    this.getFeedbackListData()
  },
  methods: {
    jumpDetail(id) {
      this.$router.push({ path: '/feedback/fkDetail', query: { id: id }})
    },
    jumpSY() {
      this.$router.push({ path: '/feedback/login' })
    },
    jumpFK() {
      this.$router.push({ path: '/feedback/reply', query: { name: '11', age: '11' }})
    },
    jumpMy() {
      this.$router.push({ path: '/feedback/myInfo', query: { name: '11', age: '11' }})
    },
    getFeedbackListData() {
      getFeedbackList('').then(res => {
        console.log(res)
        this.dataList = res.data.list
      })
    }
  }
}
</script>

<style scoped lang="scss">
.gofkMain{
  padding-bottom: 2rem;
  overflow: hidden;
  margin: .3rem;
  border-radius: 6px;}
.detailUl{
  .detailLi{
    overflow: hidden;
    background: #ffffff;
    padding: .25rem .25rem .4rem;
    margin-bottom: .3rem;
    .top{
      overflow: hidden;
      display: flex;
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
        width: 7rem;
        .name{
          margin-left: .5rem;
          margin-right: .6rem;
        }
        .goDetail{
          float: right;
          font-size: .4rem;
          color: #999;
        }
      }
    }
    .line{
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #eeeeee;
    }
    .detailMain{
      overflow: hidden;

      padding-bottom: .8rem;
      .title{
        font-size: .4rem;
        color: #1a1a1a;
        //margin-top: .5rem;
      }
      .active{
        color: #EC504A;
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
.txImg {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 8px;
  display: block;
  margin: 0.5rem auto;
}
</style>
