'use strict';
import 'angular-route';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    // templateUrl: 'view1/view1.html',
    template: require('./view1.html'),
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);