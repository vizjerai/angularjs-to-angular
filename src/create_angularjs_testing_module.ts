// idea from: https://github.com/angular/angular/pull/16848

import { APP_BASE_HREF } from '@angular/common';
import {Injector} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import * as angular from 'angular';

/**
 * A helper function to use when unit testing AngularJS services that depend upon downgraded Angular
 * services.
 *
 * This function returns an AngularJS module that is configured to wire up the AngularJS and Angular
 * injectors without the need to actually bootstrap a hybrid application.
 * This makes it simpler and faster to unit test services.
 *
 * Use the returned AngularJS module in a call to
 * [`angular.mocks.module`](https://docs.angularjs.org/api/ngMock/function/angular.mock.module) to
 * include this module in the unit test injector.
 *
 * In the following code snippet, we are configuring the `$injector` with two modules:
 * The AngularJS `Ng1AppModule`, which is the AngularJS part of our hybrid application and the
 * `Ng2AppModule`, which is the Angular part.
 *
 * <code-example path="upgrade/static/ts/module.spec.ts" region="angularjs-setup"></code-example>
 *
 * Once this is done we can get hold of services via the AngularJS `$injector` as normal.
 * Services that are (or have dependencies on) a downgraded Angular service, will be instantiated as
 * needed by the Angular root `Injector`.
 *
 * In the following code snippet, `heroesService` is a downgraded Angular service that we are
 * accessing
 * from AngularJS.
 *
 * <code-example path="upgrade/static/ts/module.spec.ts" region="angularjs-spec"></code-example>
 *
 * <div class="alert is-important">
 *
 * This helper is for testing services not components.
 * For Component testing you must still bootstrap a hybrid app. See `UpgradeModule` or
 * `downgradeModule` for more information.
 *
 * </div>
 *
 * <div class="alert is-important">
 *
 * The resulting configuration does not wire up AngularJS digests to Zone hooks. It is the
 * responsibility of the test writer to call `$rootScope.$apply`, as necessary, to trigger
 * AngularJS handlers of async events from Angular.
 *
 * </div>
 *
 * <div class="alert is-important">
 *
 * The helper sets up global variables to hold the shared Angular and AngularJS injectors.
 *
 * * Only call this helper once per spec.
 * * Do not use `createAngularJSTestingModule` in the same spec as `createAngularTestingModule`.
 *
 * </div>
 *
 * Here is the example application and its unit tests that use `createAngularTestingModule`
 * and `createAngularJSTestingModule`.
 *
 * <code-tabs>
 *  <code-pane title="module.spec.ts" path="upgrade/static/ts/module.spec.ts"></code-pane>
 *  <code-pane title="module.ts" path="upgrade/static/ts/module.ts"></code-pane>
 * </code-tabs>
 *
 *
 * @param AngularModules a collection of Angular modules to include in the configuration
 *
 * @experimental
 */
export function createAngularJSTestingModule(AngularModules: any[]) {
  return angular.module('$$angularJSTestingModule', [])
    .factory(
      '$$angularInjector',
      ($injector: any) => { // supposed to be angular.IInjectorService
        TestBed.configureTestingModule({
          imports: AngularModules,
          providers: [
            // { provide: ???, useValue: $injector} // unsure actual provide value
            { provide: APP_BASE_HREF, useValue: '/' }, // fix for ngRoute
          ],
        });
        return TestBed.get(Injector);
      },
    ).name;
}
