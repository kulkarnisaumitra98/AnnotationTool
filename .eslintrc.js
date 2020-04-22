module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ["plugin:react/recommended", "airbnb", "plugin:react-native/all"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "babel-eslint",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react", "react-native", "react-hooks"],
	rules: {
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
		"no-use-before-define": [
			"error",
			{ functions: true, classes: true, variables: false },
		],
		"react/prop-types": [1],
		"react/jsx-props-no-spreading": [0],
		"no-unused-vars": [
			"warn",
			{ vars: "all", args: "after-used", ignoreRestSiblings: false },
		],
		"global-require": "off",
		"react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
		"react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
	},

	settings: {
		"react-native/style-sheet-object-names": [
			"EStyleSheet",
			"OtherStyleSheet",
			"PStyleSheet",
		],
	},
};
