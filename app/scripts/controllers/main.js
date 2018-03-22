'use strict';

/**
 * @ngdoc function
 * @name angQueryBuilderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angQueryBuilderApp
 */
angular.module('angQueryBuilderApp')
  .controller('MainCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

   $scope.spec = {
		_id: {type: 'objectId'},
		name: {type: 'string'},
		city: {type: 'string'},
		age: {type: 'string'},
		email:{type: 'string'},
	};

	$scope.query = {
		name: '', // Assumes you have a status field
		email: {$exists: true},
	};

	$scope.data;
	$scope.$watch('query', ()=> {
		// console.log('REFRESH', $scope.query);
		$http.post('http://localhost:6300/findUser', {data: $scope.query})
			.then(res => $scope.data = res.data)
	}, true);

	$scope.notifyChange = (id, value) => console.log('Value of', id, 'changed to', value);

	$scope.export = function(){
		alert('export')
	}
	/*$scope.data;
	$scope.$watch('query', ()=> {
		// console.log('REFRESH', $scope.query);
		$http.get('api/data', {params: $scope.query})
			.then(res => $scope.data = res.data)
	}, true);

	$scope.notifyChange = (id, value) => console.log('Value of', id, 'changed to', value);*/
  });
