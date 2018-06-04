<template>
  <div class="app-container">
    <div class="model-search text-right" style="margin-bottom: 20px;">
      <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" v-waves @click.native="handleAdd">新增账号</el-button>
    </div>
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :url="url"
      :showPagination="false"
      :height="tableHeight">
      <template slot="handle" slot-scope="scope">
        <el-button-group>
          <el-button type="primary" icon="el-icon-edit" size="small" @click.native="editUserInfo(scope.row)">编辑</el-button>
          <el-button type="warning" icon="el-icon-refresh" size="small" @click.native="resetUserPsw(scope.row)">密码重置</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" v-if="scope.row.isAdmin !== 1" @click.native="deleteUser(scope.row)">删除</el-button>
        </el-button-group>
      </template>
    </GridUnit>
    <!-- 新增、编辑账号 -->
    <div class="dialog-info">
      <el-dialog :title="isEdit ? '编辑账号' : '新增账号'" :visible.sync="layer_showInfo" width="600px" @close="dialogClose">
        <el-form :model="ruleForm" size="small" status-icon :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="用户名" prop="nickName">
            <el-input v-model.number="ruleForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model.number="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item v-if="!isEdit" label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="!isEdit" label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="layer_showInfo = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="handleSaveData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { deleteDataApi, addDataApi, updateUserApi } from '@/api/userManage'
import { validateMobile } from '@/utils/validate'
import GridUnit from '@/components/GridUnit/grid'

export default {
  name: 'userList',
  directives: {
    waves
  },
  components: {
    GridUnit
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        if (!this.ruleForm.checkPass) {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validateCheckPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      url: 'user/findAll',
      colModels: [
        { prop: 'nickName', label: '用户名' },
        { prop: 'userName', label: '手机号码', width: 180 },
        {
          prop: 'isAdmin',
          label: '权限角色',
          render(row) {
            return row.isAdmin === 1 ? `超级管理员` : `普通用户`
          }
        },
        { prop: 'createTime', label: '创建时间', width: 180, filter: 'parseTime' },
        { prop: 'modifyTime', label: '修改时间', width: 180, filter: 'parseTime' },
        {label: '操作', slotName: 'handle', width: 270, fixed: 'right'}
      ],
      tableHeight: 300,
      layer_showInfo: false,
      isEdit: false,
      ruleForm: {
        nickName: '',
        mobile: '',
        password: '',
        checkPass: ''
      },
      rules: {
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        checkPass: [
          { required: true, trigger: 'blur', validator: validateCheckPass }
        ],
        mobile: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ]
      }
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
    editUserInfo(row) {
      this.layer_showInfo = true
      this.isEdit = true
      this.ruleForm.nickName = row.nickName
      this.ruleForm.mobile = row.userName
      this.ruleForm.userId = row.userId
    },
    handleAdd() {
      this.layer_showInfo = true
      this.isEdit = false
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.clearValidate()
      }
    },
    /* 弹窗关闭时的回调 */
    dialogClose() {
      this.ruleForm = {}
      this.$refs.ruleForm.resetFields()
    },
    /* 密码重置 */
    resetUserPsw(row) {
      this.$confirm('此操作将重置该账号初始密码：123456, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.saveData(updateUserApi, {
          userId: row.userId,
          password: '123456'
        }, row.isAdmin === 1 ? 'toLogin' : '')
      }).catch(() => {})
    },
    /* 删除 */
    deleteUser(row) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.saveData(deleteDataApi, {
          userId: row.userId
        })
      }).catch(() => {})
    },
    /* 保存 */
    saveData(apiRequest, params, type) {
      apiRequest(params).then(response => {
        this.layer_showInfo = false
        if (type === 'toLogin') {
          this.$store.dispatch('LogOut').then(() => {
            // 为了重新实例化vue-router对象 避免bug
            location.reload()
          })
          return false
        }
        this.$refs.refGridUnit.searchHandler()
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleSaveData() {
      const saveApi = this.isEdit ? updateUserApi : addDataApi
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.saveData(saveApi, {
            userId: this.ruleForm.userId,
            nickName: this.ruleForm.nickName,
            userName: this.ruleForm.mobile,
            password: this.ruleForm.password
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">


</style>
