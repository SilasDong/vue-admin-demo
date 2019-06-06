// import { list } from 'tcomb'
import { Component, Prop, Mixins } from 'vue-property-decorator'
import BaseMixin from './BaseMixin'

// props配置
const propsDefault = {
  id: 'id',
  label: 'label',
  value: 'value',
  children: 'children',
  disabled: 'disabled'
}
// httpProps配置
const propsHttpDefault = {
  name: 'name',
  url: 'url'
}

@Component
export default class SilasCompoents extends Mixins(BaseMixin) {
  protected text: any
  protected propsHttpDefault: any = propsHttpDefault
  protected propsDefault: any = propsDefault

  @Prop({ type: Function })
  protected change: any
  @Prop({ type: Function })
  protected click: any
  @Prop({ type: Object, default: () => { } })
  protected column: any
  @Prop({ type: String, default: '' })
  protected dicUrl: any
  @Prop({ type: String, default: '' })
  protected label: any
  @Prop({ type: Boolean, default: false })
  protected readonly: any
  @Prop({ type: String, default: '' })
  protected size: any
  @Prop({ type: String, default: '' })
  protected tip: any
  @Prop({ type: Boolean, default: false })
  protected disabled: any
  @Prop({ type: String })
  protected dataType: any
  @Prop({ type: Boolean, default: true })
  protected clearable: any
  @Prop({ type: String, default: '' })
  protected type: any
  @Prop({ type: Array, default: () => [] })
  protected dic: any
  @Prop({ type: String, default: '' })
  protected placeholder: any
  @Prop({ type: Number })
  protected min: any
  @Prop({ type: Number })
  protected max: any
  @Prop({ type: Boolean, default: false })
  protected multiple: any
  @Prop({ type: String, default: '' })
  protected prop: any
  @Prop({ type: Boolean, default: false })
  protected border: any
  @Prop({ type: Object, default: () => propsHttpDefault })
  protected propsHttp: any
  @Prop({ type: Object, default: () => propsDefault })
  protected props: any

  get isArray() {
    return this.dataType === 'array'
  }
  get isString() {
    return this.dataType === 'string'
  }
  get nameKey() {
    return this.propsHttp.name || this.propsHttpDefault.name
  }
  get urlKey() {
    return this.propsHttp.url || this.propsHttpDefault.url
  }
  get valueKey() {
    return this.props.value || this.propsDefault.value
  }
  get labelKey() {
    return this.props.label || this.propsDefault.label
  }
  get childrenKey() {
    return this.props.children || this.propsDefault.children
  }
  get disabledKey() {
    return this.props.disabled || this.propsDefault.disabled
  }
  get idKey() {
    return this.props.id || this.propsDefault.id
  }

  // protected created() {
  //   this.initVal()
  // }

  // @Watch('value')
  // protected onWatchValue() {
  //   this.initVal()
  // }

  // protected initVal() {
  //   this.text = initVal({
  //     type: this.type,
  //     multiple: this.multiple,
  //     value: this.value,
  //     listType: list.listType
  //   })
  // }
}