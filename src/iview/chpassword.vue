<template>
  <div class="body">
    <div class="auto">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="注册手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="短信验证码" prop="smsCode">
          <el-input v-model="ruleForm.smsCode" style="width: 200px"></el-input>

          <div class="loginImgBtn" id="btnSendCode">
            <el-button v-show="show" @click="getCode">获取验证码</el-button>
            <el-button v-show="!show" disabled
              >{{ count }}秒后重新获取</el-button
            >
          </div>
        </el-form-item>

        <el-form-item label="登录密码" prop="newPwd" style="margin-top: 10px">
          <el-input v-model="ruleForm.newPwd" show-password></el-input>
        </el-form-item>

        <el-form-item
          label="登录密码确认"
          prop="oldPwd"
          style="margin-top: 10px"
        >
          <el-input v-model="ruleForm.oldPwd" show-password></el-input>
        </el-form-item>
      <div class="btn_warp">
          <el-button style='margin-right:20px' @click='gologin'>去登录</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import { findPwd } from '@/api/api'
export default {
  name: 'login',
  data () {
    return {
      count: '',
      show: true,
      ruleForm: {
        phone: '',
        newPwd: '',
        oldPwd: '',
        smsCode: ''
      },
      rules: {
        phone: [{ required: true, message: '请输入手机号' }],
        newPwd: [{ required: true, message: '请输入密码' }],
        oldPwd: [{ required: true, message: '请输入确认密码' }],
        smsCode: [{ required: true, message: '请输入验证码' }]
      }
    }
  },
  computed: {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        console.log(this.ruleForm)
        if (this.ruleForm.newPwd != this.ruleForm.oldPwd) {
          return this.$Message.warning('请确认密码和登录密码是否一致')
        }
        findPwd({
          newPwd: this.ruleForm.newPwd,
          phone: this.ruleForm.phone,
          smsCode: this.ruleForm.smsCode
        }).then((res) => {
          console.log(res)
          if (res.data.code == '0') {
            this.$router.push({ path: '/login' })
          } else {
            return this.$Message.warning(res.data.msg)
          }
        })
      })
    },
    gologin () {
      this.$router.push({path: '/login'})
    },
    // 验证码
    getCode () {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false

        console.log('请求')
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  },

  mounted () {},
  destroyed () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auto {
  width: 500px;
  margin: 0 auto;
  margin-top: 300px;
}
.btn_warp {
  margin-top: 20px;
  margin-left: 120px;
}
.forget{
  font-size: 12px;
  color: #409EFF;
  margin-left: 100px;
  cursor: pointer;
}
#btnSendCode{
  float: right;
}

</style>
