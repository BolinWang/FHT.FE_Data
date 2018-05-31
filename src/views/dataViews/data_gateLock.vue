/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:11:19
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-05-31 23:24:26
 */

<template>
  <div class="layout-container">
    <el-form :inline="true" size="small">
      <el-form-item>
        <el-button type="primary" icon="el-icon-upload" @click="handleExport">导出</el-button>
      </el-form-item>
    </el-form>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="url"
      :listField="`dataObject.dataList`"
      :height="tableHeight"
      show-summary
      :summary-method="getSummaries"
      :showPagination="false">
    </GridUnit>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { exportGateLockApi } from '@/api/dataReport'
export default {
  name: 'data_gateLock',
  components: {
    GridUnit
  },
  filters: {

  },
  data() {
    return {
      tableHeight: 300,
      colModels: [
        {prop: 'cityName', label: '城市'},
        {prop: 'needCount', label: '需安装数', sortable: true},
        {prop: 'alreadyCount', label: '已安装数', sortable: true},
        {prop: 'notInstallCount', label: '未安装数', sortable: true},
        {prop: 'installRatio',
          label: '安装率 %',
          sortable: true,
          render(row) {
            return row.installRatio.replace(/%/gi, '') * 1
          }
        },
        {prop: 'linkRatio',
          label: '连通率 %',
          sortable: true,
          render(row) {
            return row.linkRatio.replace(/%/gi, '') * 1
          }
        },
        {prop: 'linkCount', label: '连接数', sortable: true}
      ],
      url: 'getDeviceStatusList'
    }
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
    /* 导出 */
    handleExport() {
      this.downloadLoading = true
      exportGateLockApi(this.params).then(response => {
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
          export_json_to_excel(['序号', ...tHeader], data, `门锁数据${this.params.startDateStr} - ${this.params.endDateStr}`, `门锁数据${this.params.startDateStr} - ${this.params.endDateStr}`)
          this.downloadLoading = false
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => {
          if (column.property === 'installRatio' || column.property === 'linkRatio') {
            return item[column.property].replace(/%/gi, '') * 1
          }
          return Number(item[column.property])
        })
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      return sums
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">

</style>
