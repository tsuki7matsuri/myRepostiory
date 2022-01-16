var path = require('path')

module.export = {
    build: {
        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 设置@为src路径 默认就是不用配置也行
        '@': path.resolve('src'),
        // 静态资源输出到二级目录下
        assetsSubDirectory: 'static',
        // 静态资源cdn地址
        assetsPublicPath: '/',
    }
}