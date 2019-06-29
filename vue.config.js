const publicPath = '/eq/'
module.exports = {
    publicPath,
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: (config) => {
        // 忽略的打包文件
        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT'
        })
        const entry = config.entry('app')
        entry
            .add('babel-polyfill')
            .end()
        entry
            .add('classlist-polyfill')
            .end()
        // entry
        //     .add('@/mock')
        //     .end()
    },
    // 配置转发代理
    devServer: {
        port: 8081,
        open: true,
        proxy: {
            '/api': {
                target: 'https://demo.xmmxgg.com',
                ws: true,
                changeOrigin: true
            },
            '/uploadfiles': {
                target: 'https://demo.xmmxgg.com',
                ws: true,
                changeOrigin: true
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `$baseUrl: "${publicPath}";`
            }
        }
    }
}