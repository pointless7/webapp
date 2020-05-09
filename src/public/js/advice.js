var app = angular.module("myApp", ["ngRoute"]);

app.controller('HomeController', function($scope) {
  $scope.message = 'Hello from HomeController';
});

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "sections/home/home.html"
  })
  .when("/notifications", {
    templateUrl : "sections/notifications/notifications.html"
  })
  .when("/profile", {
    templateUrl : "sections/profile/profile.html"
  });
});