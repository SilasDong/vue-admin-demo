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
export default class OrderList extends Mixins(PageMixin, BaseMixin) {

  private dialogVisible = true

  protected created() {
    this.pageQueryApi = this.$api.sys.sysOrderList
    this.updateApi = this.$api.func.smsRechargeUpage
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
      addBtn: false,
      delBtn: false,
      editBtn: false,
      viewBtn: true,
      menuWidth: 100,
      labelWidth: 200,
      column: [{
        label: '订单号',
        prop: 'tradeNo',
        search: true,
        width: 150,
        span: 18,
        row: true
      }, {
        label: '产品名称',
        prop: 'productName',
        span: 18,
        search: true,
        row: true,
        disabled: true
      }, {
        label: '支付类型',
        prop: 'tradeType',
        type: 'select',
        dicData: [{label: '公众号支付', value: 'JSAPI_PUB'},
                  {label: '小程序', value: 'JSAPI_MIN'},
                  {label: '原生扫码支付', value: 'NATIVE'},
                  {label: 'app支付', value: 'APP'}],
        span: 18,
        row: true
      }, {
        label: '支付金额',
        prop: 'payAmount',
        span: 18,
        row: true
      }, {
        label: '支付状态',
        search: true,
        prop: 'status',
        type: 'select',
        dicData: [{label: '等待支付', value: 1}, {label: '支付完成', value: 2},
                {label: '支付失败', value: 3}, {label: '完成回调', value: 4}],
        span: 18,
        row: true
      }, {
        label: '备注',
        prop: 'remark',
        span: 18,
        row: true
      }, {
        label: '创建时间',
        prop: 'createTime',
        type: 'datetime',
        width: 150,
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