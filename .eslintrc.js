module.exports = {
	root: true,
	env: {
		node: true,
		browser: true
	},
	plugins: ['import'],
	extends: [
		'plugin:vue/recommended',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-unused-vars': ['error', {args: 'none'}],
		'import/newline-after-import': 2,
		'import/no-duplicates': 2,
		'import/order': [
			2,
			{
				'newlines-between': 'always',
				groups: ['external'],
				alphabetize: {order: 'asc', caseInsensitive: true},
				pathGroups: [
					{
						pattern: '@/**',
						group: 'internal'
					}
				],
				pathGroupsExcludedImportTypes: ['internal']
			}
		],
		'no-console': ['error', {allow: ['warn', 'error']}],
		'no-debugger': 'warn',
		'no-nested-ternary': 'error',
		'vue/component-tags-order': [
			'error',
			{
				order: ['script', 'template', 'style']
			}
		],
		curly: 'error',
		'no-sequences': 'error'
	}
};
