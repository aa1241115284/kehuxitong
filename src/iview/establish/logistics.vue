<template>
  <div class="body">
    <div class="concent">
      <h1 class="title">请选择，您商店需要开通的物流公司</h1>

      <div class="concent_warp">
        <el-card class="box-card">
          <div class="card_img">
            <img
              src="//tenfei01.cfp.cn/creative/vcg/veer/612/veer-157289815.jpg?x-oss-process=image/format,webp"
              alt=""
            />
          </div>
          <div class="card_text">Shopify</div>
          <div class="describe">
            <div>简介+描述</div>
            <div>
              描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
            </div>
          </div>
          <div class="btnwarp">
            <el-button type="primary" size="mini" @click="modellingClick"
              >去开通</el-button
            >
          </div>
        </el-card>
      </div>

      <Table border :columns="columns1" :data="data1" style="margin-top: 10px">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="parClick"
            >查看详情</Button
          >
          <Button type="success" size="small">去商城</Button>
        </template>
      </Table>
      <div class="Page_warp">
        <Page
          show-total
          :total="loan_list_size"
          :page-size="10"
          show-elevator
          :current="1"
          :page-size-opts="[10]"
          show-sizer
          @on-change="pagechange"
          @on-page-size-change="sizechange"
        ></Page>
      </div>
      <el-dialog title="详情" :visible.sync="dialogVisible" width="30%">
        <div>
          <div><span>手机号：</span><span>186****9995</span></div>
          <div><span>电子邮箱：</span><span>1241115284@qq.com</span></div>
          <div><span>商城名称：</span><span>商城名称</span></div>
          <div>
            <span>当前状态：</span><span>申请中/申请失败/申请成功</span>
          </div>
          <div>
            <span>商城网址：</span
            ><span style="color: #409eff">www.baidu.com</span>
          </div>
          <div><span>失败原因：</span><span>失败原因</span></div>
          <div><span>操作员：</span><span>操作员</span></div>
        </div>
      </el-dialog>
      <el-dialog title="开通申请" :visible.sync="applymodel" width="40%">
        <div class="title">
          您选择开通{{ applyname }}，请认真填写以下物流开通申请信息
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <div v-for="item in List">
            <el-form-item
              :label="item.name"
              :prop="item.prop"
              v-if="item.type == 'input'"
            >
              <el-input v-model="ruleForm[item.prop]"></el-input>
            </el-form-item>

            <el-form-item
              :label="item.name"
              :prop="item.prop"
              v-if="item.type == 'seletct'"
            >
              <el-select
                v-model="ruleForm[item.prop]"
                placeholder="请选择活动区域"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              :label="item.name"
              :prop="item.prop"
              v-if="item.type == 'upload'"
            >
             <div style='float:left'>
                             <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :http-request="httpRequest(item.prop)"
                :before-upload="beforeUpload(item.rule)"
              >
                <img v-if="ruleForm[item.prop]" :src="ruleForm[item.prop]" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
             </div>
              <span style='margin-left:10px'>(请上传{{item.rule.width}}*{{item.rule.height}},大小不超过{{item.rule.size}}M的png/jpg的图片)</span>
            </el-form-item>
          </div>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
 <i class="el-icon-plus"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgurl: '',
      List: [],
      ruleForm: {},
      rules: {},
      applyname: 'EMS',
      applymodel: false,
      loan_list_size: 0,
      dialogVisible: false,
      columns1: [
        {
          title: '订单编号',
          key: 'name',
          align: 'center'
        },
        {
          title: '运营商名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '申请时间',
          key: 'name',
          align: 'center'
        },
        {
          title: '当前状态',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      data1: [{ name: '1' }]
    }
  },
  methods: {
    pagechange () {},
    sizechange () {},
    parClick () {
      this.dialogVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.ruleForm)
        if (!valid) return

        this.$confirm('是否提交建站申请？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {})
          .catch(() => {})
      })
    },
    cancel (formName) {
      this.applymodel = false
      this.ruleForm = {}
      this.$refs[formName].resetFields()
    },
    modellingClick () {
      this.applymodel = true
    },
    // 初始化
    getData () {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { type: 'input', name: '公司名称', prop: 'name' },
            { type: 'input', name: '公司地址', prop: 'gongsi' },
            { type: 'seletct', name: '地区选择', prop: 'region' },
            { type: 'upload', name: '上传图片', prop: 'imageUrl', rule: {size: 1, width: '1920', height: '743'}},
            { type: 'upload', name: '上传图片上传图片', prop: 'imageUrl2', rule: {size: 2, width: '800', height: '533'} }

          ])
        }, 2000)
      })
    },
    httpRequest (name) {
      return (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.file)
        reader.onload = (e) => {
          this.ruleForm = {
            ...this.ruleForm,
            [name]: e.target.result
          }
        }
      }
    },

    // 上传图片前的拦截
    beforeUpload (rule) {
      return (file) => {
        var that = this
        const type = 'image/jpg,image/png,image/jpeg'
        const accepts = type.split(',')
        const size = file.size / 1024 / 1024 < rule.size
        if (!accepts.includes(file.type)) {
          this.$message.error('请上传 png,jpg 类型的图片')
          return Promise.reject(false)
        }
        if (!size) {
          this.$message.error(`上传图片大小不能超过 ${rule.size}MB!`)
          return Promise.reject(false)
        }

        var reader = new FileReader()
        reader.readAsDataURL(file)
        const fileOnLoad = function () {
          return new Promise((resolve, reject) => {
            reader.onload = function (event) {
              var txt = event.target.result
              var img = document.createElement('img')
              img.src = txt
              img.onload = function () {
                if (img.width != rule.width || img.height != rule.height) {
                  that.$message.error(`上传图片宽为${rule.width}高为${rule.height}`)
                  return reject(false)
                }
                return resolve(true)
              }
            }
          })
        }
        return fileOnLoad()
      }
    }
  },
  mounted () {
    this.getData().then((res) => {
      this.List = res
      res.forEach((item) => {
        this.ruleForm = {
          [item.prop]: ''
        }
        if (item.type === 'input') {
          this.$set(this.rules, item.prop, [
            { required: true, message: `${item.name}不能为空` }
          ])
        }
        if (item.type === 'seletct') {
          this.$set(this.rules, item.prop, [
            { required: true, message: `${item.name}不能为空` }
          ])
        }
        if (item.type === 'upload') {
          this.$set(this.rules, item.prop, [
            { required: true, message: `${item.name}不能为空` }
          ])
        }
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.concent {
  width: 95%;
  margin: 0 auto;
  /* margin-top: 20px; */
}
.title {
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
  clear: both;
}

.box-card {
  width: 380px;
}
.concent_warp {
  overflow: hidden;
  margin-top: 20px;
}
.card_img {
  width: 90%;
  height: 140px;
  margin: 0 auto;
}
.card_img img {
  width: 100%;
  height: 100%;
}
.card_text {
  text-align: center;
  margin-top: 10px;
}
.describe {
  font-size: 14px;
  margin-top: 10px;
}
.btnwarp {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
.Page_warp {
  margin-top: 10px;
}
.title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
