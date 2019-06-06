<template>
  <div :class="b()">
    <el-upload :class="b({'list':listType=='picture-img'})"
               @click.native="handleClick"
               :action="action"
               :on-remove="handleRemove"
               :before-remove="beforeRemove"
               :multiple="multiple"
               :on-preview="handlePictureCardPreview"
               :limit="status?99:limit"
               :http-request="httpRequest"
               :drag="drag"
               :readonly="readonly"
               :show-file-list="showFileList"
               :list-type="listType"
               :on-change="handleChange"
               :on-exceed="handleExceed"
               :disabled="disabled"
               :file-list="fileList">
      <template v-if="listType=='picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else-if="listType=='picture-img'">
        <img v-if="imageUrl"
             :src="imageUrl"
             :class="b('avatar')">
        <i v-else
           class="el-icon-plus" style="padding: 20px 30px;"></i>
      </template>
      <template v-else-if="drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </template>
      <template v-else>
        <el-button :size="uiSize"
                   type="primary">点击上传</el-button>
      </template>
      <div slot="tip"
           class="el-upload__tip">{{tip}}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :append-to-body='true' >
      <div class="avue-dialog">
        <img width="100%"
             :src="dialogImageUrl"
             alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch} from 'vue-property-decorator'
import SilasCompoents from '@/mixins/SilasCompoents'
import BaseMixin from '@/mixins/BaseMixin'
@Component
export default class SilasUpload extends Mixins(SilasCompoents, BaseMixin) {

  protected text: any = this.status ? '' : []

  @Prop({ type: Function})
  protected before: any
  @Prop({type: String})
  protected dataType: any
  @Prop({ type: Boolean, default: true})
  protected multiple: any
  @Prop({})
  private value: any
  @Prop({ type: Boolean, default: true})
  private showFileList: any
  @Prop({ type: Number, default: 3})
  private limit: any
  @Prop({ type: String})
  private listType: any
  @Prop({ type: Boolean, default: false})
  private drag: any
  @Prop({ type: String, default: '文件上传中,请稍等'})
  private loadText: any
  @Prop({ type: String, default: '/api/xcd-module-filemanager-file-upload?single=1'})
  private action: any
  @Prop({type: Number})
  private uploadType: any

  private loading: any = false
  private dialogImageUrl = ''
  private dialogVisible = false
  private file: any = {}
  private uploadConfig: any

  get uploadTypeValue() {
    return this.uploadType === undefined ? Number.parseInt(process.env.VUE_APP_UPLOAD_TYPE, 10) : this.uploadType
  }

  get status() {
    return this.listType === 'picture-img'
  }
  get imageUrl() {
    return this.status ? this.value : ''
  }
  get fileList() {
    const list: any[] = []
    if (!this.status) {
      this.text.forEach((ele: any, index: any) => {
        let obj
        if (this.isArray || this.isString) {
          obj = {
            name: index,
            url: ele
          }
        } else {
          obj = {
            name: ele[this.labelKey],
            url: ele[this.valueKey]
          }
        }
        list.push(obj)
      })
    }
    return list
  }

  protected created() {
    if (!this.status && this.$util.getObjType(this.value) === 'array') {
      this.text = this.value
    }
    this.$api.comm.uploadToken().then((res: any) => {
      this.uploadConfig = res.data
    })
  }

  protected beforeRemove(file: any) {
    return this.$confirm(`确定移除 ${file.name}？`)
  }

  @Watch('value')
  private onWatchValue() {
    if (!this.status && this.$util.getObjType(this.value) === 'array') {
      this.text = this.value
    }
  }

  private handleClick() {
    if (typeof this.click === 'function') {
      this.click({ value: this.text, column: this.column })
    }
  }
  private handleChange(file: any, fileList: any) {
    fileList.splice(fileList.length - 1, 1)
    if (typeof this.change === 'function') {
      this.change({ value: this.text, column: this.column })
    }
  }
  private handleSuccess(url: string, fileName: string) {
    if (!this.status) {
      if (this.isArray) {
        this.text.push(url)
      } else {
        const obj: any = {}
        obj[this.labelKey] = fileName
        obj[this.valueKey] = url
        this.text.push(obj)
      }
    } else {
      this.text = url
    }
    this.$message.success('上传成功')
    this.setVal()
  }
  private handleRemove(file: any, fileList: any) {
    this.delete(file)
    this.$message.success('删除成功')
    this.setVal()
  }
  private handleError() {
    this.$message.error('上传失败')
  }
  private delete(file: any) {
    if (this.isArray) {
      this.text.forEach((ele: any, index: any) => {
        if (ele === file.url) {
          this.text.splice(index, 1)
        }
      })
    } else {
      this.text.forEach((ele: any, index: any) => {
        if (ele[this.valueKey] === file.url) {
          this.text.splice(index, 1)
        }
      })
    }
  }
  private show(url: string, fileName: string) {
      this.loading.close()
      this.handleSuccess(url, fileName)
    }
  private hide() {
    this.loading.close()
    this.handleError()
  }
  private httpRequest(config: any) {
    this.loading = this.$loading({
      lock: true,
      text: this.loadText,
      spinner: 'el-icon-loading'
    })
    const file = config.file
    this.file = config.file
    const headers = { 'Content-Type': 'multipart/form-data' }
    const [formData, fileUrl] = this.createFormData(file, file.name)
    const url = this.uploadTypeValue !== 0 ? this.uploadConfig.host : this.action
    const timeout = 10 * 60 * 1000
    const callack = () => {
      this.$http.post(url, formData, { headers, timeout }).then((res: any) => {
        const rootUrl = this.uploadConfig && this.uploadConfig.showUrl
        let resutl = ''
        if (this.uploadTypeValue === 0) {
          resutl = (rootUrl || '') + res.data.path
        } else if (this.uploadTypeValue === 1) {
          resutl = rootUrl + (rootUrl.endsWith('/') ? '' : '/') + fileUrl
        } else if (this.uploadTypeValue === 2) {
          const host = rootUrl || this.uploadConfig.host
          resutl = rootUrl + (host.endsWith('/') ? '' : '/') + fileUrl
        }
        this.$log.info('upload', this.uploadTypeValue, resutl, file.name)
        this.show(resutl, file.name)
      }).catch((error: any) => {
        this.hide()
      })
    }
    if (typeof this.before === 'function') {
      this.before(this.file, callack, () => {
        this.loading.close()
      })
    } else {
      callack()
    }
  }
  private setVal() {
    const result = this.isString ? this.text.join(',') : this.text
    this.$emit('input', result)
    this.$emit('change', result)
  }
  private handleExceed(files: any, fileList: any) {
    this.$message.warning(`当前限制选择 ${this.limit} 个文件，
    本次选择了 ${files.length} 个文件，共上传了 ${files.length + fileList.length} 个文件`)
  }
  private handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url
    this.dialogVisible = true
  }

  private createFormData(file: any, fileName: string) {
    let url = ''
    let lastName = ''
    if (fileName && fileName.includes('.')) {
      lastName = `.${fileName.split('.')[fileName.split('.').length - 1]}`
    }
    const formData = new FormData()
    if (this.uploadTypeValue === 1) {
      url = `${this.uploadConfig.dir}/${this.$util.uuid()}${lastName}`
      formData.append('key', url)
      formData.append('token', this.uploadConfig.uptoken)
    } else if (this.uploadTypeValue === 2) {
      url = `${this.uploadConfig.dir}/${this.$util.uuid()}${lastName}`
      formData.append('key', url)
      formData.append('OSSAccessKeyId', this.uploadConfig.accessid)
      formData.append('policy', this.uploadConfig.policy)
      formData.append('signature', this.uploadConfig.signature)
      formData.append('success_action_status', '200')
    }
    formData.append('file', file, fileName)
    return [formData, url]
  }

  private b(cls = '') {
    return `avue-crud-upload__${cls}`
  }
}
</script>
