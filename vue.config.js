module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "assets": "@/assets",
                "components": "@/components",
                "views": "@/views",
                "network": "@/network",
                "plugins": "@/plugins",
            }
        },
    },
    lintOnSave: false,
    devServer: {
        //手机连接电脑热点即可访问，ip地址通过ipconfig查看
        host: '192.168.0.109',
        port: 8080,
        https: false,
        open: false,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,             //是否跨域
                secure: true,                   //是否https接口
                pathRewrite: {
                    "/api": ""
                }
            }

        }
    }
}