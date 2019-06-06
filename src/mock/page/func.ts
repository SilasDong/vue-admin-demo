import Mock from 'mockjs'
export default ({ mock }: any) => {
  if (!mock) {
    return
  }
  // 短信模板
  Mock.mock(RegExp('/api/m-sms-template-query-for-list.*') , 'get', (res: any) => {
      const list =  [{
            id: '1',
            templateName: '短信验证码',
            templateShortName: 'sms_code',
            templateContent: '您的验证码${code}，该验证码5分钟内有效，请勿泄漏于他人！',
            remark: '${code}，表示验证码位置',
            createTime: 1535513960000,
            updateTime: 1551672077000
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
  // 微信分享
  Mock.mock(RegExp('/api/m-wechat-share-query-for-list.*') , 'get', (res: any) => {
    const list =  [{
            id: '1',
            title: '分享标题',
            description: '详情介绍',
            imageUrl: '/uploadfiles/201903/07/ab306bd098ba442387a9a6ac75933567.png',
            type: 'public',
            createTime: 1537432866000,
            updateTime: 1551951027000
        },
        {
            id: '2',
            title: '小程序分享标题',
            description: '小程序分享详情',
            imageUrl: '/uploadfiles/201903/04/8c896a3a102044a5a88e8232f948d544.jpg',
            type: 'mini',
            createTime: 1539584560000,
            updateTime: 1551931859000
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
   // 数据库备份
  Mock.mock(RegExp('/api/m-mysql-backUp-query-for-list.*') , 'get', (res: any) => {
    const list =  [{
            id: '8d89c19fc7d649a2b46db509438db436',
            size: '0.35',
            fileName: 'mysql_backup/xcd_p_demo_1554750000081.zip',
            createTime: 1554750000000
        },
        {
            id: 'be6bb99af3e44ca78b72de663cf3c31e',
            size: '0.31',
            fileName: 'mysql_backup/xcd_p_demo_1554663600014.zip',
            createTime: 1554663600000
        },
        {
            id: '8289d16642464300acf368775cf87f26',
            size: '0.31',
            fileName: 'mysql_backup/xcd_p_demo_1554577200058.zip',
            createTime: 1554577200000
        },
        {
            id: '4d6524682b7a4d4a87188623777d06ef',
            size: '0.31',
            fileName: 'mysql_backup/xcd_p_demo_1554490800074.zip',
            createTime: 1554490800000
        },
        {
            id: '34a14241539447918059f79cf8a08322',
            size: '0.31',
            fileName: 'mysql_backup/xcd_p_demo_1554404400038.zip',
            createTime: 1554404400000
        },
        {
            id: '1442f9fd982342688496ebd6dcce148b',
            size: '0.24',
            fileName: 'mysql_backup/xcd_p_demo_1554318000024.zip',
            createTime: 1554318000000
        },
        {
            id: '60293cdd7b594a46aca19898a657f2e0',
            size: '0.22',
            fileName: 'mysql_backup/xcd_p_demo_1554231600022.zip',
            createTime: 1554231600000
        },
        {
            id: '23d64b9d9b2844d1a4b634e5bb52739f',
            size: '0.20',
            fileName: 'mysql_backup/xcd_p_demo_1554145200024.zip',
            createTime: 1554145200000
        }]
    return {
        data: {
            page: 1,
            total: 8,
            pageSize: 10,
            dataList: list
          }
     }
  })
  // 错误代码
  Mock.mock(RegExp('/api/c-error-msg-query-list.*') , 'get', (res: any) => {
    const list =  [{
            id: '1',
            errorCode: 1027,
            language: 'CN',
            description: '接口错误'
        },
        {
            id: '2',
            errorCode: 1032,
            language: 'CN',
            description: '页面丢失'
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
  // 系统图标
  Mock.mock(RegExp('/api/m-sys-icon-query-for-list.*') , 'get', (res: any) => {
    const list =  [{
            id: 'e1865205e85f4550a9b4d545c59f9e47',
            type: 1,
            name: '锁屏',
            icon: 'iconfont iconsuoping',
            rank: 1,
            createTime: 1553656240000
        },
        {
            id: '1',
            type: 2,
            name: '信息',
            icon: 'el-icon-info',
            rank: 1,
            createTime: 1553593380000
        },
        {
            id: 'b5c059ecf19540f7a83e160a8b03f682',
            type: 1,
            name: '悬浮按钮-小屏',
            icon: 'iconfont iconxuanfuanniu-xiaopingx',
            rank: 2,
            createTime: 1553656281000
        },
        {
            id: 'a42b5dec08594005ae6e9a8764c35de6',
            type: 1,
            name: '全屏',
            icon: 'iconfont iconquanping',
            rank: 3,
            createTime: 1553656419000
        },
        {
            id: '8614e485371545d599d3b9d62a46d7b7',
            type: 1,
            name: '错误',
            icon: 'iconfont iconcuowu',
            rank: 4,
            createTime: 1553656461000
        },
        {
            id: '494b0a90af464225a0025d4c574986df',
            type: 1,
            name: '主题',
            icon: 'iconfont iconzhuti',
            rank: 5,
            createTime: 1553656488000
        },
        {
            id: '25132c71fdb14268815efa1fb1c9f3e1',
            type: 1,
            name: '测试',
            icon: 'iconfont iconceshi1',
            rank: 6,
            createTime: 1553668866000
        },
        {
            id: 'ad647c3648f94077b85c618e2a5a291b',
            type: 1,
            name: '测试1',
            icon: 'iconfont iconceshi',
            rank: 7,
            createTime: 1553668928000
        },
        {
            id: '46cd683584d14e2abdccab74ea4c6cf2',
            type: 1,
            name: '测试2',
            icon: 'iconfont iconshujufuwu-APIceshi',
            rank: 8,
            createTime: 1553669158000
        },
        {
            id: '33655384eda841c9be20e31e7ccd4d55',
            type: 1,
            name: '核心模块',
            icon: 'iconfont iconwakuangpeizhi-',
            rank: 9,
            createTime: 1553669381000
        }]
    return {
        data: {
            page: 3,
            total: 28,
            pageSize: 10,
            dataList: list
          }
     }
  })
}
