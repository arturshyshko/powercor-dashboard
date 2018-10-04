const rewireMobX = require('react-app-rewire-mobx')
const path = require('path');


module.exports = function override(config, env) {
	let appConfig = rewireMobX(config, env)
	// Add local modules as aliases
	// After adding new alias you have to restart application
	var localModules = {
		'@actions': path.resolve(__dirname, 'src', 'actions'),
		'@api': path.resolve(__dirname, 'src', 'api'),
		'@components': path.resolve(__dirname, 'src', 'components'),
		'@constants': path.resolve(__dirname, 'src', 'constants'),
		'@services': path.resolve(__dirname, 'src', 'services'),
		'@store': path.resolve(__dirname, 'src', 'store'),
	}

	// Add new alises to webpack config
	appConfig.resolve.alias = Object.assign({}, config.resolve.alias, localModules)

	return appConfig
}
