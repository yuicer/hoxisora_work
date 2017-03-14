var path = require("path")
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	entry: "./app/main.js",
	output: {
		path: path.resolve(__dirname, "./src"),
		publicPath: "/src/",
		filename: "bundle.js",
	},
	devtool: "eval-source-map", //调试方便，将编译文件与源文件对应
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				query: {
					presets: ["es2015"]
				}
		}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
		}, {
				test: /\.(png|jpg|gif|svg)$/,
				loader: "url-loader",
				query: {
					name: 'img/[name].[hash:7].[ext]',
					limit: 100000
				}
		}
				]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'build.min.css',
			allChunks: true,
		}), //把 css 从 bundle.js分离出来，作为一个单独的css
//		new webpack.optimize.CommonsChunkPlugin({
//			name: 'vendor',
//			filename: 'vendor-[hash].min.js',
//		}),
	],
	devServer: {
		noInfo: true,
	},
	performance: {
		hints: false
	}
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
		// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
    new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
    new webpack.LoaderOptionsPlugin({
			minimize: true
		})
  ])
}
