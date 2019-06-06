import Mock from 'mockjs'
export default ({ mock }: any) => {
  if (!mock) {
    return
  }
  Mock.mock(RegExp('c-sys-param-query.*'), 'get', (res: any) => {
    return {
      data: {
        loginDesc: '通用管理后台',
        iconfontKey: '1108410_80k899d4o0a'
      }
    }
  })
}