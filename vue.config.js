module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/openkore-checker/" : "/",
  chainWebpack: (config) => {
    config.module
      .rule("pegjs")
      .test(/\.pegjs$/)
      .use("pegjs-loader")
      .loader("pegjs-loader")
      .tap((options) => {
        return options;
      })
      .end();
  },
};
