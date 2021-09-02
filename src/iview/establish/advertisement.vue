<template>
  <div class="body">
    <div class="concent">
      <h1 class="title">请选择，广告投放方式并申请用户</h1>

      <div class="concent_warp">
        <el-card class="box-card" v-for ='(item,index) in advList' :key='index'>
          <div class="card_img">
            <img
              :src="item.channelLogo"
              alt=""
            />
          </div>
          <div class="card_text">{{item.channelName}}</div>
          <div class="describe">
            <!-- <div>简介+描述</div> -->
            <div>
              {{item.channelIntroduce}}
            </div>
          </div>
          <div class="btnwarp">
            <el-button type="primary" size="mini" @click="modellingClick(item)"
              >去开通</el-button
            >
          </div>
        </el-card>
      </div>
     <template v-if='data1.length!=0'>
      <Table border :columns="columns1" :data="data1" style="margin-top: 10px" >
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="parClick(row.orderId)"
            >查看详情</Button
          >
        </template>
         <template slot-scope="{ row, index }" slot="orderStatus">
           <span>{{orderStatusobj[row.orderStatus]}}</span>
        </template>
        
      </Table>
      <div class="Page_warp">
        <Page
          show-total
          :total="loan_list_size"
          :page-size="10"
          show-elevator
          :current="1"
          :page-size-opts="[1,10]"
          show-sizer
          @on-change="pagechange"
          @on-page-size-change="sizechange"
        ></Page>
      </div>
      </template>
      <el-dialog title="详情" :visible.sync="dialogVisible" width="30%">
        <div>
          <div v-for='(items, i) in detailsobj.List' :key='i'>
          <template v-if='items.configType!="picture"'><span>{{items.configTitle}}：</span><span>{{items.configValue}}</span></template>
          <template v-if='items.paramsType=="url"'><span>{{items.configTitle}}：</span><span style="color: #409eff">{{items.configValue}}</span></template>
          </div>
          <div> <span>当前状态：</span><span>{{orderStatusobj[detailsobj.orderStatus]}}</span></div>
          <!-- <div> <span>商城网址：</span ><span style="color: #409eff">www.baidu.com</span> </div> -->
          <div><span>失败原因：</span><span>{{detailsobj.failureReason}}</span></div>
          <div><span>操作员：</span><span>{{detailsobj.operator}}</span></div>

          <div class='imgwarp'>
             <div v-for='items in detailsobj.List' :key='items.configValue' class='imgwarp_li'  v-if='items.configType=="picture"'>

              <img :src="items.configValue" alt="">
               <div>{{items.configTitle}}</div>

             </div>
           </div>

        </div>
      </el-dialog>
      <el-dialog title="开通申请" :visible.sync="applymodel" width="40%">
        <div class="title">
          您选择开通{{ applyname }}广告投放，请认真填写以下广告投放开通申请信息
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
            :label="item.configTitle"
            :prop="item.configKey"
            v-if="item.configType == 'text'"
          >
            <el-input v-model="ruleForm[item.configKey]"></el-input>
          </el-form-item>

          <el-form-item
            :label="item.configTitle"
            :prop="item.configKey"
            v-if="item.configType == 'select'"
          >
            <el-select
              v-model="ruleForm[item.configKey]"
            >
              <el-option
                :label="items"
                :value="items"
                v-for="items in functionList(item.configPrompt)"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :label="item.configTitle"
            :prop="item.configKey"
            v-if="item.configType == 'picture'"
          >
            <div style="float: left">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :http-request="httpRequest(item.configKey)"
                :before-upload="beforeUpload(item)"
              >
                <img
                  v-if="ruleForm[item.configKey]"
                  :src="ruleForm[item.configKey]"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <span style="margin-left: 10px"
              >(请上传{{ item.configSize }}大小不超过{{
                item.configLimit
              }}M的png/jpg的图片)</span
            >
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
 <!-- <i class="el-icon-plus"></i> -->
  </div>
</template>

<script>
import { advertisingList, advertisingOrder, advertisingDetails, advertisingConfig, ossupload, advertisingSubmit } from '@/api/api'
export default {
  data () {
    return {
      detailsobj: {},
      templateId: '',
      pageNum: 1,
      pageSize: 10,
      imgurl: '',
      List: [],
      submList: [],
      advList: [],
      ruleForm: {},
      rules: {},
      applyname: 'Google',
      applymodel: false,
      loan_list_size: 0,
      dialogVisible: false,
      orderStatusobj: {
        'opening': '开通中',
        'openSucceed': '开通成功',
        'openFailure': '开通失败'
      },
      columns1: [
        {
          title: '订单编号',
          key: 'orderId',
          align: 'center'
        },
         {
          title: '所属商城',
          key: 'shopName',
          align: 'center'
        },
        {
          title: '广告公司名称',
          key: 'channelName',
          align: 'center'
        },
        {
          title: '申请时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '当前状态',
          slot: 'orderStatus',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      data1: []
    }
  },
  methods: {
    init () {
      advertisingList().then((res) => {
        this.advList = res.data.data
      })
    },
    orderinit () {
      advertisingOrder({pageSize: this.pageSize, pageNum: this.pageNum}).then((res) => {
        this.data1 = res.data.data.records
        this.loan_list_size = res.data.data.total
      })
    },
    pagechange (val) {
      this.pageNum = val
      this.orderinit()
    },
    sizechange (val) {
      this.pageSize = val
      this.orderinit()
    },
    parClick (orderId) {
      advertisingDetails({orderId: orderId}).then((res) => {
        this.dialogVisible = true
        this.detailsobj = res.data.data
        this.detailsobj.List = this.detailsobj.details.concat(this.detailsobj.submits)
        console.log(this.detailsobj)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        this.$confirm('是否提交建站申请？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            var obj = {
              detailVos: []
            }
            obj.templateId = this.templateId
            for (let key in this.ruleForm) {
              for (let i = 0; i < this.submList.length; i++) {
                if (key == this.submList[i].configKey) {
                  this.submList[i].configValue = this.ruleForm[key]
                }
              }
            }
            obj.detailVos = this.submList
            advertisingSubmit(obj).then((res) => {
              if (res.data.code == '0') {
                this.applymodel = false
                this.orderinit()
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          })
          .catch(() => {})
      })
    },
    cancel (formName) {
      this.applymodel = false
      this.ruleForm = {}
      this.$refs[formName].resetFields()
    },
    modellingClick (item) {
      this.templateId = item.templateId
      this.applyname = item.channelName
      advertisingConfig({templateId: item.templateId}).then((res) => {
        console.log(res)
        if (res.data.code == '0') {
          this.List = res.data.data
          this.submList = res.data.data
          this.applymodel = true
          res.data.data.forEach((item) => {
            console.log(item)
            this.ruleForm = {
              [item.configKey]: ''
            }
            if (item.configType === 'text') {
              this.$set(this.rules, item.configKey, [
                { required: true, message: `${item.configTitle}不能为空` }
              ])
            }
            if (item.configType === 'select') {
              this.$set(this.rules, item.configKey, [
                { required: true, message: `${item.configTitle}不能为空` }
              ])
            }
            if (item.configType === 'picture') {
              this.$set(this.rules, item.configKey, [
                { required: true, message: `${item.configTitle}不能为空` }
              ])
            }
          })
          if (this.$refs.ruleForm) {
            this.$refs.ruleForm.resetFields()
          }
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },

    functionList (list) {
      return list.split('/')
    },
    // 初始化
    // getData () {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve([
    //         { type: 'input', name: '公司名称', prop: 'name' },
    //         { type: 'input', name: '公司地址', prop: 'gongsi' },
    //         { type: 'seletct', name: '地区选择', prop: 'region' },
    //         { type: 'upload', name: '上传图片', prop: 'imageUrl', rule: {size: 1, width: '1920', height: '743'}},
    //         { type: 'upload', name: '上传图片上传图片', prop: 'imageUrl2', rule: {size: 2, width: '800', height: '533'} }

    //       ])
    //     }, 2000)
    //   })
    // },
    httpRequest (name) {
      return (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.file)
        reader.onload = (e) => {
          ossupload({base64: e.target.result}).then((res) => {
            console.log(res)
            this.ruleForm = {
              ...this.ruleForm,
              [name]: res.data.data
            }
          })
        }
      }
    },

    // 上传图片前的拦截
    beforeUpload (rule) {
      return (file) => {
        var width = rule.configSize.split('*')[0]
        var height = rule.configSize.split('*')[1]
        var that = this
        const type = 'image/jpg,image/png,image/jpeg'
        const accepts = type.split(',')
        const size = file.size / 1024 / 1024 < rule.configLimit
        if (!accepts.includes(file.type)) {
          this.$message.error('请上传 png,jpg 类型的图片')
          return Promise.reject(false)
        }
        if (!size) {
          this.$message.error(`上传图片大小不能超过 ${rule.configLimit}MB!`)
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
                if (img.width != width || img.height != height) {
                  that.$message.error(`上传图片宽为${width}高为${height}`)
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
    this.init()
    this.orderinit()
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
  float: left;
  margin-right: 50px;
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
.imgwarp{
  overflow: hidden;
  margin-top: 10px;
}
.imgwarp_li{
  float: left;
  width: 100px;
  text-align: center;
  margin-right: 10px;
}
.imgwarp_li img{
  width: 100%;
  height: 100px;
}

</style>
