# Collection of files for Upgrading

## [Create AngularJS Testing Module](./create_angularjs_testing_module.ts)
Used in tests to setup Angular and AngularJS together.

      import 'angular'; // needed for angular mocks
      import * as angular from 'angular';
      import 'angular-mocks';
      import { AppModule } from './app.module'; // main module that bootstraps AngularJS and Angular
      import { createAngularJSTestingModule } from './create_angularjs_testing_module';
      import { ng1App } from './ng1app';

      describe('thing you are testing', () => {

        beforeEach(angular.mock.module(createAngularJSTestingModule([AppModule]))); // sets up Angular app
        beforeEach(angular.mock.module(ng1App.name)); // sets up AngularJS app

        // tests written normally for AngularJS
        it('tests', () => {});
      });


## [ScopeProvider](./scope.provider.ts)
Used to inject `$scope` for upgraded components.

      import { Directive, DoCheck, Inject, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
      import { UpgradeComponent } from '@angular/upgrade/static';
      import { ScopeProvider } from './scope.provider';

      @Directive({
        providers: [ ScopeProvider ],
      })
      export class SomeAngularJSComponentWrapper extends UpgradeComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
        // ng1 component inputs. change variable name and type to the same variable and type used in the component.
        @Input public dep1!: any

        constructor(
          @Inject(ElementRef) elementRef: ElementRef,
          @Inject(Injector) injector: Injector,
        ) {
          super('ng1Component', elementRef, injector)
        }

        public ngOnInit() {
          super.ngOnInit();
        }

        public ngOnChanges(changes: SimpleChanges) {
          super.ngOnChanges(changes);
        }

        public ngDoCheck() {
          super.ngDoCheck();
        }

        public ngOnDestroy() {
          super.ngOnDestroy();
        }
      }
