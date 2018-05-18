'use strict';
import 'angular';
import 'angular-mocks';
import './view1';

describe('myApp.view1 module', function() {

  beforeEach(angular.mock.module('myApp.view1'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});