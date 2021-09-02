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
          <el-form-item label="订单编号" prop="orderId">
            <el-input
              v-model="searchData.orderId"
              style="width: 150px"
              size="small"
            />
          </el-form-item>

          <el-form-item label="消费类型" prop="consumeType">
            <el-select
              v-model="searchData.consumeType"
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

          <el-form-item label="支付时间" prop="date">
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

          </el-form-item>
        </el-form>
      </div>
      <Table border :columns="columns1" :data="data1" style="margin-top: 10px">
                <template slot-scope="{ row, index }" slot="slotstatus" >
           {{statusobj[row.consumeType]}}
        </template>

        <template slot-scope="{ row, index }" slot="action">

       <Button type="primary" size="small" @click="parClick(row.orderId)">查看详情</Button>

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

         <el-dialog title="详情" :visible.sync="dialogVisible" width="30%">
        <div>
          <div><span>订单编号：</span><span>{{detailsobj.orderId}}</span></div>
          <div><span>消费类型：</span><span>{{statusobj[detailsobj.consumeType]}}</span></div>
          <div><span>消费产品：</span><span>{{statusobj[detailsobj.consumeType]}}{{detailsobj.vipLevel}}</span></div>
          <div>
            <span>消费金额：</span><span>￥{{detailsobj.payAmount}}</span>
          </div>
          <div>
            <span>账号当前等级：</span
            ><span >{{detailsobj.currentVipLevel}}</span>
          </div>
          <div><span>有效期至：</span><span>{{detailsobj.validityDate}}</span></div>
          <div><span>订单生成时间：</span><span>{{detailsobj.createTime}}</span></div>
          <div><span>支付时间：</span><span>{{detailsobj.payTime}}</span></div>
          <div><span>支付方式：</span><span>{{paymentobj[detailsobj.payType]}}</span></div>
        </div>
      </el-dialog>

  </div>
</template>

<script>
import { dateFormat, datemonth, datetime } from '@/utils/tools.js'
import { statisticslist, statisticsdetails } from '@/api/api'
export default {
  data () {
    return {
      title: '',
      dialogVisible: false,
      applymodel: false,
      loan_list_size: 0,
      datetime: [],
      searchData: {
        orderId: '',
        consumeType: '',
        payTimeBegin: '',
        payTimeEnd: '',
        pageNum: 1,
        pageSize: 10
      },

      statusobj: {
        'opening': '账号开通',
        'upgrade': '账号升级',
        'renew': '账号续费'
      },
      paymentobj: {
        'wechat': '微信支付',
        'alipay': '支付宝支付',
        'bankpay': '银行卡转账'
      },
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'opening',
          label: '账号开通'
        },
        {
          value: 'upgrade',
          label: '账号升级'
        },
        {
          value: 'renew',
          label: '账号续费'
        }
      ],
      columns1: [
        {
          title: '订单编号',
          key: 'orderId',
          align: 'center'
        },
        {
          title: '消费类型',
          slot: 'slotstatus',
          align: 'center'
        },
        {
          title: '消费金额',
          key: 'payAmount',
          align: 'center'
        },
        {
          title: '订单生成时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '支付时间',
          key: 'payTime',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      data1: [],
      detailsobj: ''
    }
  },
  methods: {
    init () {
      statisticslist(this.searchData).then((res) => {
        console.log(res)
        this.data1 = res.data.data.records
        this.loan_list_size = res.data.data.total
      })
    },
    parClick (orderId) {
      console.log(orderId)
      statisticsdetails({orderId: orderId}).then((res) => {
        console.log(res)
        this.detailsobj = res.data.data
        this.dialogVisible = true
      })
    },
    // 日期选择
    datechange (date) {
      if (date != null) {
        this.searchData.payTimeBegin = dateFormat(date[0])
        this.searchData.payTimeEnd = dateFormat(date[1])
      } else {
        this.searchData.payTimeBegin = ''
        this.searchData.payTimeEnd = ''
      }
    },
    handleSearch () {
      this.init()
    },
    // 重置按钮
    handleReset () {
      this.searchData.payTimeBegin = ''
      this.searchData.payTimeEnd = ''
      this.$refs.searchForm.resetFields()
      this.datetime = []
      this.init()
    },

    sizechange (val) {
      this.searchData.pageSize = val
      this.init()
    },
    pagechange (val) {
      this.searchData.pageNum = val
      this.init()
    }

  },
  mounted () {
    this.init()
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
