module.exports = {
	lintOnSave: false,
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg');

		svgRule.uses.clear();

		// prettier-ignore
		svgRule
			.use('vue-loader')
				.loader('vue-loader')
			.end()
			.use('vue-svg-loader')
				.loader('vue-svg-loader');
	}
};
