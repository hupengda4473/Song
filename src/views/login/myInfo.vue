<template>
  <div class="containerPage">
    <div class="infoTop">
      <i class="el-icon-user-solid tx" />
      <div class="text">{{ userInfo.name }}</div>
    </div>
    <div class="myMain">
      <div class="title">
        <i />我的反馈记录
        <img src="@/assets/imgs/ss.png" alt="" @click="showClass">
      </div>
      <div class="mainUL">
        <div v-for="(item, index) in dataList" :key="index" class="mainLi">
          <img :src="'http://39.98.182.184/mfs/open/file/download/' + item.representAvatar" alt="">
          <div class="mainInfo">
            <span class="name">{{ item.representName }}</span>
            <div class="state" :class="item.status === 1 ? 'active' : ''">{{ item.status === 1 ? '已回复' : '未回复' }}</div>
          </div>
          <el-button class="rightBtn" type="danger" @click="showDetail(item.id)">查看</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerLI" @click="jumpSY">
        <img src="@/assets/imgs/sy_h.png" alt="">
        <span>首页</span>
      </div>
      <div class="footerLI" @click="jumpFK">
        <img src="@/assets/imgs/fk_h.png" alt="">
        <span>代表反馈</span>
      </div>
      <div class="footerLI" @click="jumpMy">
        <img src="@/assets/imgs/my.png" alt="">
        <span class="active">个人中心</span>
      </div>
    </div>
    <el-dialog
      title="筛选"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div>
        <el-radio-group v-model="radio1" size="small" @input="statusChange">
          <el-radio-button label="已回复"/>
          <el-radio-button label="未回复" />
          <el-radio-button label="全部" />
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getFeedbackList } from '@/api/feedback'
export default {
  name: 'MyInfo',
  data() {
    return {
      radio1: '全部', // EC504A
      dialogVisible: false,
      userInfo: {},
      dataList: []
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('rendafankui_userinfo'))
    this.getFeedbackListData()
  },

  methods: {
    showClass() {
      this.dialogVisible = true
    },
    handleClose(done) {
      /* this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})*/
    },
    statusChange() {
      this.getFeedbackListData()
    },
    getFeedbackListData() {
      let str = ''
      if (this.radio1 === '已回复') {
        str = 'status=' + 1
      }
      if (this.radio1 === '未回复') {
        str = 'status=' + 0
      }
      getFeedbackList(str).then(res => {
        this.dataList = res.data.list
      })
    },
    showDetail(id) {
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
    }
  }

}
</script>

<style scoped lang="scss">
.infoTop{
  width: 100%;
  height: 5.3rem;
  border-radius: 0 0 16px 16px;
background: #ED504F;
  text-align: center;
  .tx{
    width: 2rem;
    height: 2rem;
    margin-top: .6rem;
    background: #ffffff;
    border-radius: 50%;
   text-align: center;
    line-height: 2rem;
    font-size: 1.5rem;
    color: #EC504A;
  }
  .text{
    font-size: .5rem;
    color: #ffffff;
    margin-top: .4rem;
  }
}
.myMain{
  background: #ffffff;
  padding: .3rem;
  width: 90%;
  margin: -1rem auto 0;
  border-radius: 14px;
  .title{
    i{
      width: 2px;
      height: .4rem;
      background:  #ED504F;
      display: inline-block;
      float: left;
      margin-right: .2rem;
      margin-top: .2rem;
    }
    img{
      float: right;
    }
    line-height: 2;
    font-size: .4rem;
    overflow: hidden;
  }
}
.mainUL{
  overflow: hidden;
  .mainLi{
    overflow: hidden;
    margin-top: .5rem;
    img{
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 1rem;
      float: left;
      margin-top: .4rem;
      margin-right: .3rem;
    }
    .mainInfo{
      float: left;
      .name{
        font-size: .4rem;
      }
      .state{
        font-size: .3rem;
        padding: .15rem .35rem;
        background: #C1C1C1;
        color: #ffffff;
        border-radius: 1rem;
      }
      .active{
        background: #72C93A;
      }
    }
  }
}
.rightBtn{
  float: right;
  margin-top: .6rem;
}
::v-deep .el-dialog__header{
  padding: 0 .3rem;
  text-align: center;
}
::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner{
  background-color: #EC504A;
  border-color: #EC504A;
  color: #ffffff;
}
::v-deep .el-radio-button__inner:hover{
  color: #EC504A;
}
::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner{
  box-shadow: none;
}
::v-deep .el-radio-button__inner{
  color: #EC504A;
  border-radius: 6px !important;
  border:1px solid #EC504A;
  margin: 0 .3rem;
}
::v-deep .el-dialog__footer{
  text-align: center;
}
</style>
