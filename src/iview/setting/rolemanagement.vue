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
          <el-form-item label="角色名称" prop="roleId">
            <el-select
              v-model="searchData.roleId"
              size="small"
              style="width: 150px"
            >
              <el-option label="全部" value=""> </el-option>
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
              >添加角色</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <Table border :columns="columns1" :data="data1" style="margin-top: 10px">
        <template slot-scope="{ row, index }" slot="slotstatus">
          {{ statusobj[row.locked] }}
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <template>
            <Button
              type="primary"
              size="small"
              @click="operationclick('compile',row.roleId)"
              >编辑</Button
            >
          </template>

          <template v-if="row.locked == false">
            <Button type="success" size="small" @click="personnel('冻结',row.roleId)"
              >冻结</Button
            >
          </template>
          <template v-else>
            <Button type="info" size="small" @click="personnel('开启',row.roleId)"
              >开启</Button
            >
            <Button type="error" size="small" @click="personnel('删除',row.roleId)"
              >删除</Button
            >
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

    <el-dialog :title="title" :visible.sync="applymodel" width="1000px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" prop="role">
          <el-table
            :data="tempData"
            :span-method="objectSpanMethod"
            border
            style="width: 100%"
          >
            <el-table-column label="模板名称" width="180">
              <template slot-scope="scope">
                <!-- <el-checkbox v-model="scope.row.modulenableStatus"
                @change="checkchange(scope.$index,scope.row.modulenableStatus)"
                >{{
                  scope.row.modulname
                }}</el-checkbox> -->
                <span>{{scope.row.modulname}}</span>
              </template>
            </el-table-column>

            <el-table-column label="页面名称">

              <template slot-scope="scope">
               <span
               >
                 <el-checkbox
                  v-model="scope.row.enableStatus"
                   @change="checkchange(scope.$index,scope.row.enableStatus)"
                  v-if="scope.row.name"
                  >{{ scope.row.name }}</el-checkbox
                >

               </span>
              </template>

            </el-table-column>
            <el-table-column label="权限">
              <template slot-scope="scope">
                <span
                  v-for="(item, index) in scope.row.children"
                  :key="index"
                  style="margin-right: 10px"
                >
                  <el-checkbox
                    v-model="item.enableStatus"
                    v-if="item.name"
                    >{{ item.name }}</el-checkbox
                  >
                </span>
              </template>
            </el-table-column>
          </el-table>
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
import { customerrolelist, customerrolefreeze, customerroledelete, permissions, customerroleadd, customerroleupdate, postcustomerroleupdate } from '@/api/api.js'
export default {
  data () {
    return {
      roleId: '',
      roleList: [],
      Formmodel: {
        name: '',
        pageName: '',
        pagePermissionsCode: '',
        pageUrl: '',
        jurisdictionName: '',
        jurisdictionPermissionsCode: '',
        jurisdictionUrl: ''
      },

      tempData: [],
      tableData: [],
      title: '',
      applymodel: false,
      loan_list_size: 0,
      datetime: [],
      searchData: {
        locked: '',
        roleId: '',
        createTimeStart: '',
        createTimeEnd: '',
        pageNum: 1,
        pageSize: 10
      },
      ruleForm: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称' }]
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
          title: '角色名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '使用人数',
          key: 'useNum',
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
      data1: []
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
    roleinit () {
      customerrolelist({ pageNum: 1, pageSize: 1000 }).then((res) => {
        this.roleList = res.data.data.records
      })
    },
    Listinit () {
      customerrolelist(this.searchData).then((res) => {
        this.data1 = res.data.data.records
        this.loan_list_size = res.data.data.total
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
      this.Listinit()
    },
    // 重置按钮
    handleReset () {
      this.searchData.createTimeStart = ''
      this.searchData.createTimeEnd = ''
      this.$refs.searchForm.resetFields()
      this.datetime = []
      this.Listinit()
    },
    operationclick (type, roleId) {
      // this.init()
      this.type = type
      this.roleId = roleId
      this.applymodel = true
      if (type == 'add') {
        this.title = '员工账号添加'
        this.init()
      } else {
        this.title = '员工账号编辑'
        customerroleupdate({roleId: roleId}).then((res) => {
          var temp = []
          this.tableData = res.data.data.rolePermissionList
          this.ruleForm.name = res.data.data.name
          this.tableData.forEach((item) => {
            if (item.children.length === 0) {
              item.children.push({
                id: '',
                name: '',
                enableStatus: false,
                children: []
              })
            }
            item.children.forEach((item1, index) => {
              item1.span = index === 0 ? item.children.length : 0
              item1.modulname = item.name
              item1.modulenableStatus = item.enableStatus
              temp.push(item1)
            })
          })
          this.tempData = temp
        })
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        this.applymodel = false
        if (!valid) return
        if (this.type == 'add') {
          customerroleadd({
            name: this.ruleForm.name,
            rolePermissionList: this.tableData
          }).then((res) => {
            this.Listinit()
          })
        } else {
          console.log(this.tableData)
          postcustomerroleupdate({
            name: this.ruleForm.name,
            rolePermissionList: this.tableData,
            roleId: this.roleId
          }).then((res) => {
            this.Listinit()
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
      this.Listinit()
    },
    pagechange (val) {
      this.searchData.pageNum = val
      this.Listinit()
    },
    parClick () {},

    // 操作
    personnel (type, roleId) {
      this.$confirm(`是否${type}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          if (type != '删除') {
            customerrolefreeze({roleId: roleId}).then((res) => {
              console.log(res)
              if (res.data.code == 0) {
                this.Listinit()
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          } else {
            customerroledelete({roleId: roleId}).then((res) => {
              console.log(res)
              if (res.data.code == 0) {
                this.Listinit()
              } else {
                this.$Message.error(res.data.msg)
              }
            })
          }
        })
        .catch(() => {})
    },

    subClick () {
      console.log(this.tableData)
    },
    checkchange (index, val) {
      this.tableData[index].enableStatus = val
      console.log(this.tableData[index].enableStatus)
      // this.fromeDate()
    },
    init () {
      // functiondetails({}).then((res) => {
      // this.tableData = res.data.data.moduleData
      permissions().then((res) => {
        var temp = []
        this.tableData = res.data.data
        this.tableData.forEach((item) => {
          if (item.children.length === 0) {
            item.children.push({
              id: '',
              name: '',
              enableStatus: false,
              children: []
            })
          }
          item.children.forEach((item1, index) => {
            item1.span = index === 0 ? item.children.length : 0
            item1.modulname = item.name
            // item1.modulenableStatus = item.enableStatus
            temp.push(item1)
          })
        })
        this.tempData = temp
      })

      // })
    },

    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.span,
          colspan: 1
        }
      }
    },
    fromeDate () {
      var temp = []
      this.tableData.forEach((item) => {
        if (item.children.length === 0) {
          item.children.push({
            id: '',
            name: '',
            enableStatus: false,
            children: []
          })
        }
        item.children.forEach((item1, index) => {
          item1.span = index === 0 ? item.children.length : 0
          item1.modulname = item.name
          // item1.modulenableStatus = item.enableStatus
          temp.push(item1)
        })
      })
      this.tempData = temp
    }
  },
  mounted () {
    this.Listinit()
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
