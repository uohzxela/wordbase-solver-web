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
	$scope.$watch('files', function() {
		$scope.formUpload = false;
		console.log("before upload")
		$scope.upload($scope.files);
	});
	$scope.upload = function(files) {
		if(files && files.length) {
			var file = files[0];
			console.log("uploading")
			Upload.upload({
				url: 'http://52.74.179.193:8000/upload',
				file: file,
				fields: {'color': 'orange'}
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
