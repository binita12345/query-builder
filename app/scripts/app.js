'use strict';

/**
 * @ngdoc overview
 * @name angQueryBuilderApp
 * @description
 * # angQueryBuilderApp
 *
 * Main module of the application.
 */
angular
  .module('angQueryBuilderApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-ui-query-builder'
  ])
  .config($httpProvider => $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
