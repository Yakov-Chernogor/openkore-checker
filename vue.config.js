module.exports = {
    publicPath: process.env.GH_PAGES === "true" ? "/openkore-checker/" : "/",
    chainWebpack: config => {
        config.module
            .rule("pegjs")
            .test(/\.pegjs$/)
            .use("pegjs-loader")
            .loader("pegjs-loader")
            .tap(options => {
                return options;
            })
            .end();
    }
};
