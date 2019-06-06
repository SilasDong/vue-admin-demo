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
           <template slot="menuLeft">
             <el-button type="primary" :size="uiSize" icon="el-icon-upload" @click="backup" v-if='hasPermission("BACKUP")'>数据库备份</el-button>
           </template>
           <template slot-scope="scope" slot="fileName">
            <span >{{scope.row.fileName.split('mysql_backup/')[1]}}<el-tag v-if='hasPermission("DOWNLOAD")' @click='download(scope.row.id)'>下载</el-tag></span>
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
export default class DbBackup extends Mixins(PageMixin, BaseMixin) {


  protected created() {
    this.pageQueryApi = this.$api.func.backUpList
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
       addBtn: false,
      editBtn: false,
      delBtn: false,
      menu: false,
      column: [{
        label: '文件名称',
        prop: 'fileName',
        slot: true
      }, {
        label: '文件大小',
        prop: 'size',
        formatter: (row: any, value: any) => {
          return value + 'M'
        }
      }, {
        label: '生成时间',
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

  private backup() {
    this.$api.func.backUp().then((res: any) => {
      this.$message.success('数据库备份成功')
      this.queryList()
    })
  }

  private download(id: any) {
    this.$confirm('您确定要下载', '下载确认', {
      confirmButtonText: '确认下载',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      window.open('/api/m-mysql-backUp-download?id=' + id)
    })
  }
}
</script>