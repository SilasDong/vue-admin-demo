import request from '@/http/axios'

/**
 * 查询系统参数
 * @param paramKeys 多个用逗号隔开
 */
export const queryParam = (paramKeys: string) => request({
  url: `/api/c-sys-param-query?paramKeys=${paramKeys}`,
  method: 'get'
})
/**
 * 七牛or阿里oss上传token查询
 */
export const uploadToken = () => request({
  url: '/api/xcd-module-get-upload-token?t=' + new Date().getTime(),
  method: 'get'
})

// 查询字典
export function queryDict(key: string, url = '/api/m-sys-dict-query?groupId=') {
  return request({
    url: `${url}${key}`,
    method: 'get'
  })
}

export function uploadFile(url: string, data: any, onUploadProgress: any) {
  return request({
    url,
    timeout: 10 * 60 * 1000,
    method: 'post',
    data,
    onUploadProgress,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}