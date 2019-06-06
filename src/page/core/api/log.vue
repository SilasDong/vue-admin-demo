
<template>
  <div>
    <basic-container>
      <avue-crud
        ref="crud"
        :option="tableOpt"
        :data="pageList"
        :page='page'
        :table-loading="loading"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-reset='searchReset'
        :before-open="beforeOpen"
        :before-close="beforeClose">
        <template slot="menuLeft">
             <el-button  type="primary"  :size="uiSize" @click="deleteListClick()" v-if='hasPermission("CLEAR")' >全部清空</el-button>
        </template>
        <template slot-scope="scope" slot="queryParams">
          <span @click='showContent(scope.row.queryParams, true)' style="color:#409EFF;cursor:pointer">
            {{scope.row.queryParams}}
          </span>
        </template>

        <template slot-scope="scope" slot="message">
          <span @click='showContent(scope.row.message)' style="color:#409EFF;cursor:pointer">
            {{scope.row.message && scope.row.message.substring(0,15)}}
          </span>
        </template>
      </avue-crud>
      <el-dialog title="完整内容" :visible.sync="dialogContent.visible">
        <el-form>
          <el-form-item>
            <el-input type="textarea" v-model="dialogContent.data" :autosize="{ minRows: 4, maxRows: 18}"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogContent.visible = false" >关 闭</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script lang='ts'>
import PageMixin from '@/mixins/PageMixin'
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import {Getter, Mutation, Action} from 'vuex-class'
import { DIC } from '@/const/dic'


@Component
export default class ApiLog extends Mixins(PageMixin, BaseMixin) {

  private dialogContent = { visible: false, data: ''}

  protected created() {
    this.pageQueryApi = this.$api.core.apiLogList
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
      addBtn: false,
      editBtn: false,
      delBtn: false,
      menu: false,
      column: [{
        label: '接口apiId',
        prop: 'apiId',
        search: true
      }, {
        label: '类型',
        prop: 'logType',
        type: 'select',
        dicData: DIC.LOGTYPR,
        searchDefault: 0,
        search: true
      }, {
        label: '是否成功',
        prop: 'isSuccess',
        type: 'select',
        dicData: DIC.ISSUCCESS,
        searchDefault: 0,
        search: true
      }, {
        label: 'code',
        prop: 'code',
        search: true
      }, {
        label: '查询参数',
        prop: 'queryParams',
        slot: true,
        overHidden: true
      }, {
        label: '处理消息',
        prop: 'message',
        slot: true
      }, {
        label: '登录ip',
        prop: 'ip'
      }, {
        label: '创建时间',
        prop: 'createTime',
        type: 'datetime',
        valueFormat: 'timestamp',
        format: 'yyyy-MM-dd HH:mm'
      }]
    })
  }

  protected mounted() {
    if (this.$route.query.isSuccess && this.$route.query.time) {
      this.searchForm.isSuccess = this.$route.query.isSuccess
      this.searchForm.time = this.$route.query / 1000
      this.searchForm.apiId = this.$route.query.apiId
    } else {
      this.searchForm.time = ''
      this.searchForm.isSuccess = 0
      this.searchForm.logType = 0
    }
    this.queryList()
  }

  private showContent(row: any, isJson = false) {
    if (isJson) {
      try {
        this.dialogContent.data = JSON.stringify(JSON.parse(row.replace(/'/g, '"')), undefined, 4)
      } catch (err) {
        this.dialogContent.data = row
      }
    } else {
      this.dialogContent.data = row
    }
    this.dialogContent.visible = true
  }
  private deleteListClick() {
    this.$confirm('是否清空当前列表, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$api.core.apiLogDelete().then(() => {
        this.$notify({
            title: '操作成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
        })
        this.queryList()
      })
    })
  }
}
</script>