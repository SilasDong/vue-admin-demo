
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
             <el-button type="primary" :size="uiSize" @click="deleteListClick()" v-if='hasPermission("CLEAR")'>全部清空</el-button>
         </template>
        <template slot-scope="scope" slot="result">
          <span @click='showContent(scope.row.result, true)' style="color:#409EFF;cursor:pointer">
            {{scope.row.result}}
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
export default class TimeLog extends Mixins(PageMixin, BaseMixin) {

  private dialogContent = { visible: false, data: ''}

  protected created() {
    this.pageQueryApi = this.$api.core.timeLogList
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
      addBtn: false,
      editBtn: false,
      delBtn: false,
      menu: false,
      column: [{
        label: '任务名称',
        prop: 'taskName',
        search: true
      }, {
        label: '运行方式',
        prop: 'runType',
        type: 'select',
        dicData: DIC.RUNTYPE,
        search: true
      }, {
        label: 'APIID/资源名称',
        prop: 'api'
      }, {
        label: '运行状态',
        prop: 'status',
        type: 'select',
        searchDefault: 3,
        dicData: [{value: 1, label: '运行中'},
                  {value: 2, label: '运行成功'},
                  {value: 3, label: '运行异常'},
                  {value: 4, label: '运行取消'}],
        search: true
      }, {
        label: '运行结果',
        prop: 'result',
        slot: true,
        overHidden: true
      }, {
        label: '运行时间',
        prop: 'startTime',
        type: 'datetime',
        valueFormat: 'timestamp',
        format: 'yyyy-MM-dd HH:mm'
      }, {
        label: '结束时间',
        prop: 'endTime',
        type: 'datetime',
        valueFormat: 'timestamp',
        format: 'yyyy-MM-dd HH:mm'
      }]
  })
  }

  protected mounted() {
    this.queryList()
  }

  protected showContent(row: any, isJson = false) {
    this.dialogContent.data = isJson ? JSON.stringify(JSON.parse(row.replace(/'/g, '"')), undefined, 4) : row
    this.dialogContent.visible = true
  }

  private deleteListClick() {
        this.$confirm('是否清空当前列表, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.core.deleteTimeLogList().then(() => {
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