
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
            <template slot-scope="scope" slot="successNum">
                <a @click="goApiLog(scope.row, '1')" style="cursor:pointer">{{scope.row.successNum}}</a>
            </template> 

            <template slot-scope="scope" slot="failNum">
                <a @click="goApiLog(scope.row, '0')" style="cursor:pointer;color:red">{{scope.row.failNum}}</a>
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
export default class ApiStatistics extends Mixins(PageMixin, BaseMixin) {

    protected created() {
        this.pageQueryApi = this.$api.core.operationStatisticsList
        this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
          dialogWidth: '70%',
          labelWidth: 120,
          addBtn: false,
          editBtn: false,
          delBtn: false,
          menu: false,
          column: [{
            label: '接口apiId',
            prop: 'apiId',
            search: true
          }, {
            label: '成功次数',
            prop: 'successNum',
            sortable: true,
            slot: true
          }, {
            label: '失败次数',
            prop: 'failNum',
            sortable: true,
            slot: true
          }, {
            label: 'ip数',
            sortable: true,
            prop: 'ipNum'
          }, {
            label: '创建时间',
            prop: 'createTime',
            type: 'date',
            search: true,
            valueFormat: 'timestamp',
            format: 'yyyy-MM-dd'
          }]
      })
    }

    protected mounted() {
        this.queryList()
    }

    protected searchChangeSet(searchForm: any) {
        searchForm.createTime = this.$util.formatDate(searchForm.createTime, 'yyyy-MM-dd')
    }

    // 跳转操作成功列表
    private goApiLog(row: any, isSuccess: string) {
        this.$router.push(`/core/apilog?isSuccess=${isSuccess}&time=${row.createTime}&apiId=${row.apiId}`)
    }
    private deleteListClick() {
    this.$confirm('是否清空当前列表, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$api.core.apiStatisticsDelete().then(() => {
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