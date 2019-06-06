
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
      @search-reset='searchReset'
      @refresh-change="refreshChange"
      @size-change="sizeChange"
      @current-change="currentChange"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      :before-open="beforeOpen"
      :before-close="beforeClose"
      v-model="form">
        <template slot="search">
          <el-form-item label="资源名称">
            <el-input placeholder="前置/后置/资源名称" :size="uiSize" v-model="searchForm.resourcesName" clearable/>
          </el-form-item>
        </template>
        <template slot="menuLeft">
          <el-button type="primary" :size="uiSize" v-if='hasPermission("SYNCH")' icon="el-icon-refresh" @click="synchronize">同步API</el-button>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button :size="scope.size" type="text"  v-if='hasPermission("COPY")' @click='copy(scope.row)'>复制</el-button>
          <el-button :size="scope.size" type="text" v-if='hasPermission("AUTH")' @click="authorize(scope.row)">授权</el-button>
        </template>
        <template slot-scope="scope"
                  slot="sqlType">
          <span v-if='scope.row.paramsProcessor'>{{scope.row.paramsProcessor}} <br/></span>
          <el-tag v-if="scope.row.opType == 2">资源名称</el-tag>
          <el-tag v-else>{{scope.row.sqlType}}</el-tag>
          <span v-if='scope.row.resultProcessor'><br/>{{scope.row.resultProcessor}}</span>
        </template>
        <template slot-scope="scope"
                  slot="apiId">
          <span>
            {{scope.row.apiId}}<span v-if="scope.row.status == 0" style="color: red">[禁用]</span>
          </span>
        </template>
        <template slot-scope="scope"
                  slot="sqlText">
          <span @click='showContent(scope.row)' v-if="scope.row.opType == 1"  style="color:#409EFF;cursor:pointer">
            {{scope.row.sqlText}}
          </span>
          <span v-else>
            <el-tag>{{scope.row.processor}}</el-tag>
          </span>
        </template>
        <template slot-scope="scope"
                  slot="params">
          <span @click='showParams(scope.row)' style="color:#409EFF;cursor:pointer">
            {{scope.row.params || []}}
          </span>
        </template>
      </avue-crud>

      <el-dialog title="完整内容" :visible.sync="dialogContent.visible">
        <el-form>
          <el-form-item>
            <el-input type="textarea" v-model="oneParams.sqlText" :autosize="{ minRows: 4, maxRows: 18}"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="sqlFormatSure(oneParams.sqlText)" v-if="dialogContent.sqlType != 'selectForRecursionForPage'">sql格式化</el-button>
          <el-button type="success" @click="jsonFormatSure(oneParams.sqlText)" v-else>json格式化</el-button>
          <el-button type="primary" @click="handleUpdateOneParams" >更 新</el-button>
          <el-button @click="dialogContent.visible = false" >关 闭</el-button>
        </span>
      </el-dialog>

    <el-dialog title="参数详情" :visible.sync="paramStatus" width="70%">
      <el-row >
        <el-col :span="12">
          <el-select v-model="newParams" placeholder="请选择" :multiple='true' :default-first-option='true' :filterable='true' :allow-create='true'>
            <el-option v-for="item in newParamsList" :key="item.name" :label="item.name" :value="item.name" :disabled='item.disabled'> </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
            <el-button type='primary' style='margin-left:20px' @click="createParams">生成</el-button>
            <el-button type='primary' style='margin-left:20px' @click="switchParamShow">{{paramShowType}}</el-button>
        </el-col>
      </el-row>
       <el-form  v-if='paramShowType != "json"'>
        <el-form-item>
          <el-input type="textarea" v-model="oneParams.params" :autosize="{ minRows: 4, maxRows: 18}"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data='paramsList' border fit highlight-current-row style='width:100%;margin-top:15px' v-else>
        <el-table-column min-width='80' align='center' label='参数名称'>
          <template slot-scope='scope'>
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width='80' align='center' label='是否可空'>
          <template slot-scope='scope'>
            <el-switch v-model='scope.row.isNullAble' active-text='是' inactive-text='否' :active-value='true' :inactive-value='false'></el-switch>
          </template>
        </el-table-column>
        <el-table-column min-width='70' align='center' label='参数类型'>
          <template slot-scope='scope'>
            <el-select class='filter-item' v-model='scope.row.type' placeholder='请选择'>
              <el-option  v-for='item in paramValueTypeList' :key='item.value' :label='item.value' :value='item.value'>
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column min-width='80' align='center' label='错误信息'>
          <template slot-scope='scope'>
            <el-input type='textarea' :rows='1' v-model='scope.row.errmsg'></el-input>
          </template>
        </el-table-column>
        <el-table-column min-width='80' align='center' label='类型信息'>
          <template slot-scope='scope'>
            <el-input type='textarea' :rows='1' v-model='scope.row.typemsg'></el-input>
          </template>
        </el-table-column>
        <el-table-column min-width='100' align='center' label='校验信息'>
          <template slot-scope='scope'>
            <el-input type='textarea' :rows='1' v-model='scope.row.validators' @focus="updateValidators(scope.row)" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column min-width='20' align='center' label='操作'>
          <template slot-scope='scope'>
            <i class="el-icon-delete" size='big' @click="deleteParams(scope.row.name)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
          <el-button @click="paramStatus = false">取 消</el-button>
          <el-button type="primary" @click="handleUpdateOneParams">更 新</el-button>
      </div>
    </el-dialog>

    <el-dialog title="检验信息" :visible.sync="validatorStatus" >
      <el-form :model="validators" label-width="200px" style='width:75%;'>
          <el-form-item label='校验类型:'>
            <el-select style='margin-left:40px' class='filter-item' v-model='validators.validator' placeholder='请选择'>
              <el-option v-for='item in validateTypeList' :key='item.value' :label='item.value' :value='item.value'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='错误信息:'>
            <el-input style='margin-left:40px' v-model='validators.errmsg'></el-input>
          </el-form-item>
          <el-form-item label='参数:'>
            <el-select style='margin-left:40px;width:60%' v-model="validators.params" :multiple='true' :default-first-option='true' :filterable='true' :allow-create='true' >
              <el-option v-for="item in options" :key="item.value"  :label="item.label"  :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-input style='margin-left:40px' v-model='validators.params'></el-input> -->
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="validatorStatus = false">取 消</el-button>
          <el-button type="primary" @click="updateValidatorSure">确 定</el-button>
      </div>
    </el-dialog>

    </basic-container>
  </div>
</template>

<script lang='ts'>
import PageMixin from '@/mixins/PageMixin'
import BaseMixin from '@/mixins/BaseMixin'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import {Getter, Mutation, Action} from 'vuex-class'
import { DIC } from '@/const/dic'
const sqlFormatter = require('sql-formatter')

@Component
export default class CoreApi extends Mixins(PageMixin, BaseMixin) {
  private oneParams: any = {}  // api单条数据
  private form: any = {}
  private newParamsList: any = []
  private paramsList: any = []
  private newParams: any = []
  private paramStatus = false
  private paramValueTypeList: any = [] // 参数值类型
  private validateTypeList: any = [] // 校验类型
  private validatorStatus = false
  private validators: any = {}
  private options = []
  private paramShowType = 'json'

  private dialogContent = { visible: false, data: '', sqlType: '' }

  protected created() {
    this.pageQueryApi = this.$api.core.queryApiList
    this.insertApi = this.$api.core.insertApi
    this.updateApi = this.$api.core.updateApi
    this.deleteApi = this.$api.core.deleteApi
    this.tableOpt = Object.assign(this.$util.deepClone(this.BASE_TABLE_OPT), {
          dialogWidth: '70%',
          dialogFullscreen: true,
          labelWidth: 120,
          column: [{
            label: 'API类型',
            prop: 'apiType',
            type: 'select',
            dicUrl: '/api/m-sys-dict-query?groupId=api_type',
            search: true,
            hide: true,
            span: 8,
            rules: [{
                required: true,
                message: '请选择API类型',
                trigger: 'blur'
            }]
          }, {
            label: '操作类型',
            type: 'select',
            prop: 'opType',
            dicData: DIC.OPTTYPE,
            hide: true,
            span: 8,
            rules: [{
                required: true,
                message: '请选择操作类型',
                trigger: 'blur'
            }]
          }, {
            label: 'sql类型',
            prop: 'sqlType',
            type: 'select',
            dicData: DIC.SQLTYPE,
            rules: [],
            slot: true,
            span: 8,
            search: true,
            display: false
          }, {
            label: '资源名称',
            prop: 'processor',
            disabled: false,
            rules: [],
            hide: true,
            span: 8,
            display: false
          }, {
            label: 'APIID',
            prop: 'apiId',
            search: true,
            slot: true,
            rules: [{
                required: true,
                message: '请输入APIID',
                trigger: 'blur'
            }, { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }]
          }, {
            label: 'API名称',
            prop: 'apiName',
            search: true,
            rules: [{
                required: true,
                message: '请输入API名称',
                trigger: 'blur'
            }, { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }]
          }, {
            label: 'API状态',
            prop: 'status',
            type: 'radio',
            dicData: DIC.STATUS,
            valueDefault: 1,
            hide: true
          }, {
            label: '是否系统',
            prop: 'isSystem',
            type: 'radio',
            dicData: DIC.ISSUCCESS,
            valueDefault: 0,
            hide: true
          }, {
            label: '授权角色',
            prop: 'roleIds',
            type: 'checkbox',
            hide: true,
            span: 24,
            rules: [{
                required: true,
                message: '请选择角色',
                trigger: 'blur'
            }],
            dicUrl: '/api/xcd-m-sys-role-dic'
          }, {
            label: 'SQL语句',
            prop: 'sqlText',
            type: 'textarea',
            minRows: 3,
            maxRows: 10,
            rules: [],
            slot: true,
            overHidden: true,
            span: 24,
            row: true,
            display: false
          }, {
            label: '参数',
            prop: 'params',
            type: 'textarea',
            minRows: 3,
            maxRows: 10,
            slot: true,
            overHidden: true,
            span: 24,
            row: true
          }, {
            label: '前置类',
            prop: 'paramsProcessor',
            hide: true
          }, {
            label: '后置类',
            prop: 'resultProcessor',
            hide: true
          }, {
            label: '前置参数',
            prop: 'preloadReqAttribute',
            placeholder: '格式：参数1=参数值1;参数2=参数值2, 使用:ra_获取',
            hide: true,
            overHidden: true
          }, {
            label: '多语句配置',
            prop: 'multiSqlConfig',
            placeholder: '格式：apiId:apiVersion:alias,apiId:apiVersion:alias或者执行多语句流程',
            rules: [],
            hide: true,
            overHidden: true,
            display: false
          }, {
            label: '递归字段',
            prop: 'recursionColumn',
            placeholder: '格式：子字段:父字段',
            rules: [],
            hide: true,
            overHidden: true,
            display: false
          }, {
            label: '递归层次',
            prop: 'recursionMaxDeep',
            placeholder: '用于sqlType为selectForRecursion，必须大于0',
            type: 'number',
            valueDefault: 0,
            hide: true,
            rules: [],
            overHidden: true,
            display: false
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
    this.$api.sys.dictList('validate_type').then((res: any) => {
      this.validateTypeList = res.data || []
    })
    this.$api.sys.dictList('paramValue_type').then((res: any) => {
      this.paramValueTypeList = res.data || []
    })
  }

  protected queryListCallBack(list: any) {
    list.forEach((item: any) => {
      item.roleIds = item.roleIds && item.roleIds.split(',')
    })
    this.pageList = list
  }

  protected editRowData(form: any): any {
    form.roleIds = form.roleIds && form.roleIds.join()
    return form
  }

  protected beforeClose(done: any, type: any) {
    this.tableOpt = this.tmpTableOpt
    this.tableOpt.dialogFullscreen = true
    done()
  }

  @Watch('form.opType')
  private onWatchOpType() {
    if (this.form.opType === 1) {
      this.tableOpt.column[2].display = true
      this.tableOpt.column[2].rules = [{ required: true, message: '请选择SQL类型', trigger: 'blur' }]
      this.tableOpt.column[3].display = false
      this.tableOpt.column[3].rules = []
      this.tableOpt.column[9].display = true
      this.tableOpt.column[9].rules = [{ required: true, message: '请填写SQL语句', trigger: 'blur' }]
    } else if (this.form.opType === 2) {
      this.tableOpt.column[2].display = false
      this.tableOpt.column[2].rules = []
      this.tableOpt.column[3].display = true
      this.tableOpt.column[3].rules = [{ required: true, message: '请填写资源名称', trigger: 'blur' }]
      this.tableOpt.column[9].display = false
      this.tableOpt.column[9].rules = []
      this.tableOpt.column[14].rules = []
      this.tableOpt.column[15].rules = []
      this.tableOpt.column[16].rules = []
      this.tableOpt.column[14].display = false
      this.tableOpt.column[15].display = false
      this.tableOpt.column[16].display = false
    }
  }

  @Watch('form.sqlType')
  private onWatchSqlType() {
    if (!this.form.sqlType) {
      return
    }
    this.tableOpt.column[14].rules = []
    this.tableOpt.column[14].display = false
    this.tableOpt.column[15].rules = []
    this.tableOpt.column[15].display = false
    this.tableOpt.column[16].rules = []
    this.tableOpt.column[16].display = false
    if (this.form.sqlType.includes('selectForRecursion')) {
      this.tableOpt.column[15].rules = [{ required: true, message: '请填写递归字段', trigger: 'blur' }]
      this.tableOpt.column[15].display = true
      this.tableOpt.column[16].rules = [{ required: true, message: '请填写递归层次', trigger: 'blur' }]
      this.tableOpt.column[16].display = true
    } else if (this.form.sqlType.includes('multiSql')) {
       this.tableOpt.column[14].rules = [{ required: true, message: '请填写多语句配置项', trigger: 'blur' }]
       this.tableOpt.column[14].display = true
    }
  }

  // 更新api参数内容
  private handleUpdateOneParams() {
    if (this.oneParams.params && this.paramShowType === 'json') {
      let tmpList = this.$util.deepClone(this.paramsList)
      if (tmpList.length > 0) {
        tmpList.forEach((element: any) => {
          element.name = 'rp_' + element.name
          if (element.validators && element.validators.length > 0) {
            element.validators = JSON.parse(element.validators)
          }
        })
      } else {
        tmpList = []
      }
      this.oneParams.params = JSON.stringify(tmpList, undefined, 4)
    }
    this.$api.core.updataApiOneParams(this.oneParams).then((res: any) => {
      this.$notify({
        title: '操作成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
      this.queryList()
    })
  }

  private synchronize() {
    this.$api.core.synchronizeApi().then((res: any) => {
      this.$message.success('缓存清除成功')
    })
  }

  private copy(row: any) {
    this.$refs.crud.rowAdd()
    setTimeout(() => {
      this.form = row
    }, 200)
  }

  private authorize(row: any) {
    this.tableOpt.dialogFullscreen = false
    this.$refs.crud.rowEdit(row, row.$index)
    this.$util.timeout(() => {
      this.tableOpt.column.forEach((item: any) => {
        if (item.prop !== 'roleIds') {
          item.display = false
        }
      })
    }, 300)
  }

  // 显示完整的sql内容
  private showContent(data: any, isParam = false) {
    if (isParam) {
      this.oneParams.params = JSON.stringify(JSON.parse(data.params.replace(/'/g, '"')), undefined, 4)
    } else {
      this.oneParams = {id: data.id, sqlText: data.sqlText}
      this.dialogContent.visible = true
    }
  }

  // 显示参数内容
  private showParams(data: any) {
    this.paramShowType = 'json'
    this.oneParams = {id: data.id, params: data.params, sqlText: data.sqlText}
    this.newParamsList = []
    this.paramsList = []
    if (data.params) {
      this.paramsList = JSON.parse(data.params)
      if (data.sqlText) {
        const patt = /:rp(.*?)[\s-,]/g
        let result = data.sqlText.match(patt)
        if (result) {
          const resultArr: any = []
          const tempResult = result
          result = []
          tempResult.forEach((element: any) => {
            if (element.indexOf('id_uuid') === -1) {
              result.push(element)
            }
          })
          if (result) {
            result.forEach((element: any) => {
              resultArr.push(element.split('_')[1].replace(',', '').replace(' ', '').replace(';', ''))
            })
          }
          const tmpArr = []// 临时数组
          for (const item of resultArr) {
            if (tmpArr.indexOf(item) === -1 || item.indexOf('id') === -1) {
              tmpArr.push(item)
            }
          }
          // 初始化
          tmpArr.forEach((element: any) => {
            let disable = false
            this.paramsList.forEach((element1: any) => {
              if ('rp_' + element.replace(/^\s+|\s+$/g, '') === element1.name) {
                disable = true
              }
            })
            this.newParamsList.push({ name: element, disabled: disable })
          })
        }
      }
      this.paramsList.forEach((element: any) => {
        element.name = element.name.split('rp_')[1]
        if (element.validators) {
          element.validators = JSON.stringify(element.validators, undefined, 4)
        }
      })
    }
    this.paramStatus = true
  }


  // 切换param展示方式
  private switchParamShow() {
    this.paramShowType = this.paramShowType === 'json' ? 'table' : 'json'
    if (this.paramShowType === 'json') {
      this.showParams(this.oneParams)
    } else {
      this.showContent(this.oneParams, true)
    }
  }

  // 校验信息编辑
  private updateValidators(params: any) {
    this.validatorStatus = true
    if (params.validators) {
      const temp = JSON.parse(params.validators)
      temp[0].name = params.name
      this.validators = temp[0]
    } else {
      this.validators = { name: params.name, validator: '', errmsg: '', params: [] }
    }
  }

  // 选择生成
  private createParams() {
    if (this.newParams.length > 0) {
      this.newParams.forEach((element: any) => {
        this.paramsList.push({ name: element.replace(/^\s+|\s+$/g, ''),
          isNullAble: true, type: 'string', errmsg: '', typemsg: '' })
        this.newParamsList.forEach((element1: any) => {
          if (element1.name === element.replace(/^\s+|\s+$/g, '')) {
            element1.disabled = true
          }
        })
      })
    } else {
      this.$message({ message: '请先选择要生成的参数', type: 'warning' })
      return
    }
    this.newParams = []
  }

  // 删除参数
  private deleteParams(val: any) {
    const tempList = this.paramsList
    this.paramsList = []
    tempList.forEach((element: any) => {
      if (element.name.replace(/^\s+|\s+$/g, '') !== val) {
        this.paramsList.push(element)
      }
    })
    this.newParamsList.forEach((element1: any) => {
      if (element1.name.replace(/^\s+|\s+$/g, '') === val) {
        element1.disabled = false
      }
    })
  }

  // 校验信息确认
  private updateValidatorSure() {
    this.paramsList.forEach((element: any) => {
      if (element.name === this.validators.name) {
        element.validators = JSON.stringify([{ validator: this.validators.validator, errmsg: this.validators.errmsg,
                              params: this.validators.params.map(Number) }], undefined, 4)
      }
    })
    this.validatorStatus = false
  }

  // sql格式化
  private sqlFormatSure(newValue: any) {
    this.oneParams.sqlText = sqlFormatter.format(newValue)
  }
  // json格式化
  private jsonFormatSure(val: any) {
    this.oneParams.sqlText = JSON.stringify(val, undefined, 4)
  }
}
</script>
