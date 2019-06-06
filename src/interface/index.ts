export interface TagObj {
    label: string, // 标题名称
    value: string, // 标题的路径
    params: any, // 标题的路径参数
    query: any, // 标题的参数
    group: any // 分组
}

// 对象存储内容
export interface Storage {
    name: string,
    content: any,
    isSession?: boolean
}


// 对象存储内容
export interface Dict {
    label: any,
    value: any
}