<template>
  <div class='body'>
   <div class='concent'>

     <el-card class="box-card" v-if='roleName=="admin"'>
        <div slot="header" class="clearfix">
          <h1 class='title'>用户信息</h1>
        </div>
        <div  class="text item">

          <!-- <div class='name_warp'>
            <div style="float:left">
             <div>店铺名称：</div>
             <div>店铺网址：</div>
             </div>
          <div style='float:left'>
             <div v-if='shopping'>
             <div>店铺名称</div>
             <div>www.baidu.com</div>
             </div>

             <el-button type="primary" size="mini" style='margin-top:5px' v-if='!shopping' @click='establishClick'>创建商城</el-button>
          </div>
          </div> -->

          <div class='text1'><span>用户手机号：</span> <span>{{textobj.phone}}</span></div>
          <div class='text1'><span>用户邮箱：</span> <span>{{textobj.email}}</span></div>
          <div class='text1'><span>会员等级：</span> <span>{{textobj.vipLevel}}</span></div>
          <div class='text1'><span>有效期至：</span> <span>{{textobj.vipValidity}}</span></div>
        </div>
      </el-card>
   </div>

  </div>
</template>

<script>
import { userInfos } from '@/api/api'
import { setItem, getItem } from '@/utils/localStorage'
export default {
  data () {
    return {
      shopping: false,
      roleName: getItem('roleName'),
      textobj: {}
    }
  },
  methods: {
    establishClick () {
      this.$router.push({path: '/establish', query: { val: '2', current: '0'}})
    }
  },
  mounted () {
    userInfos().then((res) => {
      console.log(res)
      this.textobj = res.data.data
      // setItem('username', res.data.data.username)
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.concent{
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
}
 .title{
   font-size: 16px;
 }
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .name_warp{
    overflow: hidden;
  }
  .text1{
    margin-top: 5px;
  }
</style>
