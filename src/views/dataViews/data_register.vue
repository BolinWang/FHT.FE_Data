/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:11:19
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-06-04 11:51:50
 */

<template>
  <div class="layout-container">
    <el-form :inline="true" :model="formOptions" size="small">
      <el-form-item>
        <el-select v-model="formOptions.timeType" style="width: 100px;">
          <el-option label="日" :value="1"></el-option>
          <el-option label="月" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formOptions.timeType === 1">
        <el-date-picker
          v-model="formOptions.timeValue"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          @change="dateChange">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-else>
        <el-date-picker
          v-model="formOptions.startMonth"
          type="month"
          align="right"
          placeholder="开始月份"
          style="width: 150px;"
          value-format="yyyy-MM"
          @change="startChange">
        </el-date-picker>
        <span class="text-center"> -- </span>
          <el-date-picker
            v-model="formOptions.endMonth"
            type="month"
            align="right"
            placeholder="结束月份"
            style="width: 150px;"
            value-format="yyyy-MM"
            @change="endChange">
          </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="primary" icon="el-icon-upload" @click="handleExport">导出</el-button>
      </el-form-item>
    </el-form>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="url"
      :formOptions="params"
      :height="tableHeight"
      show-summary
      :showPagination="false">
    </GridUnit>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { parseTime, deepClone } from '@/utils'
import { exportRegisterApi } from '@/api/dataReport'
export default {
  name: 'data_register',
  components: {
    GridUnit
  },
  filters: {

  },
  data() {
    const now = new Date()
    const nowY = now.getFullYear()
    const nowM = now.getMonth()
    const nowD = now.getDate()
    return {
      tableHeight: 300,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      formOptions: {
        timeType: 1,
        timeValue: [
          parseTime(new Date(nowY, nowM, nowD), '{y}-{m}-{d}'),
          parseTime(new Date(nowY, nowM, nowD), '{y}-{m}-{d}')
        ],
        startMonth: '',
        endMonth: ''
      },
      params: {
        startDateStr: '',
        endDateStr: ''
      },
      colModels: [
        {prop: 'createTime', label: '时间', width: 150, filter: 'parseTime', sortable: true},
        {prop: 'businessUserAmount', label: 'B端组织注册量', sortable: true},
        {prop: 'consumerUserAmountByWeb', label: 'C端租客注册量(web)', sortable: true},
        {prop: 'consumerUserAmountByIOSApp', label: 'C端租客注册量(IOS)', sortable: true},
        {prop: 'consumerUserAmountByAndroidApp', label: 'C端租客注册量(Andriod)', sortable: true}
      ],
      url: '/tongji/data/queryUserRegister'
    }
  },
  created() {
    let cloneParams = deepClone(this.formOptions)
    this.params.timeType = cloneParams.timeType
    this.params.startDateStr = cloneParams.timeValue[0]
    this.params.endDateStr = cloneParams.timeValue[1]
  },
  mounted() {
    /* 表格高度控制 */
    this.$nextTick(() => {
      const offsetTop = this.$refs.refGridUnit.$el.offsetTop || 140
      const pagenationH = 5
      const containerPadding = 20
      let temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
      this.tableHeight = temp_height > 300 ? temp_height : 300
      window.onresize = () => {
        return (() => {
          temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
          this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300
        })()
      }
    })
  },
  computed: {

  },
  methods: {
    handleSearch() {
      this.params.timeType = this.formOptions.timeType
      this.$refs.refGridUnit.searchHandler()
    },
    dateChange(val) {
      this.params.startDateStr = val[0]
      this.params.endDateStr = val[1]
    },
    startChange(val) {
      this.params.startDateStr = val
    },
    endChange(val) {
      this.params.endDateStr = val
    },
    /* 导出 */
    handleExport() {
      this.downloadLoading = true
      exportRegisterApi(this.params).then(response => {
        response.dataObject.map((item, index) => {
          item.index = index * 1 + 1
        })
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = this.colModels.map((item) => {
            return item.label
          })
          const filterVal = this.colModels.map((item) => {
            return item.prop
          })
          const data = this.formatJson(['index', ...filterVal], response.dataObject || [])
          export_json_to_excel(['序号', ...tHeader], data, `注册数据${this.params.startDateStr} - ${this.params.endDateStr}`, `注册数据${this.params.startDateStr} - ${this.params.endDateStr}`)
          this.downloadLoading = false
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">

</style>
