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
        @row-save="rowSave"
        @row-update="rowUpdate"
        @row-del="rowDel"
        :before-open="beforeOpen"
        :before-close="beforeClose">
          <template slot-scope="scope" slot="imageUrl">
            <img v-if='scope.row.imageUrl' :src="showImage(scope.row.imageUrl)" style='width:90px;height:50px'/>
            <span v-else>暂无图片</span>
          </template>
          <template slot-scope="scope" slot="imageUrlForm">
            <silas-upload v-model="scope.row.imageUrl" listType='picture-img'></silas-upload>
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
import SilasUpload from '@/components/silas-upload/index.vue'

@Component({components: {SilasUpload}})
export default class WechatShare extends Mixins(PageMixin, BaseMixin) {


  protected created() {
    this.pageQueryApi = this.$api.func.wechatList
    this.insertApi = this.$api.func.inertWechat
    this.updateApi = this.$api.func.updateWechat
    this.deleteApi = this.$api.func.deleteWechat
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
      column: [{
        label: '分享标题',
        prop: 'title',
        search: true,
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请填写分享标题',
                trigger: 'blur'
            }]
      }, {
        label: '分享短名称',
        prop: 'type',
        span: 18,
        row: true,
        placeholder: '请输入分享短名称，public默认公众号分享，min默认小程序分享',
        rules: [{
                required: true,
                message: '请填写模板内容',
                trigger: 'blur'
            }]
      }, {
        label: '分享图片',
        prop: 'imageUrl',
        formslot: true,
        span: 24,
        slot: true,
        rules: [{ required: true, message: '请上传图片', trigger: 'blur' }]
      },  {
        label: '分享路径',
        prop: 'href',
        overHidden: true,
        span: 18,
        row: true,
        rules: [{
                required: true,
                message: '请填写分享路径',
                trigger: 'blur'
            }]
      }, {
        label: '分享详情',
        prop: 'description',
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
}
</script>