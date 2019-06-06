import Mock from 'mockjs'
import { uuid } from '@/utils/'
export default ({ mock }: any) => {
  if (!mock) {
    return
  }
  // api 统计
  Mock.mock(RegExp('/api/m-sys-operation-statistics-query-for-list.*'), 'get', (res: any) => {
    const list = []
    for (let i = 0; i < 10; i++) {
      list.push(Mock.mock({
        'id': uuid(),
        'apiId': /[ms]-[a-z]{3,5}-[a-z]{3,5}/,
        'apiVersion': 'v1.0.0',
        'createTime': new Date().getTime(),
        'failNum|1-100': 1,
        'successNum|1-100': 1,
        'ipNum|1-100': 1
      }))
    }
    return {
      data: {
        page: 1,
        total: 10,
        pageSize: 10,
        dataList: list
      }
    }
  })
  // api列表
  Mock.mock(RegExp('/api/xcd-core-apiBase-query-for-list.*'), 'get', (res: any) => {
    const list  = [
      {
          id: '869f535939af428ea1d9a26426ae0b5a',
          apiId: 'c-error-msg-update',
          apiName: '亿仟券联盟-系统-错误码更新',
          opType: 1,
          params: '[]',
          preloadReqAttribute: '',
          sqlType: 'update',
          apiMethod: 'ALL',
          sqlText: 'UPDATE c_error_msg',
          sqlOptionParams: '',
          processor: '',
          paramsProcessor: '',
          resultProcessor: '',
          updateTime: 1554100360000,
          status: 1,
          multiSqlConfig: '',
          recursionColumn: '',
          recursionMaxDeep: 0,
          apiType: '3',
          roleIds: 'develop'
      },
      {
          id: 'bdc28000938c48d598b47271fb359ab9',
          apiId: 'm-scheduler-task-run-record-deleteList',
          apiName: '亿仟管理后台删除定时器日志',
          opType: 1,
          params: '[]',
          preloadReqAttribute: '',
          sqlType: 'delete',
          sqlText: 'delete from m_scheduler_task_run_record',
          processor: '',
          paramsProcessor: '',
          resultProcessor: '',
          updateTime: 1553830075000,
          status: 1,
          multiSqlConfig: '',
          recursionColumn: '',
          recursionMaxDeep: 0,
          apiType: '1',
          roleIds: 'anonymous'
      },
      {
          id: '26a9b188a87d4c69a62be44ec969bee2',
          apiId: 'm-sys-operation-log-deleteList',
          apiName: '亿仟管理后台清空Api日志',
          opType: 1,
          params: '[]',
          preloadReqAttribute: '',
          sqlType: 'delete',
          sqlText: 'delete  from  m_sys_operation_log',
          processor: '',
          paramsProcessor: '',
          resultProcessor: '',
          updateTime: 1553829982000,
          status: 1,
          multiSqlConfig: '',
          recursionColumn: '',
          recursionMaxDeep: 0,
          apiType: '1',
          roleIds: 'admin,anonymous'
      },
      {
          id: '5be1628103b8425ab06c4ea139232e7f',
          apiId: 'm-sys-operation-statistics-query-for-list',
          apiName: '亿仟-api操作统计信息分页查询',
          opType: 1,
          params: '[]',
          preloadReqAttribute: '',
          sqlType: 'selectForPage',
          sqlText: 'select * from m_sys_operation_statistics',
          sqlOptionParams: '',
          processor: '',
          paramsProcessor: '',
          resultProcessor: '',
          updateTime: 1553821958000,
          status: 1,
          multiSqlConfig: '',
          recursionColumn: '',
          recursionMaxDeep: 0,
          apiType: '3',
          roleIds: 'develop'
      },
      {
          id: '4c474404911f4003bee7d2ff7e3bf2cf',
          apiId: 'm-sys-icon-query-for-list',
          apiName: '亿仟系统接口-icon查询',
          opType: 1,
          params: '[]',
          preloadReqAttribute: '',
          sqlType: 'selectForPage',
          sqlText: 'SELECT * FROM m_sys_icon where 1=1 【and name like :rp_name_all】 order by rank, createTime desc',
          processor: '',
          paramsProcessor: '',
          resultProcessor: '',
          updateTime: 1553656950000,
          status: 1,
          multiSqlConfig: '',
          recursionColumn: '',
          recursionMaxDeep: 0,
          apiType: '3',
          roleIds: 'admin,develop'
      },
      {
          id: 'f9afca87801148bd926b53c11c3a3dcc',
          apiId: 'm-sys-icon-query-list',
          apiName: '亿仟系统接口-icon查询',
          opType: 1,
          params: '[]',
          preloadReqAttribute: '',
          sqlType: 'select',
          sqlText: 'SELECT type, icon FROM m_sys_icon',
          processor: '',
          paramsProcessor: '',
          resultProcessor: '',
          updateTime: 1553595570000,
          status: 1,
          multiSqlConfig: '',
          recursionColumn: '',
          recursionMaxDeep: 0,
          apiType: '3',
          roleIds: 'admin'
      },
      {
          id: '2018ddd40b6b4e0a9540ee1cb8ab4b4a',
          apiId: 'm-sys-icon-update',
          apiName: '亿仟系统接口-icon更新',
          opType: 1,
          params: 'ASDSADSDDD',
          preloadReqAttribute: '',
          sqlType: 'update',
          sqlText: 'UPDATE m_sys_icon SET',
          processor: '',
          paramsProcessor: '',
          resultProcessor: '',
          updateTime: 1553593794000,
          status: 1,
          multiSqlConfig: '',
          recursionColumn: '',
          recursionMaxDeep: 0,
          apiType: '3',
          roleIds: 'admin,develop'
      },
      {
          id: '2129cd889580496a9d487d9d4b56ecc2',
          apiId: 'm-sys-icon-delete',
          apiName: '亿仟系统接口-icon删除',
          opType: 1,
          params: 'ASDDDDD',
          preloadReqAttribute: '',
          sqlType: 'delete',
          sqlText: 'delete from m_sys_icon where id=:rp_id',
          processor: '',
          paramsProcessor: '',
          resultProcessor: '',
          updateTime: 1553593722000,
          status: 1,
          multiSqlConfig: '',
          recursionColumn: '',
          recursionMaxDeep: 0,
          apiType: '3',
          roleIds: 'admin,develop'
      },
      {
          id: 'ed07908f522e46949511af2b52ec080c',
          apiId: 'm-sys-icon-insert',
          apiName: '亿仟系统接口-icon插入',
          opType: 1,
          params: '[]',
          preloadReqAttribute: '',
          sqlType: 'insert',
          sqlText: 'ASDSDDDD',
          processor: '',
          paramsProcessor: '',
          resultProcessor: '',
          updateTime: 1553593471000,
          status: 1,
          multiSqlConfig: '',
          recursionColumn: '',
          recursionMaxDeep: 0,
          apiType: '3',
          roleIds: 'develop,admin'
      },
      {
          id: 'bc94679227dd4ce8ab30a00a943a0710',
          apiId: 'm-sys-user-info-update',
          apiName: '亿仟-系统用户信息修改',
          opType: 1,
          params: 'SDSADSAD',
          preloadReqAttribute: '',
          sqlType: 'update',
          sqlText: 'ZXCCCCC',
          sqlOptionParams: '',
          processor: '',
          paramsProcessor: '',
          resultProcessor: '',
          updateTime: 1552649182000,
          status: 1,
          multiSqlConfig: '',
          recursionColumn: '',
          recursionMaxDeep: 0,
          apiType: '3',
          roleIds: 'develop,admin'
      }]
    return {
      data: {
        page: 1,
        total: 1000,
        pageSize: 10,
        dataList: list
      }
    }
  })
  // api日志列表查询
  Mock.mock(RegExp('/api/m-sys-operation-log-query-for-list.*'), 'get', (res: any) => {
    const list  = [
      {
          id: '443febdfcbe3418fa7f0d64711853783',
          apiId: 'xcd-module-sys-user-login',
          apiVersion: 'v1.0.0',
          role: '',
          logType: 0,
          userAccount: 'develop',
          createTime: 1554185073000,
          isSuccess: 0,
          code: '11014',
          message: '验证码错误 , option:null, content: com.xinchidao.core.exception',
          ip: '27.153.9.124',
          queryParams: '{\'code\':\'1830\',\'redomStr\':\'\',\'account\':\'develop\'}'
      },
      {
          id: 'e2615a44f00242fbac3bd0541aeb7b15',
          apiId: 'xcd-module-sys-user-login',
          apiVersion: 'v1.0.0',
          role: '',
          logType: 0,
          userAccount: 'develop',
          createTime: 1554173163000,
          isSuccess: 0,
          code: '11014',
          message: '验证码错误 , option:null, content: com.xinchidao.core.exception',
          ip: '27.153.9.124',
          queryParams: '{\'code\':\'6451\',\'redomStr\':\'\',\'account\':\'develop\'}'
      },
      {
          id: 'dd0255a229ff401aad80e6a77f9579f2',
          apiId: 'xcd-module-sys-user-login',
          apiVersion: 'v1.0.0',
          role: '',
          logType: 0,
          userAccount: 'develop',
          createTime: 1554102622000,
          isSuccess: 0,
          code: '11014',
          message: '验证码错误 , option:null, content: com.xinchidao.core.exception.',
          ip: '27.153.9.124',
          queryParams: '{\'code\':\'1830\',\'redomStr\':\'\',\'account\':\'develop\'}'
      },
      {
          id: '421d4d1fc9494a30bb5e23fb318617a2',
          apiId: 'xcd-module-sys-user-login',
          apiVersion: 'v1.0.0',
          role: '',
          logType: 0,
          userAccount: 'develop',
          createTime: 1554081892000,
          isSuccess: 0,
          code: '11014',
          message: '验证码错误 , option:null, content: com.xinchidao.core.exception',
          ip: '27.153.9.124',
          queryParams: '{\'code\':\'9258\',\'redomStr\':\'\',\'account\':\'develop\'}'
      },
      {
          id: '732d1fa1f03944ee9abb61b6ff5fb0a4',
          apiId: 'xcd-module-sys-user-login',
          apiVersion: 'v1.0.0',
          role: '',
          logType: 0,
          userAccount: 'develop',
          createTime: 1554080828000,
          isSuccess: 0,
          code: '11014',
          message: '验证码错误 , option:null, content: com.xinchidao.core.exception',
          ip: '27.153.9.124',
          queryParams: '{\'code\':\'5737\',\'redomStr\':\'\',\'account\':\'develop\'}'
      },
      {
          id: 'dc729258664041259071b976b2f36964',
          apiId: 'xcd-module-sys-user-login',
          apiVersion: 'v1.0.0',
          role: '',
          logType: 0,
          userAccount: 'develop',
          createTime: 1553847520000,
          isSuccess: 0,
          code: '11014',
          message: '验证码错误 , option:null, content: com.xinchidao.core.exception',
          ip: '27.153.9.124',
          queryParams: '{\'code\':\'8518\',\'redomStr\':\'\',\'account\':\'develop\'}'
      },
      {
          id: '0e23f2f2ff1746cca30fd0b3eaa78a9e',
          apiId: 'xcd-module-sys-user-login',
          apiVersion: 'v1.0.0',
          role: '',
          logType: 0,
          userAccount: 'develop',
          createTime: 1553847498000,
          isSuccess: 0,
          code: '11014',
          message: '验证码错误 , option:null, content: com.xinchidao.core.exception',
          ip: '27.153.9.124',
          queryParams: '{\'code\':\'3160\',\'redomStr\':\'\',\'account\':\'develop\'}'
      }]
    return {
      data: {
        page: 1,
        total: 7,
        pageSize: 10,
        dataList: list
      }
    }
  })
  // 定时器
  Mock.mock(RegExp('/api/m-scheduler-task-select-for-page.*'), 'get', (res: any) => {
    const list  = [
      {
          isAllownManualStart: true,
          runType: 2,
          processor: 'operationStatisticsService',
          preloadParams: '',
          apiVersion: '',
          createTime: 1538183910000,
          creater: 'develop',
          isCanRunHasRunning: true,
          taskName: '操作统计',
          createrId: 'develop',
          executeTimeType: 1,
          taskId: '7c805061352d44ba975f747c6757cdce',
          apiId: '',
          runStatus: true,
          executeTime: '0 0 3 1-31 * ?',
          status: 1
      },
      {
          isAllownManualStart: true,
          runType: 2,
          processor: 'mysqlBackupService',
          preloadParams: '',
          apiVersion: '',
          createTime: 1536852703000,
          creater: 'develop',
          isCanRunHasRunning: true,
          taskName: '数据库备份定时器',
          createrId: 'develop',
          executeTimeType: 1,
          taskId: 'b7599991efb449cb9bd7c5a650ab77e0',
          apiId: '',
          runStatus: true,
          executeTime: '0 0 3 1-31 * ?',
          status: 1
      }]
    return {
      data: {
        page: 1,
        total: 2,
        pageSize: 10,
        dataList: list
      }
    }
  })
  // 定时器日志
  Mock.mock(RegExp('/api/m-scheduler-task-run-record-query-for-list.*'), 'get', (res: any) => {
    const list  = [{
      }]
    return {
      data: {
        page: 1,
        total: 0,
        pageSize: 10,
        dataList: list
      }
    }
  })
}