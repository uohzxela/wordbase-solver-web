'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'ngFileUpload',
  'angular-loading-bar'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/dos-n-donts', {
    templateUrl: 'misc/dos-n-donts.html',
  })
  .when('/how-it-works', {
  	templateUrl: 'misc/how-it-works.html'
  })
  .otherwise({redirectTo: '/home'});
}])

.controller('HeaderController', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);
