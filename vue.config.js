module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // 脚手架3中可以直接使用@ @是src的别名
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}