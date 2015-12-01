(function () {
	'use strict';

	/**
	 * @description
	 * This module houses local configuration settings belonging to the deployment,
	 * and is dynamically generated.
	 */

	angular
		.module('cpp-ui-spa-master.config.global', [])
    .constant('ENV', 'development');

}());
