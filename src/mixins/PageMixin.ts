import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { DialogStatus } from '@/enum'
import BaseMixin from './BaseMixin'

@Component
export default class PageMixin extends Mixins(BaseMixin) {
    @Getter('permission') protected permission: any
    @Getter('border') protected uiBorder: any
    @Getter('stripe') protected uiStripe: any
    /**
     * 表格加载loading控制
     */
    protected loading: boolean = true
    /**
     * 搜索条件
     */
    protected searchForm: any = {}
    /**
     * 分页返回list
     */
    protected pageList: any[] = []

    /**
     * 选中的数据
     */
    protected selectionList: any[] = []
    /**
     * 分页查询api
     */
    protected pageQueryApi: any

    /**
     * 新增api
     */
    protected insertApi: any
    /**
     * 更新api
     */
    protected updateApi: any
    /**
     * 更删除api
     */
    protected deleteApi: any

    /**
     * 基础的表格对象
     */
    protected BASE_TABLE_OPT = {
        labelWidth: 120,
        align: 'center',
        menuType: 'text',
        dialogFullscreen: false,
        addBtn: true,
        delBtn: true,
        editBtn: true,
        labelPosition: 'right',
        menuWidth: 240,
        border: true,
        stripe: true
    }

    /**
     * 表格属性对象
     */
    protected tableOpt: any = this.BASE_TABLE_OPT
    /**
     * 临时表格属性对象
     */
    protected tmpTableOpt: any
    /**
     * 分页信息
     */
    protected page = {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
    }

    protected dialogStatus: DialogStatus = DialogStatus.EMPTY
    @Getter('clientWidth') private clientWidth: any

    protected created() {
        this.tableOpt.addBtn = this.getPermission('ADD')
        this.tableOpt.editBtn = this.getPermission('EDIT')
        this.tableOpt.delBtn = this.getPermission('DEL')
        this.tableOpt.size = this.uiSize
        this.tableOpt.border = this.uiBorder
        this.tableOpt.stripe = this.uiStripe
    }

    protected mounted() {
        this.initSearchParams()
    }

    // 设置分页数量
    protected setPageSize(size: number) {
        this.page.pageSize = size
    }

    /**
     * 分页查询函数
     */
    protected queryList() {
        const params = Object.assign({ page: this.page.currentPage, pageSize: this.page.pageSize }, this.searchForm)
        return new Promise((resolve) => {
            const isString = this.pageQueryApi && this.$util.getObjType(this.pageQueryApi) === 'string'
            const promise = isString ? this.$http.get(`/api/${this.pageQueryApi}`, params) : this.pageQueryApi(params)
            promise.then((res: any) => {
                this.loading = false
                this.queryListCallBack(res.data.dataList || res.data || [])
                this.page.total = res.data.total || 0
                resolve(res.data.dataList || res.data || [])
            })
        })
    }

    /**
     * 搜索之前操作
     */
    protected searchBefore() {
        //
    }

    /**
     * 查询返回数据处理
     */
    protected queryListCallBack(list = []) {
        this.pageList = list
    }

    /**
     * 刷新函数
     * @param param0
     */
    protected refreshChange({ page, searchForm }: any) {
        this.loading = true
        this.queryList()
    }

    /**
     * 每页分页数改变
     * @param pageSize
     */
    protected sizeChange(pageSize: number) {
        this.loading = true
        this.page.currentPage = 1
        this.page.pageSize = pageSize
        this.queryList()
    }

    /**
     * 当前分页数改变
     * @param currentPage
     */
    protected currentChange(currentPage: number) {
        this.loading = true
        this.page.currentPage = currentPage
        this.queryList()
    }

    // 选择数据
    protected selectionChange(list: any) {
        this.selectionList = list
    }

    /**
     * 分页搜索
     * @param params
     */
    protected searchChange(params: any) {
        this.searchBefore()
        console.log('this.params', params)
        this.searchForm = {}
        this.page.currentPage = 1
        this.loading = true
        this.searchForm = Object.assign(this.searchForm, params)
        console.log('this.searchForm', this.searchForm)
        this.searchChangeSet(this.searchForm)
        this.queryList()
    }

    protected searchChangeSet(searchForm: any) {

    }

    /**
     * 分页搜索条件清空
     */
    protected searchReset() {
        this.page.currentPage = 1
        this.searchForm = {}
        this.initSearchParams()
        this.loading = true
        this.queryList()
    }

    /**
     * 打开编辑框时记录编辑类型
     * @param done
     * @param type
     */
    protected beforeOpen(done: any, type: any) {
        this.tmpTableOpt = this.$util.deepClone(this.tableOpt)
        this.dialogStatus = type === 'add' ? DialogStatus.ADD :
                            type === 'edit' ? DialogStatus.EDIT : DialogStatus.DETAIL
        this.setDailogHeight()
        this.beforeOpenSet(type)
        done()
    }

    protected beforeOpenSet(type: any) {

    }

    /**
     * 最大弹框的最大高度
     */
    protected setDailogHeight() {
        const height = this.tableOpt.dialogFullscreen ? (window.innerHeight - 200) + 'px' : '400px'
        this.$util.timeout(() => {
            let dom: any = document.querySelector('.el-dialog__body')
            dom = dom.querySelector('div')
            if (dom) {
                dom.style.minHeight = height
            }
        }, 100)
    }

    /**
     * 关闭弹出框时操作
     * @param done
     * @param type
     */
    protected beforeClose(done: any, type: any) {
        this.dialogStatus = DialogStatus.EMPTY
        this.beforeCloseSet(type)
        done()
    }

    protected beforeCloseSet(type: any) {

    }

    /**
     * 新增行数据
     * @param form
     * @param done
     * @param loading
     */
    protected rowSave(form: any, done: any, loading: any) {
        if (!this.validate(form, done, loading)) {
            return
        }
        form = this.editRowData(form)
        const isString = this.insertApi && this.$util.getObjType(this.insertApi) === 'string'
        const promise = isString ? this.$http.post(`/api/${this.insertApi}`, form) : this.insertApi(form)
        promise.then((res: any) => {
            this.$notify({
                title: '操作成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
            })
            this.queryList()
            done()
        }).catch((err: any) => {
            loading()
        })
    }

    /**
     * 更新行数据
     * @param form
     * @param done
     * @param loading
     */
    protected rowUpdate(form: any, index: any,  done: any, loading: any) {
        if (!this.validate(form, done, loading)) {
            return
        }
        form = this.editRowData(form)
        const isString = this.updateApi && this.$util.getObjType(this.updateApi) === 'string'
        const promise = isString ? this.$http.post(`/api/${this.updateApi}`, form) : this.updateApi(form)
        promise.then((res: any) => {
            this.$notify({
                title: '操作成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
            })
            this.queryList()
            done()
        }).catch((err: any) => {
            loading()
        })
    }

    /**
     * 保存或者编辑时行数据处理
     * @param form
     */
    protected editRowData(form: any): any {
        return form
    }

    /**
     * 校验数据
     * @param form
     */
    protected validate(form: any, done: any, loading: any): boolean {
        return true
    }

    /**
     * 删除行数据
     * @param row
     * @param index
     */
    protected rowDel(row: any, index: any) {
        const param = this.delRowData(row)
        this.$confirm('您确定要删除数据吗？删除后数据将不可恢复。', '删除确认', {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            const isString = this.deleteApi && this.$util.getObjType(this.deleteApi) === 'string'
            const promise = isString ? this.$http.post(`/api/${this.deleteApi}`, param) : this.deleteApi(param)
            promise.then((res: any) => {
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

    /**
     * 删除时，行数据处理
     * @param form
     */
    protected delRowData(row: any): any {
        return { id: row.id }
    }


    // 初始化搜索默认值
    private initSearchParams() {
        for (const item of this.tableOpt.column) {
            if ((item || item.searchDefault === 0) && item.prop && !this.searchForm[item.prop]) {
                this.searchForm[item.prop] = item.searchDefault
            }
        }
    }

    // 判断是否又权限
    private getPermission(code: string) {
        let permission = this.permission.filter((res: any) => {
            return res.menuId === this.$route.meta.menuId
        })
        permission = permission && permission[0] && permission[0].permissions
        if (permission) {
            return permission.includes(code)
        }
        return true
    }
}
