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
export default class SmsRecharge extends Mixins(PageMixin, BaseMixin) {

  private dialogVisible = true

  protected created() {
    this.pageQueryApi = this.$api.func.smsRechargeList
    this.updateApi = this.$api.func.smsRechargeUpage
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
      addBtn: false,
      delBtn: false,
      labelWidth: 200,
      column: [{
        label: '添加短信条数',
        prop: 'addSmsCount',
        type: 'number',
        span: 18,
        row: true,
        hide: true,
        rules: [ { required: true, message: '请输入添加短信条数', trigger: 'blur' },
                     {type: 'number', min: 1, max: 10000, message: '序号在1-10000之间', trigger: 'blur' }]
      }, {
        label: '剩余短信条数',
        prop: 'smsCount',
        type: 'number',
        span: 18,
        row: true,
        disabled: true
      }, {
        label: '短信总共送条数',
        prop: 'smsSendTotal',
        type: 'number',
        span: 18,
        row: true,
        disabled: true
      }, {
        label: '短信已发送条数',
        prop: 'smsAlreadySendTotal',
        type: 'number',
        span: 18,
        row: true,
        disabled: true
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
}
</script>