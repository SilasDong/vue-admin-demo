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
        @row-save="rowSave"
        @row-del="rowDel"
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
export default class ErrCode extends Mixins(PageMixin, BaseMixin) {


  protected created() {
    this.pageQueryApi = this.$api.func.errorList
    this.insertApi = this.$api.func.insertError
    this.updateApi = this.$api.func.updateError
    this.deleteApi = this.$api.func.deleteError
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
      column: [{
        label: '错误码',
        prop: 'errorCode',
        search: true,
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请填写错误码',
                trigger: 'blur'
            }]
      }, {
        label: '语言类型',
        prop: 'language',
        type: 'select',
        dicData: [{value: 'CN', label: 'CN'}, {value: 'EN', label: 'EN'}],
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请选择语言类型',
                trigger: 'blur'
            }]
      }, {
        label: '错误描述',
        prop: 'description',
        type: 'textarea',
        overHidden: true,
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请填写分享详情',
                trigger: 'blur'
            }]
      }]
  })
  }

  protected mounted() {
    this.queryList()
  }
}
</script>