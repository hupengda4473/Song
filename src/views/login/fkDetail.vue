<template>
  <div ref="containerPageRef" class="containerPage">
    <div class="gofkMain">
      <div class="detailUl">
        <div class="detailLi">
          <div class="top">
            <img :src="'http://39.98.182.184/mfs/open/file/download/' + info.representAvatar" alt="">
            <div class="text">
              <span class="name">{{ info.representName }}</span>
              <span class="phone">{{ info.phone }}</span>
            </div>
          </div>
          <div class="detailMain">
            <div class="title">反馈内容</div>
            <div class="text">{{ info.feedback }}</div>
            <div class="imgList">
              <el-image
                v-for="(item, index) in info.feedbackImg.split(',')"
                :key="index"
                style="width: 100px; height: 100px"
                :src="'http://39.98.182.184/mfs/open/file/download/' + item"
                :preview-src-list="getSrcList( info.feedbackImg)"
              />
            </div>
            <div class="imgList">
              <Video
                v-for="(item, index) in info.feedbackMp4.split(',')"
                :key="index"
                :src="'http://39.98.182.184/mfs/open/file/download/' + item"
              />
            </div>
            <div class="time">反馈时间：{{ info.createTime }}</div>
          </div>
        </div>
      </div>
      <el-button class="gofkBtn" type="danger" round plain @click="jumpMy">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getFeedbackInfo } from '@/api/feedback'
import Video from './components/Video'
export default {
  name: 'FkDetail',
  components: {
    Video
  },
  data() {
    return {
      feedbackId: '',
      info: {}
    }
  },
  created() {
    // this.$route.meta.title = this.$route.query.title + '的反馈'
    this.feedbackId = this.$route.query.id
  },
  mounted() {
    this.getFeedbackInfoData()
  },
  methods: {
    jumpMy() {
      this.$router.go(-1)
    },
    getFeedbackInfoData() {
      getFeedbackInfo(this.feedbackId).then(res => {
        this.info = res.data
      })
    },
    getSrcList(data) {
      const arr = data.split(',')
      const imgArr = []
      if (arr && arr.length > 0) {
        for (const item of arr) {
          imgArr.push('http://39.98.182.184/mfs/open/file/download/' + item)
        }
      }
      return imgArr
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
        display: flex;
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
img{
  width: 2.2rem;
  height: 2.2rem;
  margin-right: .2rem;
  border-radius: 12px;
}
</style>
