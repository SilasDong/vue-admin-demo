import request from '@/http/axios'
export const loginByUsername = (param: object) => request({
    url: '/api/xcd-module-sys-user-login',
    method: 'post',
    data: param
})




