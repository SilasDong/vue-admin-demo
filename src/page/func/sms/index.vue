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
        @row-update="rowUpdate"
        :before-open="beforeOpen"
        :before-close="beforeClose">
        <template slot="search">
            <el-form-item label="">
              <el-date-picker v-model="updateTime" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :default-time="['00:00:00','23:59:59']" format="yyyy-MM-dd HH:mm"></el-date-picker>
            </el-form-item>
        </template>
      </avue-crud>
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
export default class SmsTemplate extends Mixins(PageMixin, BaseMixin) {
  private updateTime: any = ''
  private dialogVisible = true

  protected created() {
    this.pageQueryApi = this.$api.func.smsTemplateList
    this.updateApi = this.$api.func.updateSmsTemplate
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
      addBtn: false,
      delBtn: false,
      column: [{
        label: '模板名称',
        prop: 'templateName',
        search: true,
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请填写模板名称',
                trigger: 'blur'
            }]
      }, {
        label: '模板简称',
        prop: 'templateShortName',
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请填写模板简称',
                trigger: 'blur'
            }]
      }, {
        label: '模板内容',
        prop: 'templateContent',
        type: 'textarea',
        overHidden: true,
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请填写模板内容',
                trigger: 'blur'
            }]
      }, {
        label: '备注',
        prop: 'remark',
        type: 'textarea',
        overHidden: true,
        span: 18,
        row: true
      }, {
        label: '更新时间',
        prop: 'updateTime',
        type: 'datetime',
        valueFormat: 'timestamp',
        format: 'yyyy-MM-dd HH:mm',
        display: false
      }]
  })
  }

  protected mounted() {
    this.queryList()
  }

  protected searchBefore() {
    if (this.updateTime) {
      if (this.updateTime[0]) {
        this.searchForm.startTime = this.updateTime[0].getTime() / 1000
      }
      if (this.updateTime[1]) {
        this.searchForm.endTime = this.updateTime[1].getTime() / 1000
      }
    } else {
       console.log('qweqweqwe')
       this.searchForm.startTime = ''
       this.searchForm.endTime = ''
    }
  }
}
</script>