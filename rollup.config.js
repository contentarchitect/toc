import svg from 'rollup-plugin-vue-inline-svg'
import vue from 'rollup-plugin-vue'
import { terser } from "rollup-plugin-terser";

export default {
	input: 'src/main.js',
	external: ["vue", '@contentarchitect/editor'],
	output: [
		{
			file: 'dist/toc.js',
			format: 'umd',
			name: 'Toc',
			globals: {
				vue: "Vue",
				'@contentarchitect/editor': 'ContentArchitect'
			}
		},
		{
			file: 'dist/toc.min.js',
			format: 'umd',
			name: 'Toc',
			globals: {
				vue: "Vue",
				'@contentarchitect/editor': 'ContentArchitect'
			},
			plugins: [
				terser({
					keep_classnames: true
				}),
			]
		},
	],
	plugins: [
		svg(),
		vue()
	]
}