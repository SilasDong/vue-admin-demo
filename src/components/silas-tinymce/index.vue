<template>
  <div class="tinymce-container editor-container">
    <textarea class="tinymce-textarea" :id="tinymceId">
    </textarea>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Mixins} from 'vue-property-decorator'
import BaseMixin from '@/mixins/BaseMixin'

const plugins = [`paste importcss image code table advlist fullscreen
                  link media lists textcolor colorpicker hr preview`]
const toolbar = [`styleselect | fontselect | formatselect | fontsizeselect |
                  forecolor backcolor | bold italic underline strikethrough |
                  image  media | table | alignleft aligncenter alignright alignjustify |
                  outdent indent | numlist bullist | preview removeformat  hr |
                  paste code  link | undo redo | fullscreen `]
@Component
export default class SilasTinymce extends Mixins(BaseMixin) {

  @Prop({type: String})
  private id: any
  @Prop({type: String, default: ''})
  private value: any
  @Prop({type: Number, default: 360})
  private height: any
  @Prop({type: String, default: ''})
  private uuid: any
  @Prop({type: String, default: '/api/xcd-module-filemanager-file-upload?single=1'})
  private url: any
  @Prop({type: String, default: 'image/jpeg, image/png'})
  private accept: any
  @Prop({type: Number, default: 2097152})
  private maxSize: any
  @Prop({type: Object, default: () => {}})
  private config: any
  @Prop({type: Number})
  private uploadType: any

  private hasChange = false
  private hasInit = false
  private tinymceId = this.id || 'vue-tinymce-' + +new Date()
  private flag = ''
  private defaultConfig = {
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        height: 360,
        theme: 'modern',
        menubar: false, // file edit insert view format table,
        toolbar,
        plugins,
        file_picker_types: 'media',
        forced_root_block: 'p',
        force_p_newlines: true,
        importcss_append: true,
        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
          *                         { padding:0; margin:0; }
          html, body                { height:100%; }
          img                       { max-width:100%; display:block;height:auto; }
          a                         { text-decoration: none; }
          iframe                    { width: 100%; }
          p                         { line-height:1.6; margin: 0px; }
          table                     { word-wrap:break-word; word-break:break-all;
                                      max-width:100%; border:none; border-color:#999; }
          .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
          ul,ol                     { list-style-position:inside; }
        `,

        insert_button_items: 'image link | inserttable',
        // CONFIG: Paste
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]',        // word需要它
        paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        // CONFIG: Font
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
        // CONFIG: StyleSelect
          style_formats: [
            {
              title: '首行缩进',
              block: 'p',
              styles: { 'text-indent': '2em' }
            },
            {
              title: '行高',
              items: [
                {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
                {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
                {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
                {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
                {title: '3', styles: { 'line-height': '3' }, inline: 'span'}]
            }],
          // FontSelect
          font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,

        // Tab
        tabfocus_elements: ':prev,:next',
        object_resizing: true,

        // Image
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions'

        // body_class: 'panel-body ',
        // end_container_on_empty_block: true,
        // powerpaste_word_import: 'clean',
        // code_dialog_height: 450,
        // code_dialog_width: 1000,
        // advlist_bullet_styles: 'square',
        // advlist_number_styles: 'default',
        // imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        // default_link_target: '_blank',
        // link_title: false,
  }

  private uploadConfig: any

  get uploadTypeValue() {
    return this.uploadType === undefined ? Number.parseInt(process.env.VUE_APP_UPLOAD_TYPE, 10) : this.uploadType
  }

  protected created() {
    this.$api.comm.uploadToken().then((res: any) => {
      this.uploadConfig = res.data
    })
  }

  protected mounted() {
    this.initTinymce()
  }
  protected activated() {
    this.initTinymce()
  }
  protected deactivated() {
    this.destroyTinymce()
  }
  protected destroyed() {
    this.destroyTinymce()
  }

  @Watch('value', {immediate: true})
  private onWatchValue(val: any) {
    const win: any = window
    if (!this.hasChange && this.hasInit) {
      this.$nextTick(() => win.tinymce.get(this.tinymceId).setContent(val))
    } else if (this.uuid && this.uuid !== this.flag && this.hasInit) {
      this.$nextTick(() => win.tinymce.get(this.tinymceId).setContent(val))
    }
    this.flag = this.uuid
  }

  private initTinymce() {
      const that: any = this
      const win: any = window
      win.tinymce.init({
        ...this.defaultConfig,
        init_instance_callback: (editor: any) => {
          if (that.value) {
            editor.setContent(that.value)
          }
          that.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        // 图片上传
        images_upload_handler: (blobInfo: any, success: any, failure: any) => {
          if (blobInfo.blob().size > that.maxSize) {
            failure('文件体积过大')
          }
          if (that.accept.indexOf(blobInfo.blob().type) > -1) {
            uploadPic()
          } else {
            failure('图片格式错误')
          }
          function uploadPic() {
            const headers = { 'Content-Type': 'multipart/form-data' }
            const [formData, fileUrl] = that.createFormData(blobInfo.blob(), blobInfo.filename())
            const url = that.uploadTypeValue !== 0 ? that.uploadConfig.host : that.url
            const timeout = 10 * 60 * 1000
            that.$http.post(url, formData, { headers, timeout }).then((res: any) => {
              const rootUrl = that.uploadConfig && that.uploadConfig.showUrl
              let resutl = ''
              if (that.uploadTypeValue === 0) {
                resutl = (rootUrl || '') + res.data.path
              } else if (that.uploadTypeValue === 1) {
                resutl = rootUrl + (rootUrl.endsWith('/') ? '' : '/') + fileUrl
              } else if (that.uploadTypeValue === 2) {
                const host = rootUrl || that.uploadConfig.host
                resutl = rootUrl + (host.endsWith('/') ? '' : '/') + fileUrl
              }
              success(resutl)
            }).catch(() => {
              failure('上传失败')
            })
          }
        },

        file_picker_callback: (cb: any, value: any, meta: any) => {
          // 当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
          if (meta.filetype === 'media') {
            // 创建一个隐藏的type=file的文件选择input
            const input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'video/*')
            input.onchange = function(files: any) {
              const notification = that.createProgressBar()
              const file = (this as any).files[0]
              const headers = { 'Content-Type': 'multipart/form-data' }
              const url = that.uploadTypeValue !== 0 ? that.uploadConfig.host : that.url
              const [formData, fileUrl] = that.createFormData(file, file.name)
              that.$api.comm.uploadFile(url, formData, (progressEvent: any) => {
                const complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                if (complete < 100) {
                  notification.progressBar.value(complete)
                } else {
                  notification.progressBar.value(complete)
                  // 关闭进度提示
                  win.tinymce.activeEditor.notificationManager.close()
                }
              }).then((res: any) => {
                const rootUrl = that.uploadConfig && that.uploadConfig.showUrl
                let resutl = ''
                if (that.uploadTypeValue === 0) {
                  resutl = (rootUrl || '') + `/api/xcd-module-filemanager-file-download?id=${res.data.id}`
                } else if (that.uploadTypeValue === 1) {
                  resutl = rootUrl + (rootUrl.endsWith('/') ? '' : '/') + fileUrl
                } else if (that.uploadTypeValue === 2) {
                  const host = rootUrl || that.uploadConfig.host
                  resutl = rootUrl + (host.endsWith('/') ? '' : '/') + fileUrl
                }
                cb(resutl, { title: file.name})
              }).catch(() => {
                win.tinymce.activeEditor.notificationManager.close()
              })
            }
            // 触发点击
            input.click()
          }
        },
        // prop内传入的的config
        ...this.config
      })
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
    private destroyTinymce() {
      const win: any = window
      if (win.tinymce.get(this.tinymceId)) {
        win.tinymce.get(this.tinymceId).destroy()
      }
    }
    private setContent(value: any) {
      (window as any).tinymce.get(this.tinymceId).setContent(value)
    }
    private getContent() {
      (window as any).tinymce.get(this.tinymceId).getContent()
    }

    private createProgressBar() {
      const win: any = window
      const notification: any = win.tinymce.activeEditor.notificationManager.open({
        text: '视频上传进度',
        progressBar: true
      })
      const progressbarDialogId: any = notification['_id']
      const progressbarId = notification.progressBar['_id']
      const progressbarDialogNode: any = document.getElementById(progressbarDialogId)
      const progressbarNode: any = document.getElementById(progressbarId)
      // 最重要的部分：必须使提示框的z-index值不小于68000
      progressbarDialogNode.style['z-index'] = 90000
      // 以下部分调整提示框的样式
      progressbarDialogNode.style['border-radius'] = '5px'
      progressbarDialogNode.style.border = '1px solid #abdcff'
      progressbarDialogNode.style['background-color'] = '#f0faff'
      // 以下部分调整进度栏的样式,mce-bar-container为容器，mce-bar为实际进度，mce-text为进度数值显示
      const mceBarContainer = progressbarNode.querySelector('.mce-bar-container')
      const mceBar = progressbarNode.querySelector('.mce-bar')
      mceBarContainer.style['border-radius'] = '5px'
      mceBar.style['background-color'] = '#ffd77a'
      return notification
    }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-upload-btn {
  display: inline-block;
}
</style>