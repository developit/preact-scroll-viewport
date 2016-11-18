import babel from 'rollup-plugin-babel';
import es3 from 'rollup-plugin-es3';
import replace from 'rollup-plugin-post-replace';

export default {
	useStrict: false,
	plugins: [
		babel({
			babelrc: false,
			sourceMap: true,
			exclude: 'node_modules/**',
			presets: [
				['es2015', { modules:false, loose:true }],
				'stage-0'
			],
			plugins: [
				'transform-class-properties',
				['transform-react-jsx', { pragma:'h' }]
			]
		}),

		// strip Object.freeze()
		es3(),

		// remove Babel helpers
		replace({
			'throw ': 'return; throw '
		})
	]
};
