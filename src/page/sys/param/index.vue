<template>
  <div>
    <basic-container>
      <avue-tabs :option="option" @change="handleChange"></avue-tabs>
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
        :upload-before="uploadBefore"
        :upload-after="uploadAfter"
        :before-open="beforeOpen"
        :before-close="beforeClose" v-model="form">
          <template slot="menuLeft">
            <el-button type="primary" :size="uiSize" icon="el-icon-refresh" @click="synchronize" v-if="hasPermission('SYNCH')">同步缓存</el-button>
          </template>
          <template slot="paramValueForm"  slot-scope="scope">
            <el-input placeholder="请输入参数值" v-model="form.paramValue" v-if="form.paramType === 1"></el-input>
            <silas-upload v-model="form.paramValue" v-if="form.paramType === 2" listType='picture-img'></silas-upload>
            <silas-tinymce v-model="form.paramValue" v-if="dialogStatus != 1 && form.paramType === 3" :text='scope.id'></silas-tinymce>
          </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script lang='ts'>


import PageMixin from '@/mixins/PageMixin'
import BaseMixin from '@/mixins/BaseMixin'
import { DIC } from '@/const/dic'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Getter, Mutation, Action } from 'vuex-class'
import { Dict } from '@/interface'
import { DialogStatus } from '@/enum'
import SilasTinymce from '@/components/silas-tinymce/index.vue'
import SilasUpload from '@/components/silas-upload/index.vue'

@Component({components: {SilasTinymce, SilasUpload}})
export default class SysParam extends Mixins(PageMixin, BaseMixin) {

  private form: any = {paramValue: ''}
  private option: any = { column: [{label: '项目参数', prop: '0'}, {label: '系统参数', prop: '1'}] }
  private configType: any = 0

  protected created() {
    this.setPageSize(50)
    this.pageQueryApi = this.$api.sys.sysParamsList
    this.insertApi = this.$api.sys.insertSysParams
    this.updateApi = this.$api.sys.updateSysParams
    this.deleteApi = this.$api.sys.deleteSysParams
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
          dialogFullscreen: false,
          labelWidth: 180,
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
            label: '参数类型',
            prop: 'paramType',
            type: 'select',
            dicData: [{label: '参数类型', value: 1}, {label: '图片上传', value: 2}, {label: '富文本', value: 3}],
            valueDefault: 1,
            row: true,
            span: 18,
            rules: [{
                required: true,
                message: '请选择参数类型',
                trigger: 'blur'
            }]
        }, {
            label: '参数值',
            prop: 'paramValue',
            overHidden: true,
            row: true,
            span: 18,
            formslot: true,
            rules: [{
                required: true,
                message: '请输入参数值',
                trigger: 'blur'
            }],
            formatter: (row: any, value: string) => {
              if (row.paramType === 3) {
                return `【富文本】`
              } else if (row.paramType === 2) {
                return `【图片】`
              }
              return value
            }
        }, {
            label: '备注信息',
            prop: 'remarks',
            type: 'textarea',
            overHidden: true,
            row: true,
            span: 18
        }]
    })
  }

  protected mounted() {
    this.getList('0')
  }

  protected beforeCloseSet(type: any) {
    this.tableOpt = this.tmpTableOpt
  }

  // protected queryListCallBack(list = []) {
  //   (list || []).forEach((item: any) => {
  //     if (item.paramValue && item.paramValue.includes('[{')) {
  //       try {
  //         item.paramValue = JSON.parse(item.paramValue.replace(/'/g, '"'))
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   })
  //   this.pageList = list
  // }

  protected editRowData(form: any): any {
    // if (this.$util.getObjType(form.paramValue) === 'array') {
    //   form.paramValue = JSON.stringify(form.paramValue)
    // }
    return form
  }

  protected delRowData(row: any) {
    return {paramId: row.paramId}
  }


  @Watch('dialogStatus')
  private onWatchDialogStatus() {
    this.tableOpt.column[0].disabled = this.dialogStatus !== DialogStatus.ADD
  }

  @Watch('form.paramType')
  private onWatchParamType() {
    this.tableOpt.dialogFullscreen = this.form.paramType === 3
    this.setDailogHeight()
  }

  // 首次加载就触发
  private handleChange(column: any) {
    this.configType = column.prop
    this.getList(column.prop)
  }

  private getList(config: any) {
    this.searchForm.configType = config
    this.queryList()
  }

  private synchronize() {
    this.$api.sys.synchronizeSysParams().then((res: any) => {
      this.$message.success('缓存清除成功')
    })
  }
}
</script>
