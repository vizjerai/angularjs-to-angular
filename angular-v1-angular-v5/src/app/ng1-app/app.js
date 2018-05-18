'use strict';
import 'angular-route';
import './view1/view1'
import './view2/view2'
import './components/version/version';

// Declare app level module which depends on views, and components
export const myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true);

  // $routeProvider.otherwise({redirectTo: '/view1'});
}]);
