'use strict';
import 'angular'; // this is for angular-mocks
import 'angular-mocks';
import './version';

describe('myApp.version module', function() {
  beforeEach(angular.mock.module('myApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
