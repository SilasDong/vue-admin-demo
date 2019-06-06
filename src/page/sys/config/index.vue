<template>
  <div>
    <basic-container>
      <avue-tabs :option="option" @change="handleChange"  v-if='isTabs'>
      </avue-tabs>
      <avue-crud
            ref="crud"
            :option="tableOpt"
            :data="pageList"
            :page='page'
            :table-loading="loading"
            @search-change="searchChange"
            @search-reset='searchReset'
            @refresh-change="refreshChange"
            @row-save="rowSave"
            @row-update="rowUpdate"
            @row-del="rowDel"
            :before-open="beforeOpen"
            :before-close="beforeClose">
              <template slot="menuLeft">
                <el-button type="primary" :size="uiSize" icon="el-icon-refresh" @click="synchronize" v-if="hasPermission('SYNCH')">同步缓存</el-button>
              </template>
          </avue-crud>
    </basic-container>
  </div>
</template>

<script lang='ts'>

import PageMixin from '@/mixins/PageMixin'
import BaseMixin from '@/mixins/BaseMixin'
import { DIC } from '@/const/dic'
import { Component, Mixins } from 'vue-property-decorator'
import { Getter, Mutation, Action } from 'vuex-class'
import { Dict } from '@/interface'

@Component
export default class SysConfig extends Mixins(PageMixin, BaseMixin) {

  private option: any = { column: [] }
  private tabsList: any[] = []
  private isTabs = false
  private configType: any

  protected created() {
    this.pageQueryApi = this.$api.sys.configList
    this.updateApi = this.$api.sys.updateConfig
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
          labelWidth: 180,
          addBtn: false,
          delBtn: false,
          column: [{
            label: '参数KEY',
            prop: 'paramKey',
            disabled: true,
            search: true,
            row: true,
            span: 18,
            rules: [{
                required: true,
                message: '请输入参数KEY',
                trigger: 'blur'
            }, { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }]
          }, {
            label: '参数值',
            prop: 'paramValue',
            overHidden: true,
            row: true,
            span: 18,
            formslot: false
        }, {
            label: '备注信息',
            prop: 'remarks',
            type: 'textarea',
            overHidden: true,
            row: true,
            span: 18
        }, {
            label: '项目类型',
            prop: 'configType',
            hide: true,
            display: false,
            searchDefault: '1',
            row: true,
            span: 18
        }]
    })
  }

  protected mounted() {
    this.setPageSize(50)
    this.$api.comm.queryDict('config_type').then((res: any) => {
      this.option.column = []
      res.data.forEach((item: Dict) => {
        this.option.column.push({label: item.label, prop: item.value})
      })
      this.getList(this.option.column[0].prop)
      this.isTabs = true
    })
  }

  // 首次加载就触发
  private handleChange(column: any) {
    this.configType = column.prop
    this.getList(column.prop)
  }

  private getList(config: any) {
    this.tableOpt.column[3].searchDefault = config
    this.searchForm.configType = config
    this.queryList()
  }

  private synchronize() {
    this.$api.sys.synchronizeConfig({configType: this.configType}).then((res: any) => {
      this.$message.success('缓存清除成功')
    })
  }
}
</script>
