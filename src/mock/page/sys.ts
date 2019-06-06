import Mock from 'mockjs'
export default ({ mock }: any) => {
  if (!mock) {
    return
  }
  // 菜单管理- 模块
  Mock.mock(RegExp('/api/m-sys-menu-select-all.*') , 'get', (res: any) => {
      const list = [{
            id: 'ed070f48059f45b8b3d1e891ac602f25',
            label: '功能',
            path: 'https://gitee.com',
            icon: 'el-icon-menu',
            component: '',
            isShow: 1,
            status: 1,
            rank: 1,
            _children: [{
                    id: '83ce7fa6a2c1424aaf12e8d7c1afe681',
                    pid: 'ed070f48059f45b8b3d1e891ac602f25',
                    pids: 'ed070f48059f45b8b3d1e891ac602f25',
                    label: '测试1',
                    path: '/url',
                    icon: 'iconfont iconceshi1',
                    component: '',
                    isShow: 1,
                    status: 1,
                    rank: 1,
                    _children: [{
                            id: '5c676640a008471c961260f8e04336d2',
                            pid: '83ce7fa6a2c1424aaf12e8d7c1afe681',
                            pids: 'ed070f48059f45b8b3d1e891ac602f25,83ce7fa6a2c1424aaf12e8d7c1afe681',
                            label: '测试',
                            path: 'https://gitee.com',
                            icon: 'iconfont iconceshi',
                            component: '',
                            isShow: 1,
                            status: 1,
                            rank: 1
                        },
                        {
                            id: 'ce82f78969254541a72cf0c5ed900694',
                            pid: '83ce7fa6a2c1424aaf12e8d7c1afe681',
                            pids: 'ed070f48059f45b8b3d1e891ac602f25,83ce7fa6a2c1424aaf12e8d7c1afe681',
                            label: '测试2',
                            path: 'https://www.baidu.com',
                            icon: 'iconfont iconshujufuwu-APIceshi',
                            component: '',
                            isShow: 1,
                            status: 1,
                            rank: 2
                        }]
                }]
        },
        {
            id: '591c0979524d4e668c106ce343b3ac25',
            label: '系统',
            path: '/core/api',
            icon: 'el-icon-setting',
            component: '',
            isShow: 1,
            status: 1,
            rank: 3,
            _children: [
                {
                    id: 'a54759c32f2d11e9881200163e05c695',
                    pid: '591c0979524d4e668c106ce343b3ac25',
                    pids: '591c0979524d4e668c106ce343b3ac25',
                    label: '核心模块',
                    path: '/core',
                    icon: 'iconfont iconwakuangpeizhi-',
                    component: '',
                    isShow: 1,
                    status: 1,
                    rank: 1,
                    _children: [
                        {
                            id: '5217d30db10e452f86804170eedc0b4f',
                            pid: 'a54759c32f2d11e9881200163e05c695',
                            pids: '591c0979524d4e668c106ce343b3ac25,a54759c32f2d11e9881200163e05c695',
                            label: 'API日志',
                            path: 'apilog',
                            icon: 'iconfont iconrizhi',
                            component: 'page/core/api/log',
                            isShow: 1,
                            status: 1,
                            rank: 2,
                            apiIds: 'm-sys-operation-log-deleteList,m-sys-operation-log-query-for-list',
                            apiNames: '亿仟管理后台清空Api日志,亿仟-系统模块-操作日志列表'
                        },
                        {
                            id: '9a7cf41073394cb998c5f837c7cce79e',
                            pid: 'a54759c32f2d11e9881200163e05c695',
                            pids: '591c0979524d4e668c106ce343b3ac25,a54759c32f2d11e9881200163e05c695',
                            label: 'API统计',
                            path: 'statistics',
                            icon: 'iconfont icontongji',
                            component: 'page/core/api/statistics',
                            isShow: 1,
                            status: 1,
                            rank: 3,
                            apiIds: 'm-sys-operation-statistics-query-for-list',
                            apiNames: '亿仟-api操作统计信息分页查询'
                        },
                        {
                            id: 'd95ee116ac9741c386dca8f1a2e3f690',
                            pid: 'a54759c32f2d11e9881200163e05c695',
                            pids: '591c0979524d4e668c106ce343b3ac25,a54759c32f2d11e9881200163e05c695',
                            label: '定时事件',
                            path: 'time',
                            icon: 'iconfont icontiming',
                            component: 'page/core/time/index',
                            isShow: 1,
                            status: 1,
                            rank: 4,
                            apiIds: 'm-scheduler-start-scheduler,m-scheduler-task-close',
                            apiNames: '亿仟定时器模块-启动定时器,亿仟定时器模块-定时器停用,亿仟定时器模块-定时器删除,亿仟定时器模块-定时器新增,'
                        },
                        {
                            id: '3e02dcad58e44d2a831d5f96656af387',
                            pid: 'a54759c32f2d11e9881200163e05c695',
                            pids: '591c0979524d4e668c106ce343b3ac25,a54759c32f2d11e9881200163e05c695',
                            label: '定时日志',
                            path: 'timelog',
                            icon: 'iconfont iconshiliangzhinengduixiang',
                            component: 'page/core/time/log',
                            isShow: 1,
                            status: 1,
                            rank: 5,
                            apiIds: 'm-scheduler-task-run-record-deleteList,m-scheduler-task-run-record-query-for-list',
                            apiNames: '亿仟管理后台删除定时器日志,亿仟-系统模块-定时器日志分页查询'
                        }]
                },
                {
                    id: 'c54759c32f2d11e9881200163e05c696',
                    pid: '591c0979524d4e668c106ce343b3ac25',
                    pids: '591c0979524d4e668c106ce343b3ac25',
                    label: '系统管理',
                    path: '/sys',
                    icon: 'iconfont iconmokuai-',
                    component: '',
                    isShow: 1,
                    status: 1,
                    rank: 2,
                    _children: [
                        {
                            id: '1dc133602433419ab948d6aa3ecb3671',
                            pid: 'c54759c32f2d11e9881200163e05c696',
                            pids: '591c0979524d4e668c106ce343b3ac25,c54759c32f2d11e9881200163e05c696',
                            label: '用户管理',
                            path: 'user',
                            icon: 'iconfont iconxueshengguanli',
                            component: 'page/sys/user/index',
                            isShow: 1,
                            status: 1,
                            rank: 3,
                            apiIds: 'm-sys-user-delete,m-sys-user-insert,m-sys-user-query-for-list,m-sys-user-update',
                            apiNames: '亿仟-系统用户信息删除,亿仟-系统用户信息添加,亿仟-系统用户分页查询,亿仟-系统用户信息修改'
                        },
                        {
                            id: 'f1224d82bab74416a389101b7c6b693f',
                            pid: 'c54759c32f2d11e9881200163e05c696',
                            pids: '591c0979524d4e668c106ce343b3ac25,c54759c32f2d11e9881200163e05c696',
                            label: '字典管理',
                            path: 'dic',
                            icon: 'iconfont iconxuexiku',
                            component: 'page/sys/dic/index',
                            isShow: 1,
                            status: 1,
                            rank: 4,
                            apiIds: 'm-sys-dict-delete,m-sys-dict-group-delete,',
                            apiNames: '亿仟-系统字典模块-字典信息删除'
                        },
                        {
                            id: '15310a3a0a4142578a7be562f3cf619d',
                            pid: 'c54759c32f2d11e9881200163e05c696',
                            pids: '591c0979524d4e668c106ce343b3ac25,c54759c32f2d11e9881200163e05c696',
                            label: '配置参数',
                            path: 'config',
                            icon: 'iconfont iconpeanut',
                            component: 'page/sys/config/index',
                            isShow: 1,
                            status: 1,
                            rank: 5,
                            apiIds: 'c-config-param-query-for-list,c-config-param-update',
                            apiNames: '系统模块-配置参数分页查询,系统模块-配置参数修改'
                        },
                        {
                            id: '35a28c590a764bf2b6bff9a4ed436696',
                            pid: 'c54759c32f2d11e9881200163e05c696',
                            pids: '591c0979524d4e668c106ce343b3ac25,c54759c32f2d11e9881200163e05c696',
                            label: '系统参数',
                            path: 'param',
                            icon: 'iconfont iconjichushezhi',
                            component: 'page/sys/param/index',
                            isShow: 1,
                            status: 1,
                            rank: 6,
                            apiIds: 'c-sys-param-delete',
                            apiNames: '亿仟-系统参数模块-系统参数信息删除'
                        }]
                },
                {
                    id: '19ba338f60004a2b8c8403e89a7152f6',
                    pid: '591c0979524d4e668c106ce343b3ac25',
                    pids: '591c0979524d4e668c106ce343b3ac25',
                    label: '系统功能',
                    path: '/func',
                    icon: 'iconfont iconbangding',
                    component: '',
                    isShow: 1,
                    status: 1,
                    rank: 3,
                    _children: [
                        {
                            id: '02656f481506475f80b0c64b8dd83a65',
                            pid: '19ba338f60004a2b8c8403e89a7152f6',
                            pids: '591c0979524d4e668c106ce343b3ac25,19ba338f60004a2b8c8403e89a7152f6',
                            label: '短信模板',
                            path: 'sms',
                            icon: 'iconfont iconduanxin-cehua-xinxixiangqing',
                            component: 'page/func/sms/index',
                            isShow: 1,
                            status: 1,
                            rank: 0,
                            apiIds: 'm-sms-template-query-for-list,m-sms-template-update',
                            apiNames: '系统模块-短信模板分页查询,系统模块-短信模板修改'
                        },
                        {
                            id: 'fc1c83e7a0be479f91b43f2b7ff022b7',
                            pid: '19ba338f60004a2b8c8403e89a7152f6',
                            pids: '591c0979524d4e668c106ce343b3ac25,19ba338f60004a2b8c8403e89a7152f6',
                            label: '微信分享',
                            path: 'share',
                            icon: 'iconfont iconweixin1',
                            component: 'page/func/wechat/share',
                            isShow: 1,
                            status: 1,
                            rank: 2,
                            apiIds: 'm-wechat-share-query-for-list,m-wechat-share-update',
                            apiNames: '亿仟券联盟-微信模块-微信分享分页查询,亿仟券联盟-微信模块-微信分享更新'
                        },
                        {
                            id: '8e7e18b82466460eb209286deb18db47',
                            pid: '19ba338f60004a2b8c8403e89a7152f6',
                            pids: '591c0979524d4e668c106ce343b3ac25,19ba338f60004a2b8c8403e89a7152f6',
                            label: '数据库备份',
                            path: 'dbbackup',
                            icon: 'iconfont iconshujuku',
                            component: 'page/func/dbBackup/index',
                            isShow: 1,
                            status: 1,
                            rank: 3,
                            apiIds: 'm-mysql-backUp-query-for-list',
                            apiNames: '亿仟-数据库备份分页查询'
                        },
                        {
                            id: '6a4b3d3a29614182a65957f12a41bb54',
                            pid: '19ba338f60004a2b8c8403e89a7152f6',
                            pids: '591c0979524d4e668c106ce343b3ac25,19ba338f60004a2b8c8403e89a7152f6',
                            label: '错误代码',
                            path: 'errcode',
                            icon: 'iconfont iconcuowu1',
                            component: 'page/func/errCode/index',
                            isShow: 1,
                            status: 1,
                            rank: 4,
                            apiIds: 'c-error-msg-delete,c-error-msg-insert,c-error-msg-query-list,c-error-msg-update',
                            apiNames: '亿仟券联盟-系统-错误码删除,亿仟券联盟-系统-错误码新增,亿仟券联盟-系统-错误码分页查询,亿仟券联盟-系统-错误码更新'
                        },
                        {
                            id: 'cd6f28dfdf53494e9fdd87cee0a77a66',
                            pid: '19ba338f60004a2b8c8403e89a7152f6',
                            pids: '591c0979524d4e668c106ce343b3ac25,19ba338f60004a2b8c8403e89a7152f6',
                            label: '系统图标',
                            path: 'icon',
                            icon: 'iconfont iconjianda',
                            component: 'page/func/icon/index',
                            isShow: 1,
                            status: 1,
                            rank: 5,
                            apiIds: 'm-sys-icon-delete,m-sys-icon-insert,m-sys-icon-query-for-list,m-sys-icon-update',
                            apiNames: '亿仟系统接口-icon删除,亿仟系统接口-icon插入,亿仟系统接口-icon查询,亿仟系统接口-icon更新'
                        }]
                }]
        }]
      return {
         data : list
     }
  })
  // 菜单管理
  Mock.mock(RegExp('/api/m-sys-icon-query-list.*') , 'get', (res: any) => {
    const list  =  [{
          type: 1,
          icon: 'iconfont iconxueshengguanli'
      },
      {
          type: 1,
          icon: 'iconfont iconrizhi'
      },
      {
          type: 1,
          icon: 'iconfont iconcanshuB'
      },
      {
          type: 2,
          icon: 'el-icon-info'
      },
      {
          type: 1,
          icon: 'iconfont iconxiayi'
      },
      {
          type: 1,
          icon: 'iconfont iconceshi1'
      },
      {
          type: 1,
          icon: 'iconfont iconduanxin-cehua-xinxixiangqing'
      },
      {
          type: 1,
          icon: 'iconfont iconbangding'
      },
      {
          type: 1,
          icon: 'iconfont iconwakuangpeizhi-'
      },
      {
          type: 1,
          icon: 'iconfont iconcuowu1'
      },
      {
          type: 1,
          icon: 'iconfont iconshujufuwu-APIceshi'
      },
      {
          type: 1,
          icon: 'iconfont iconzhuti'
      },
      {
          type: 1,
          icon: 'iconfont icontiming'
      },
      {
          type: 1,
          icon: 'iconfont iconxuexiku'
      },
      {
          type: 1,
          icon: 'iconfont iconjichushezhi'
      },
      {
          type: 1,
          icon: 'iconfont iconshujuku'
      },
      {
          type: 1,
          icon: 'iconfont iconemoji'
      },
      {
          type: 1,
          icon: 'iconfont icontongji'
      },
      {
          type: 1,
          icon: 'iconfont iconcuowu'
      },
      {
          type: 1,
          icon: 'iconfont iconpeanut'
      },
      {
          type: 1,
          icon: 'iconfont iconmokuai-'
      },
      {
          type: 1,
          icon: 'iconfont iconquanping'
      },
      {
          type: 1,
          icon: 'iconfont iconceshi'
      },
      {
          type: 1,
          icon: 'iconfont iconxuanfuanniu-xiaopingx'
      },
      {
          type: 1,
          icon: 'iconfont iconjianda'
      },
      {
          type: 1,
          icon: 'iconfont iconshiliangzhinengduixiang'
      },
      {
          type: 1,
          icon: 'iconfont iconweixin1'
      },
      {
          type: 1,
          icon: 'iconfont iconsuoping'
      }]
    return {
        data: list
      }
  })
  // 角色管理
  Mock.mock(RegExp('/api/xcd-m-sys-role-query.*') , 'get', (res: any) => {
    const list  = [{
          id: 'anonymous',
          num: 1,
          roleName: '匿名角色',
          isMenu: 0,
          remarks: '所有未登录用户使用的角色'
      },
      {
          id: 'admin',
          num: 2,
          roleName: '管理员',
          isMenu: 1,
          remarks: '管理员'
      },
      {
          id: 'develop',
          num: 3,
          roleName: '开发者',
          isMenu: 1,
          remarks: '开发者使用'
      },
      {
          id: 'member',
          num: 4,
          roleName: '会员角色',
          isMenu: 0,
          remarks: '会员角色'
      }]
    return {
      data: list
    }
  })
  // 用户管理
  Mock.mock(RegExp('/api/m-sys-user-query-for-list.*') , 'get', (res: any) => {
    const list  = [{
          id: 'develop',
          account: 'develop',
          realName: '超级管理员',
          roleId: 'develop',
          state: 1,
          createTime: 1521085126000
      },
      {
          id: 'admin',
          account: 'admin',
          realName: '管理员',
          roleId: 'admin',
          state: 1,
          createTime: 1513050777000
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
  // 字典管理
  Mock.mock(RegExp('/api/m-sys-dict-tree-query.*') , 'get', (res: any) => {
      const list = [{
            id: 'validate_type',
            dictKey: 'validate_type',
            dictValue: '参数检验类型',
            rank: '',
            type: 'isFather',
            remark: '',
            _children: [{
                    id: 'be1962948c2a45d99cd6746d1607bf8f',
                    pid: 'validate_type',
                    dictKey: 'checkEmail',
                    dictValue: '校验邮箱',
                    rank: '1',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '93e547cd002c4930854fbfba213cdf66',
                    pid: 'validate_type',
                    dictKey: 'checkBlankSpace',
                    dictValue: '校验空白',
                    rank: '10',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '4f07cfb30e4548e8afc1f9b24774a20e',
                    pid: 'validate_type',
                    dictKey: 'checkURL',
                    dictValue: '校验url地址',
                    rank: '11',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '5d1693a3f871450e960a487ae6c93890',
                    pid: 'validate_type',
                    dictKey: 'checkIdCard',
                    dictValue: '校验身份证',
                    rank: '2',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'adcc46475f7041e7822f3a3f48e439d0',
                    pid: 'validate_type',
                    dictKey: 'checkMobile',
                    dictValue: '校验手机',
                    rank: '3',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'd11143c92a9443a49f3fca1eb4f2a425',
                    pid: 'validate_type',
                    dictKey: 'stringLength',
                    dictValue: '校验字符串长度',
                    rank: '4',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '987a62234923436ca35f43268248f429',
                    pid: 'validate_type',
                    dictKey: 'intRange',
                    dictValue: '校验整数长度',
                    rank: '5',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'e212bafdf4664815b124686092702c98',
                    pid: 'validate_type',
                    dictKey: 'checkDigit',
                    dictValue: '校验整数',
                    rank: '6',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'd3e7fb7421ed4eb7816bc9c87493b2c0',
                    pid: 'validate_type',
                    dictKey: 'checkDecimals',
                    dictValue: '校验整数和浮点数',
                    rank: '7',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'efb59999eef6434a90e84e135fc2d378',
                    pid: 'validate_type',
                    dictKey: 'checkChinese',
                    dictValue: '校验中文',
                    rank: '8',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '3858799ffa674f1295995b19e9a2b31e',
                    pid: 'validate_type',
                    dictKey: 'checkBirthday',
                    dictValue: '校验日期',
                    rank: '9',
                    type: 'isChild',
                    remark: ''
                }]
        },
        {
            id: 'api_type',
            dictKey: 'api_type',
            dictValue: 'API类型',
            rank: '',
            type: 'isFather',
            remark: 'API类型',
            _children: [
                {
                    id: '15fd05c3725946348497d10ce543cd86',
                    pid: 'api_type',
                    dictKey: '1',
                    dictValue: '后台API',
                    rank: '1',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'aae8f73fdf1e43548f69831faaf084e5',
                    pid: 'api_type',
                    dictKey: '2',
                    dictValue: '会员小程序API',
                    rank: '2',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'fca4e9e962ac49deb17a9aaa2d1197ae',
                    pid: 'api_type',
                    dictKey: '3',
                    dictValue: '系统API',
                    rank: '3',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'c4123ad16f224800b9a3e06b1a91d103',
                    pid: 'api_type',
                    dictKey: '4',
                    dictValue: 'H5API',
                    rank: '4',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'c1c19b61187a4bb7956ceca21717bb24',
                    pid: 'api_type',
                    dictKey: '5',
                    dictValue: '定时器API',
                    rank: '5',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '2a23a8fc2cde430e82d10eb4b4b9fb70',
                    pid: 'api_type',
                    dictKey: '6',
                    dictValue: '通用API',
                    rank: '6',
                    type: 'isChild',
                    remark: ''
                }]
        },
        {
            id: 'pay_notify_url',
            dictKey: 'pay_notify_url',
            dictValue: '支付回调地址',
            rank: '',
            type: 'isFather',
            remark: '支付回调地址',
            _children: [{
                    id: '7c1dae7797294a2783c3080569d9a497',
                    pid: 'pay_notify_url',
                    dictKey: 'store_recharge',
                    dictValue: 'http://demo.xinchidao.com/api/p-coupon-pay-callback-url',
                    rank: '1',
                    type: 'isChild',
                    remark: ''
                }]
        },
        {
            id: 'config_type',
            dictKey: 'config_type',
            dictValue: '配置类型',
            rank: '',
            type: 'isFather',
            remark: '',
            _children: [{
                    id: 'fdd6654b797d4174b99341712af41f3e',
                    pid: 'config_type',
                    dictKey: '1',
                    dictValue: '核心模块',
                    rank: '1',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'e8a222aa9d634f899a127b41af2ea2de',
                    pid: 'config_type',
                    dictKey: '2',
                    dictValue: '系统模块',
                    rank: '2',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '908dd68708e2493b9a92692b8607ad90',
                    pid: 'config_type',
                    dictKey: '3',
                    dictValue: '短信模块',
                    rank: '3',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '876a0522f7a24b58ba402c3aa13d3da0',
                    pid: 'config_type',
                    dictKey: '4',
                    dictValue: '微信模块',
                    rank: '4',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'e946a1d818d3428cbe77f2b30cea02f3',
                    pid: 'config_type',
                    dictKey: '6',
                    dictValue: '附件模块',
                    rank: '5',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '4737ff81fdf54aadbf88df3aca931822',
                    pid: 'config_type',
                    dictKey: '7',
                    dictValue: '支付宝模块',
                    rank: '6',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '96464a45d85847349e1fe2e30752b374',
                    pid: 'config_type',
                    dictKey: '100',
                    dictValue: '项目模块',
                    rank: '7',
                    type: 'isChild',
                    remark: ''
                }]
        },
        {
            id: 'recharge_type',
            dictKey: 'recharge_type',
            dictValue: '支付宝类型',
            rank: '',
            type: 'isFather',
            remark: '',
            _children: [{
                    id: 'c9b07548cae4474b9c1f03297dfcf940',
                    pid: 'recharge_type',
                    dictKey: '1',
                    dictValue: '支付宝',
                    rank: '1',
                    type: 'isChild',
                    remark: ''
                }]
        },
        {
            id: 'default_button_role',
            dictKey: 'default_button_role',
            dictValue: '默认菜单权限',
            rank: '',
            type: 'isFather',
            remark: '',
            _children: [{
                    id: '360b6989b70d445e814d38dcd06d5b4b',
                    pid: 'default_button_role',
                    dictKey: 'QUERY',
                    dictValue: '查询',
                    rank: '1',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: 'e07ec89a3cf84da8b83b167be7aecaf5',
                    pid: 'default_button_role',
                    dictKey: 'ADD',
                    dictValue: '新增',
                    rank: '2',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '563d65bd7eaa4a9fb8456837bbd85c1d',
                    pid: 'default_button_role',
                    dictKey: 'EDIT',
                    dictValue: '修改',
                    rank: '3',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '596c2cfe08f74175b90a2a51990a8393',
                    pid: 'default_button_role',
                    dictKey: 'DEL',
                    dictValue: '删除',
                    rank: '4',
                    type: 'isChild',
                    remark: ''
                }]
        },
        {
            id: 'refund_notify_url',
            dictKey: 'refund_notify_url',
            dictValue: '退款回调地址',
            rank: '',
            type: 'isFather',
            remark: '退款回调地址',
            _children: [{
                    id: 'b93e1b673ee448e9b868397a34ef8e49',
                    pid: 'refund_notify_url',
                    dictKey: 'order_pay',
                    dictValue: 'http://green.xinchidao.com/api/p-hotel-order-refund-callback-url',
                    rank: '1',
                    type: 'isChild',
                    remark: ''
                }]
        },
        {
            id: 'paramValue_type',
            dictKey: 'paramValue_type',
            dictValue: '参数值类型',
            rank: '',
            type: 'isFather',
            remark: '12',
            _children: [{
                    id: '8d172985a48c496a983a9b1bbf29f9ed',
                    pid: 'paramValue_type',
                    dictKey: 'string',
                    dictValue: '字符串',
                    rank: '1',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '824c0bae4d48401db667a862440fd0af',
                    pid: 'paramValue_type',
                    dictKey: 'int',
                    dictValue: 'int型',
                    rank: '2',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '07ffc883e69144ab983f538d09e772a6',
                    pid: 'paramValue_type',
                    dictKey: 'byte',
                    dictValue: 'byte型',
                    rank: '3',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '72118d40e9144bbeb5b75b1f03509c42',
                    pid: 'paramValue_type',
                    dictKey: 'long',
                    dictValue: 'long型',
                    rank: '4',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '0665b84be3934f5082b4a784b069e1b8',
                    pid: 'paramValue_type',
                    dictKey: 'float',
                    dictValue: 'float型',
                    rank: '5',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '970e4ed8716b4794b53072296c56bf9f',
                    pid: 'paramValue_type',
                    dictKey: 'double',
                    dictValue: 'double型',
                    rank: '6',
                    type: 'isChild',
                    remark: ''
                },
                {
                    id: '11210341c2e849d7bf65e89f291daf94',
                    pid: 'paramValue_type',
                    dictKey: 'boolean',
                    dictValue: 'boolean型',
                    rank: '7',
                    type: 'isChild',
                    remark: ''
                }]
        }]
      return {
        data: list
      }
  })
  // 参数配置-模块
  Mock.mock(RegExp('/api/m-sys-dict-query?groupId=config_type') , 'get', (res: any) => {
    const list  = [{
          value: '1',
          label: '核心模块'
      },
      {
          value: '2',
          label: '系统模块'
      },
      {
          value: '3',
          label: '短信模块'
      },
      {
          value: '4',
          label: '微信模块'
      },
      {
          value: '6',
          label: '附件模块'
      },
      {
          value: '7',
          label: '支付宝模块'
      },
      {
          value: '100',
          label: '项目模块'
      }]
    return {
        data: list
      }
  })
  // 参数配置列表
  Mock.mock(RegExp('/api/c-config-param-query-for-list.*') , 'get', (res: any) => {
    const list  =  [{
          paramId: '56',
          paramKey: 'devMode',
          remarks: '是否使用开发模式',
          configType: 1,
          paramValue: 'true',
          isShow: 1,
          updateTime: 1551426120000
      },
      {
          paramId: '57',
          paramKey: 'useDbErrorDesc',
          remarks: '是否使用数据库错误描述',
          configType: 1,
          paramValue: 'false',
          isShow: 1,
          updateTime: 1554363435000
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
  // 系统参数
  Mock.mock(RegExp('/api/c-sys-param-query-for-list.*') , 'get', (res: any) => {
    const list  =  [{
          paramId: '376074df38fe44c29241f590e9784e54',
          paramKey: 'mobileIconfontKey',
          paramValue: '1122035_utj65khmog',
          paramType: 1,
          remarks: '手机网站图标库',
          updateTime: 1554193441000
      },
      {
          paramId: 'c2d80274c23649e48ddcc7976942a753',
          paramKey: 'iconfontKey',
          paramValue: '1108410_80k899d4o0a',
          paramType: 1,
          remarks: '阿里图标库的key',
          updateTime: 1553668401000
      },
      {
          paramId: 'ae25facde7af4383860efea68958b29e',
          paramKey: 'loginDesc',
          paramValue: '亿仟管理后台',
          paramType: 1,
          remarks: '登录页右边说明',
          updateTime: 1553563732000
      },
      {
          paramId: '2',
          paramKey: 'apiPprefix',
          paramValue: 'p-wedding-',
          paramType: 1,
          remarks: 'api前缀',
          updateTime: 1543476865000
      }]
    return {
        data: {
          page: 1,
          total: 4,
          pageSize: 10,
          dataList: list
        }
      }
  })
}