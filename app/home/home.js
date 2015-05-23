'use strict';

angular.module('myApp.home', ['ngRoute', 'ngFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'Upload', function($scope, Upload) {
	$scope.welcome = "welcome to wordbase solver"
	$scope.$watch('file', function() {
		console.log("before upload")
		$scope.upload($scope.file);
	});

	$scope.upload = function(file) {
		if(file && file.length) {
			console.log("uploading")
			Upload.upload({
				url: 'http://localhost:5000/upload',
				file: file
			}).progress(function(evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded/evt.total);
				console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
			}).success(function(data, status, headers, config) {
				console.log('Response: ' + data);
				var words = data.split(" ");
				var uniqueWords = [];
				$.each(words, function(i, el){
				    if($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
				});
				$scope.words = uniqueWords.slice(0, 30);
				
			});
		}
	};
}]);