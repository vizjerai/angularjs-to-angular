'use strict';
import 'angular';
import * as angular from 'angular';
import 'angular-mocks';
import { AppModule } from '../../app.module';
import { createAngularJSTestingModule } from '../../create_angularjs_testing_module';
import { view2 } from './view2';

describe('myApp.view2 module', function() {
  beforeEach(angular.mock.module(createAngularJSTestingModule([AppModule]))); // necessary when the component uses something from Angular
  beforeEach(angular.mock.module(view2.name));

  describe('view2 controller', function() {

    it('should ....', angular.inject(function($controller) {
      //spec body
      const view2Ctrl = $controller('View2Ctrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});
