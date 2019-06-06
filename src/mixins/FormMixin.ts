import { Component, Mixins, Watch } from 'vue-property-decorator'
import { FormStatus } from '@/enum'
import BaseMixin from './BaseMixin'
import { Getter } from 'vuex-class'
/**
 * 编辑状态的枚举
 */
@Component
export default class FormMixin extends Mixins(BaseMixin) {
    /**
     * form表单对象
     */
    protected form: any = {}

    protected BASE_FORM_OPT = {
        labelPosition: 'right'
    }
    /**
     * form表单的配置属性
     */
    protected formOpt: any = this.BASE_FORM_OPT
    /**
     * 编辑状态
     */
    protected formStatus = FormStatus.EMPTY
    /**
     * 添加api
     */
    protected fromAddApi: any
    /**
     * 编辑api
     */
    protected fromEditApi: any
    /**
     * 编辑api
     */
    protected fromSubmitApi: any
    @Getter('clientWidth') private clientWidthForm: any

    protected created() {
        this.formOpt.size = this.uiSize
    }

    /**
     * 表单提交
     * @param form
     */
    protected handleSubmit(form: any) {
        this.fromSubmitApi = this.formStatus === FormStatus.EDIT ? this.fromEditApi : this.fromAddApi
        form = this.editFormData(form)
        if (form) {
            const isString = this.fromSubmitApi && this.$util.getObjType(this.fromSubmitApi) === 'string'
            const promise = isString ? this.$http.post(`/api/${this.fromSubmitApi}`, form) : this.fromSubmitApi(form)
            promise.then((res: any) => {
                this.$message.success(`${this.formOpt.submitText}成功`)
                this.submitCallBack(res)
            })
        }
    }

    /**
     * 编辑提交数据
     * @param form
     */
    protected editFormData(form: any): any {
        return form
    }

    /**
     * 表单提交回调
     * @param res
     */
    protected submitCallBack(res: any) {
        //
    }

    @Watch('clientWidthForm', { immediate: true })
    private onWatchClientWidth() {
        if (this.clientWidthForm > 768 && this.formOpt.labelPosition !== 'right') {
            this.formOpt.labelPosition = 'right'
        } else if (this.clientWidthForm <= 768 && this.formOpt.labelPosition !== 'top') {
            this.formOpt.labelPosition = 'top'
        }
    }
}
