import Mock from 'mockjs'
export default ({ mock }: any) => {
  if (!mock) {
    return
  }
  Mock.mock(RegExp ('/api/xcd-module-sys-user-login.*') , 'post', (res: any) => {
      return {
          data: {
            'currentTime': 1554782583543,
            'refreshBeforeExpired': 1800,
            'expiredSeconds': 18000,
            'x-token': '2ASDJSHDJASHKDHKZKXNCK'
        }
      }
  })
  Mock.mock(RegExp ('/api/s-user-roles-query.*') , 'get', (res: any) => {
    return {
        data: {
            role: [{
            roleId: 'develop'
            }],
            permissions: [{
            permissions: 'QUERY,EDIT',
            menuId: '02656f481506475f80b0c64b8dd83a65'
            },
            {
            permissions: 'QUERY,EDIT,SYNCH',
            menuId: '15310a3a0a4142578a7be562f3cf619d'
            },
            {
            permissions: 'QUERY,EDIT,DEL,ADD',
            menuId: '1dc133602433419ab948d6aa3ecb3671'
            },
            {
            permissions: 'SYNCH,EDIT,DEL,ADD,QUERY',
            menuId: '35a28c590a764bf2b6bff9a4ed436696'
            },
            {
            permissions: 'QUERY,EDIT,DEL,ADD,CLEAR',
            menuId: '3e02dcad58e44d2a831d5f96656af387'
            },
            {
            permissions: 'CLEAR,QUERY,EDIT,DEL,ADD',
            menuId: '5217d30db10e452f86804170eedc0b4f'
            },
            {
            permissions: 'QUERY,EDIT,DEL,ADD',
            menuId: '6a4b3d3a29614182a65957f12a41bb54'
            },
            {
            permissions: 'QUERY,BACKUP,DOWNLOAD',
            menuId: '8e7e18b82466460eb209286deb18db47'
            },
            {
            permissions: 'QUERY,EDIT,DEL,ADD',
            menuId: 'b54759c32f2d11e9881200163e05c694'
            },
            {
            permissions: 'QUERY,EDIT,DEL,ADD',
            menuId: 'cd6f28dfdf53494e9fdd87cee0a77a66'
            },
            {
            permissions: 'QUERY,EDIT,DEL,ADD,AUTH',
            menuId: 'd532103342984eddadc9d0357dc65c20'
            },
            {
            permissions: 'QUERY,EDIT,DEL,ADD,SYNCH',
            menuId: 'd54759c32f2d11e9881200163e05c697'
            },
            {
            permissions: 'QUERY,EDIT,DEL,ADD,OPERATE',
            menuId: 'd95ee116ac9741c386dca8f1a2e3f690'
            },
            {
            permissions: 'DEL,ADD,QUERY,EDIT',
            menuId: 'f1224d82bab74416a389101b7c6b693f'
            },
            {
            permissions: 'QUERY,EDIT',
            menuId: 'fc1c83e7a0be479f91b43f2b7ff022b7'
            }],
            user: [{
            realName: '超级管理员',
            createtime: 1521085126000,
            passwd: '514a2e203e3e353521b4fbba9c29ea92_n6zt',
            id: 'develop',
            avatar: 'cdn/img/bg/logo.png',
            state: 1,
            account: 'develop'
            }],
            topMenu: [
              {
                id: 'ed070f48059f45b8b3d1e891ac602f25',
                label: '功能',
                path: 'https://gitee.com',
                icon: 'el-icon-menu'
              },
              {
                id: '591c0979524d4e668c106ce343b3ac25',
                label: '系统',
                path: '/core/api',
                icon: 'el-icon-setting'
              }]
            }
    }
})
}