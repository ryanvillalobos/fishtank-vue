module.exports = {
	// set your styleguidist configuration here
	title: 'Default Style Guide',
	components: 'src/components/**/[A-Z]*.vue',
	defaultExample: true,
	sections: [
	  {
	    name: 'First Section',
	    components: 'src/components/**/[A-Z]*.vue'
		},
	],
	webpackConfig: {
		// custom config goes here
		module:{
			rules:[
				{
					test: /\.(ts|tsx)$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
					options: {
						appendTsSuffixTo: [/\.vue$/],
					}
				}
			]
		}
	}
}
