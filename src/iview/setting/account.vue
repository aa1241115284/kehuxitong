<template>
  <div class="body">
    <div class="concent">
      <div class="v-search">
        <el-form
          ref="searchForm"
          :inline="true"
          :model="searchData"
          class="search-form-inline"
        >
          <el-form-item label="员工账号" prop="username">
            <el-input
              v-model="searchData.username"
              style="width: 150px"
              size="small"
            />
          </el-form-item>

          <el-form-item label="角色名称" prop="roleId">
            <el-select
              v-model="searchData.roleId"
              size="small"
              style="width: 150px"
            >
              <el-option label="全部" value="" >
              </el-option>
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.title"
                :value="item.roleId"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="当前状态" prop="locked">
            <el-select
              v-model="searchData.locked"
              size="small"
              style="width: 150px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="创建时间查询" prop="date">
            <el-date-picker
              v-model="datetime"
              type="daterange"
              range-separator=""
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="medium"
              @change="datechange"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="danger"
              size="small"
              @click="handleSearch"
              >搜索</el-button
            >
            <el-button type="default" size="small" @click="handleReset"
              >重置</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="operationclick('add',1)"
              >添加账号</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <Table border :columns="columns1" :data="data1" style="margin-top: 10px">
                <template slot-scope="{ row, index }" slot="slotstatus" >
           {{statusobj[row.locked]}}
        </template>

        <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="operationclick('compile',row.userId)">编辑</Button>

          <template v-if='row.locked == false' >
          <Button type="success" size="small" @click="personnel('冻结',row.userId)">冻结</Button>
          </template>

          <template v-else>
          <Button type="info" size="small" @click="personnel('开启',row.userId)">开启</Button>
          <Button type="error" size="small"  @click="personnel('删除',row.userId)">删除</Button>
          </template>
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
    </div>

         <el-dialog :title="title" :visible.sync="applymodel" width="30%">

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >

            <el-form-item
              label="公司登陆账号"
              prop="username"

            >
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>

               <el-form-item
              label="公司登陆密码"
              prop="password"

            >
              <el-input v-model="ruleForm.password" show-password></el-input>
            </el-form-item>

            <el-form-item
              label="角色"
              prop="roleId"

            >
              <el-select
                v-model="ruleForm.roleId"
                placeholder="请选择角色"
              >
                            <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.title"
                :value="item.roleId"
              >
              </el-option>
              </el-select>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
        </span>

      </el-dialog>
  </div>
</template>

<script>
import { dateFormat, datemonth, datetime } from '@/utils/tools.js'
import { customerlist, customerrolelist, customerfreeze, customerdelete, customeradd, getcustomerupdate, postcustomerupdate } from '@/api/api.js'
export default {
  data () {
    return {
      title: '',
      userId: '',
      type: '',
      roleList: [],
      applymodel: false,
      loan_list_size: 1,
      datetime: [],
      searchData: {
        pageNum: 1,
        pageSize: 10,
        roleId: '',
        locked: '',
        username: '',
        createTimeStart: '',
        createTimeEnd: ''
      },
      ruleForm: {
        username: '',
        password: '',
        roleId: ''
      },
      rules: {
        username: [{required: true, message: '请输入登陆账号'}],
        password: [{required: true, message: '请输入登陆密码'}],
        roleId: [{required: true, message: '请选择角色'}]
      },
      statusobj: {
        false: '已开启',
        true: '已冻结'
      },
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '已开启'
        },
        {
          value: 1,
          label: '已冻结'
        }
      ],
      columns1: [
        {
          title: '员工账号',
          key: 'username',
          align: 'center'
        },
        {
          title: '角色名称',
          key: 'realname',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '当前状态',
          slot: 'slotstatus',
          align: 'center'
        },
        {
          title: '最后更新时间',
          key: 'updateTime',
          align: 'center'
        },
        {
          title: '操作人',
          key: 'operator',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      data1: [{ status: '1' }, { status: '0' }]
    }
  },
  watch: {
    applymodel (val) {
      if (val == false) {
        this.$refs.ruleForm.resetFields()
      }
    }
  },
  methods: {
    init () {
      customerlist(this.searchData).then((res) => {
        console.log(res)
        this.data1 = res.data.data.records
        this.loan_list_size = res.data.data.total
      })
    },
    roleinit () {
      customerrolelist({pageNum: 1, pageSize: 1000}).then((res) => {
        this.roleList = res.data.data.records
      })
    },
    // 日期选择
    datechange (date) {
      if (date != null) {
        this.searchData.createTimeStart = dateFormat(date[0])
        this.searchData.createTimeEnd = dateFormat(date[1])
      } else {
        this.searchData.createTimeStart = ''
        this.searchData.createTimeEnd = ''
      }
    },
    handleSearch () {
      this.init()
    },
    // 重置按钮
    handleReset () {
      this.searchData.createTimeStart = ''
      this.searchData.createTimeEnd = ''
      this.$refs.searchForm.resetFields()
      this.datetime = []
      this.init()
    },
    operationclick (type, userId) {
      this.applymodel = true
      this.userId = userId
      this.type = type
      if (type == 'add') {
        this.title = '员工账号添加'
        this.rules['password'][0].required = true
        delete this.ruleForm.userId
      } else {
        this.title = '员工账号编辑'
        this.rules['password'][0].required = false
        this.ruleForm.userId = userId
        getcustomerupdate({userId: userId}).then((res) => {
          console.log(res)
          this.ruleForm.username = res.data.data.username
          this.ruleForm.roleId = res.data.data.roleId
        })
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.ruleForm)
        if (!valid) return
        if (this.type == 'add') {
          customeradd(this.ruleForm).then((res) => {
            console.log(res)
            this.applymodel = false
            if (res.data.code == '0') {
              this.init()
            } else {
              this.$Message.error(res.data.msg)
            }
          })
        } else {
          postcustomerupdate(this.ruleForm).then((res) => {
            console.log(res)
            this.applymodel = false
            if (res.data.code == '0') {
              this.init()
            } else {
              this.$Message.error(res.data.msg)
            }
          })
        }
      })
    },
    cancel (formName) {
      this.applymodel = false
      this.ruleForm = {}
      this.$refs[formName].resetFields()
    },
    sizechange (val) {
      this.searchData.pageSize = val
      this.init()
    },
    pagechange (val) {
      this.searchData.pageNum = val
      this.init()
    },
    parClick () {

    },

    // 操作
    personnel (type, userId) {
      this.$confirm(`是否${type}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          if (type != '删除') {
            customerfreeze({userId: userId}).then((res) => {
              console.log(res)
              if (res.data.code == 0) {
                this.init()
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          } else {
            customerdelete({userId: userId}).then((res) => {
              console.log(res)
              if (res.data.code == 0) {
                this.init()
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          }
        })
        .catch(() => {})
    }
  },
  mounted () {
    this.init()
    this.roleinit()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body {
  width: 100%;
  /* min-height: 100vh; */
}
.concent {
  width: 95%;
  margin: 0 auto;
}
.Page_warp {
  margin-top: 10px;
}
</style>
