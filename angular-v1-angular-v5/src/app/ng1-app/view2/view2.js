'use strict';
import 'angular-route';

export const view2 = angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    // templateUrl: 'view2/view2.html',
    template: require('./view2.html'),
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);
