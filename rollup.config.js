import svg from 'rollup-plugin-vue-inline-svg'
import vue from 'rollup-plugin-vue'

export default {
	input: 'src/main.js',
	external: ["vue", '@contentarchitect/editor'],
	output: {
		file: 'dist/toc.js',
		format: 'umd',
		name: 'Toc',
		globals: {
			vue: "Vue",
			'@contentarchitect/editor': 'ContentArchitect'
		}
	},
	plugins: [
		svg(),
		vue()
	]
}