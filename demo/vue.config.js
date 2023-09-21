const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    devServer: {
      historyApiFallback: {
        rewrites: [{ from: /\*/, to: "/index.html" }],
      },
    },
  },
});
