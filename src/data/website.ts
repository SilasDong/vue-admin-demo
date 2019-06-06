/**
 * 全局配置文件
 */
export default {
    title: 'XCD',
    logo: 'X',
    indexTitle: 'CODE BY XINCHIDAO',
    lockPage: '/lock',
    // 配置首页不可关闭
    isFirstPage: false,
    fistPage: {
        label: '首页',
        value: '/wel/index',
        params: {},
        query: {},
        group: [],
        close: false
    },
    // 配置菜单的属性
    menu: {
        props: {
            label: 'label',
            path: 'path',
            icon: 'icon',
            children: '_children'
        }
    }
}
