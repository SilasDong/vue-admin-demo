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
      </avue-crud>
    </basic-container>
  </div>
</template>

<script lang='ts'>
import PageMixin from '@/mixins/PageMixin'
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import {Getter, Mutation, Action} from 'vuex-class'

@Component
export default class SmsHistory extends Mixins(PageMixin, BaseMixin) {


  protected created() {
    this.pageQueryApi = this.$api.admin.smsHistoryList
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
      addBtn: false,
      editBtn: false,
      delBtn: false,
      menu: false,
      column: [{
        label: '手机号码',
        prop: 'phone',
        search: true
      }, {
        label: '短信来源',
        prop: 'comeFrom'
      }, {
        label: '模板简称',
        prop: 'templateShortName'
      }, {
        label: '是否成功',
        prop: 'code'
      }, {
        label: '短信内容',
        prop: 'codemessage',
        overHidden: true
      }, {
        label: '错误信息',
        prop: 'errmessage',
        overHidden: true
      }, {
        label: 'IP',
        prop: 'ip',
        overHidden: true
      }, {
        label: '发送时间',
        prop: 'createTime',
        type: 'datetime',
        valueFormat: 'timestamp',
        format: 'yyyy-MM-dd HH:mm'
      }]
  })
  }

  protected mounted() {
    this.queryList()
  }
}
</script>