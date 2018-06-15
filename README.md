# AngularJS to Angular Upgrade Path

## angular-v1

Basic AngularJS application from https://github.com/angular/angular-seed

## angular-v1-angular-v5

Hybrid application with tests for both AngularJS and Angular

Steps taken can be found in [angular-v1-angular-v5/STEPS.md](./angular-v1-angular-v5/STEPS.md)


## Notes

### AngularJS Components / Element Directives

 - must be changed to use closing tags

    from

        <app-component />

    to

        <app-component></app-component>

    this change was done to follow how web components must be formatted.

### AngularJS Attribute Directives

- currently [ngUpgrade](https://github.com/angular/angular/tree/master/packages/upgrade) does not support upgrade or downgrade paths and must be rewritten.
- [ngAdapter](https://github.com/DanielSchuech/ngAdapter) extends ngUpgrade to support upgrade and downgrade paths for Angular 2. But does not work for Angular 4+ yet.

### AngularJS Factory Provider for Angular

      // Class with code that does stuff
      class Foo {
        constructor(
          // dependencies
        ) {}
        ...
      }

      // AngularJS Factory
      export class FooFactory {
        public static $inject: string[] = [
          // dependencies as strings
        ];

        constructor(
          // dependencies
        ) {
          return new Foo(
            // dependencies
          )
        }
      }

      // Angular Service placeholder
      @Injectable()
      export class FooService extends Foo {}

      // function for Ahead of Time (AoT) compilation for Angular 5. Angular 6 can use () => {}
      export function fooService(injector: Injector) {
        return injector.get('fooFactory'); // name of the factory in AngularJS
      }

      // provider to replace Angular Service with the AngularJS Factory
      export const fooServiceProvider = {
        deps: ['$injector'],
        provide: FooService,
        useFactory: fooService,
      }

Usage in AngularJS

      import { FooFactory } from './fooFactory';

      angular.module('ng1app').factory('fooFactory', FooFactory);

Usage in Angular

      import { fooServiceProvider } from './foo.service.provider';

      @NgModule({
        ...
        providers: [
          fooServiceProvider,
        ],
      })
      export class AppModule {}
