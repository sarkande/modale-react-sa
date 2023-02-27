const path = require("path");
module.exports = {
    mode: 'development',
    entry: "/src/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    "plugins": [
                        "@babel/plugin-transform-modules-commonjs"
                      ],
                    presets: [["@babel/preset-env", {loose: true, modules: false}], "@babel/preset-react"],
                    sourceType: 'unambiguous'
                },
            },
        }, {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }, ],
    },
    resolve: {
        extensions: ['.js'],
      },
      externals: {
        "react": "commonjs react",
        "react-dom": "commonjs react-dom",
     }
};