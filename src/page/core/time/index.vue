
<template>
  <div>
    <basic-container>
      <avue-crud
      ref="crud"
      :option="tableOpt"
      :data="pageList"
      :table-loading="loading"
      @search-change="searchChange"
      @search-reset='searchReset'
      @refresh-change="refreshChange"
      @size-change="sizeChange"
      @current-change="currentChange"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      :before-open="beforeOpen"
      :before-close="beforeClose"
      v-model="form">
        <template slot-scope="scope"
                  slot="apiId">
          <span v-if='scope.row.runType == 1'>{{scope.row.apiId}}</span>
          <el-tag v-else>{{scope.row.processor}}</el-tag>
        </template>
        <template slot="executeTimeForm">
          <el-input placeholder="请输入内容" v-model="form.executeTime">
            <template slot="append"><a target="_blank" href="http://cron.qqe2.com/">{{executeTimeAppend}}</a></template>
          </el-input>
        </template>
        <template slot-scope="scope"
                  slot="runType">
          <span>{{scope.label}}</span>
          <a style="color:chocolate;"  @click='switchRunStatus(scope.row)' v-if='scope.row.status==1'> [停用]</a>
          <a style="color:chocolate;"  @click='switchRunStatus(scope.row)' v-if='scope.row.status==0'> [启用]</a>
          <a style="color:chocolate;"  @click='runTimes(scope.row)' v-if='scope.row.status==1 &&scope.row.runStatus==false'> [运行]</a>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script lang='ts'>
import PageMixin from '@/mixins/PageMixin'
import TreeMixin from '@/mixins/TreeMixin'
import BaseMixin from '@/mixins/BaseMixin'
import { DIC } from '@/const/dic'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import {Getter, Mutation, Action} from 'vuex-class'


@Component
export default class CoreTime extends Mixins(PageMixin, BaseMixin) {

  private isMenuDialog = false
  private roleId: string = ''
  private menuIds: string[] = []
  private form: any = {}
  private executeTimeAppend: string = '查看规则'

  protected created() {
    this.pageQueryApi = this.$api.core.timesList
    this.insertApi = this.$api.core.insertTimes
    this.updateApi = this.$api.core.updateTimes
    this.deleteApi = this.$api.core.deleteTimes
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
          labelWidth: 130,
          dialogWidth: '70%',
          column: [{
            label: '任务名称',
            prop: 'taskName',
            search: true,
            span: 8,
            rules: [{
                required: true,
                message: '请输入任务名称',
                trigger: 'blur'
            }, { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }]
          }, {
            label: '运行方式',
            prop: 'runType',
            span: 8,
            slot: true,
            type: 'select',
            valueDefault: 2,
            dicData: DIC.RUNTYPE,
            rules: [{
                required: true,
                message: '请输入任务名称',
                trigger: 'blur'
            }]
        }, {
            label: '周期类型',
            prop: 'executeTimeType',
            span: 8,
            type: 'select',
            dicData: DIC.CYCLETYPE,
            valueDefault: 1,
            rules: [{
                required: true,
                message: '请选择周期类型',
                trigger: 'blur'
            }]
        }, {
            label: '执行周期',
            prop: 'executeTime',
            type: 'number',
            formslot: true,
            rules: [{
                required: true,
                message: '请输入执行周期',
                trigger: 'blur'
            }]
        }, {
            label: 'APIID',
            prop: 'apiId',
            slot: true,
            display: false,
            rules: [{
                required: true,
                message: '请输入APIID',
                trigger: 'blur'
            }, { min: 1, max: 100, message: 'APIID长度在1-50之间', trigger: 'blur' }]
        }, {
            label: '资源名称',
            prop: 'processor',
            display: false,
            hide: true,
            rules: [{
                required: true,
                message: '请输入资源名称',
                trigger: 'blur'
            }, {min: 1, max: 50, message: '资源名称长度在1-50之间', trigger: 'blur' }]
        }, {
            label: '运行状态',
            prop: 'status',
            type: 'radio',
            hide: true,
            dicData: DIC.STATUS,
            valueDefault: 1,
            rules: [{
                required: true,
                message: '请选择运行状态',
                trigger: 'blur'
            }]
        }, {
            label: '预加载参数',
            prop: 'preloadParams',
            placeholder: '预加载参数，格式：参数1=参数值1;参数2=参数值2',
            hide: true,
            dicData: DIC.STATUS
        }, {
            label: '手动调启',
            prop: 'isAllownManualStart',
            type: 'radio',
            dicData: DIC.ISALLOW,
            valueDefault: true,
            hide: true
        }, {
            label: '运行时调启',
            prop: 'isCanRunHasRunning',
            type: 'radio',
            dicData: DIC.ISALLOW,
            valueDefault: true,
            hide: true
        },  {
            label: '是否启动',
            prop: 'runStatus',
            type: 'select',
            dicData: DIC.RUNSTATUS,
            display: false
        }]
    })
  }

  protected mounted() {
    this.queryList()
  }

  protected queryListCallBack(list = []) {
    list.forEach((element: any) => {
      if (element.executeTimeType !== 1) {
        element.executeTime = element.executeTime / 60
      }
    })
    this.pageList = list
  }

  protected editRowData(form: any) {
    if (form.executeTimeType !== 1) {
      form.executeTime = parseInt(this.form.executeTime, 10)  * 60
    }
    return form
  }

  protected delRowData(row: any): any {
      return { taskId: row.taskId }
  }

  @Watch('form.runType')
  private onWatchRunType() {
    if (this.form.runType === 1) {
      this.tableOpt.column[4].display = true
      this.tableOpt.column[5].display = false
    } else {
      this.tableOpt.column[4].display = false
      this.tableOpt.column[5].display = true
    }
  }

  @Watch('form.executeTimeType')
  private onWatchExecuteTimeType() {
    if (this.form.executeTimeType === 1) {
      this.executeTimeAppend = '查看规则'
    } else {
      this.executeTimeAppend = '/min'
    }
  }

  // 定时器启用，停用切换
  private switchRunStatus(row: any) {
    const status = row.status
    const api = status === 1 ? this.$api.core.closeTimes : this.$api.core.openTimes
    api({
      taskId: row.taskId,
      apiId: row.apiId
    }).then((res: any) => {
      this.$notify({
        title: '操作成功',
        message: status === 1 ? '停用成功' : '启动成功' ,
        type: 'success',
        duration: 2000
      })
      this.queryList()
    })
  }

  // 运行定时器
  private runTimes(row: any) {
    this.$confirm('您确定要运行该定时器。', '运行确认', {
        confirmButtonText: '确认运行',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.core.runTimes({
          taskId: row.taskId
        }).then(() => {
          this.$notify({
              title: '操作成功',
              message: '运行成功',
              type: 'success',
              duration: 2000
            })

          this.queryList()
        })
      })
  }
}
</script>
