module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3005',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
            '/iwen_api': {
                target: 'http://iwenwiki.com:3001',
                changeOrigin: true,
                pathRewrite: {
                    "^/iwen_api": ""
                }
            },
        }
    }
}