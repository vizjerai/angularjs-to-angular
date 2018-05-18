# Upgrade AngularJS 1.5 to Angular 5.2



1. install angular cli v1.7.4

```
yarn global add angular-cli
```

2. in another directory

```
ng new <project-name>
```

3. copy ng1 app's `/app` directory into `/src/app/ng1-app`


4. add ng1 dependencies

```
yarn add angular@~1.5.0 angular-route@~1.5.0
yarn add --dev angular-mocks@~1.5.0
```

typescript types
```
yarn add --dev @types/angular@~1.5.0 @types/angular-mocks@~1.5.0 @types/angular-route@~1.5.0
```

5. install ng-upgrade

```
yarn add @angular/upgrade@~5.2.0
```

6. allow js to be imported in typescript

```
// tsconfig.json

{
  ...
  "compilerOptions": {
    ...
    "allowJs": true,
    ...
  }
  ...
}
```

7. export the main n1 module variable.

```
// from:
angular.module('myApp', [
  ...
])

// to:
export const myApp = angular.module('myApp', [
  ...
])
```

8. bootstrap ng1 app with ng2 app.

```
// src/main.ts
...
import { setAngularJSGlobal } from '@angular/upgrade/static';
import * as angular from 'angular';
...

setAngularJSGlobal(angular);
platformBrowserDynamic().bootstrapModule(AppModule)
...

// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { setUpLocationSync } from '@angular/router/upgrade';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppComponent } from './app.component';
import { myApp } from './ng1-app/app';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
  //   remove automatic bootstrapping to allow bootstrapping ng1 app alongside ng2 app.
  //   must add `AppComponent` to `entryComponents`
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }

  public ngDoBootstrap(ref: ApplicationRef) {
    ref.bootstrap(AppComponent); // manual bootstrap AppComponent

    // bootstrap ng1 app
    this.upgrade.bootstrap(document.body, [myApp.name], { strictDi: true });
    setUpLocationSync(this.upgrade); // https://github.com/angular/angular/issues/14081
  }
}
```

9. import dependencies for each of your modules (might just be the main module)
- these can be found by running the app and look at the console errors

example:

```
// src/app/ng1-app/app.js
...
import 'angular-route';
import './view1/view1'
import './view2/view2'
import './components/version/version';
...
```


10. Change `templateUrl` to `template` to allow template to be bundled together.

```
// src/appp/ng1-app/view1/view1.js
...
  $routeProvider.when('/view1', {
    // templateUrl: 'view1/view1.html',
    template: require('./view1.html'),
  });
...
```

11. Add Angular router

```
// src/app/app.module.ts
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  ...
  imports: [
    AppRoutingModule,
    ...
  ]
  ...
})

// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // ng routes
];

@NgModule({
  declarations: [
    // add route components here
  ],
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        // enableTracing: true // for debugging routes
      }
    )
  ]
})
export class AppRoutingModule { }
```

12. Enable html5 mode for ng1 and remove default route.

```
// src/app/ng1-app/app.js
...
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true);

  // $routeProvider.otherwise({redirectTo: '/view1'}); // remove default route
});

```

13. Allow ng1 and ng2 routers to coexist

```
// src/app/app-routing.module.ts
...
import { RouterModule, Routes, UrlHandlingStrategy } from '@angular/router';
import { CoexistingUrlHandlingStrategy } from './CoexistingUrlHandlingStrategy';

...

@NgModule({
  ...
    providers: [
    { provide: UrlHandlingStrategy, useClass: CoexistingUrlHandlingStrategy },
  ],
  ...
})
...


// src/app/CoexistingUrlHandlingStrategy.ts
import { UrlHandlingStrategy, UrlTree } from '@angular/router';

export class CoexistingUrlHandlingStrategy implements UrlHandlingStrategy {

  // Coexists with Angular 1 ngRoute by white listing Angular 2+ routes
  public shouldProcessUrl(url: UrlTree): boolean {
    return false;
  }

  public extract(url: UrlTree): UrlTree {
    return url;
  }

  public merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    return newUrlPart;
  }
}

// src/app/app.component.html
<ul>
  <li><a href="/view1">View 1</a></li> <!-- ng1 link -->
  <li><a href="/view2">View 2</a></li> <!-- ng1 link -->
</ul>

<div ng-view class="view-frame"></div> <!-- ng1 route content -->
<router-outlet></router-outlet><!-- ng2+ route content -->
```

14. Add Angular Component

```
// src/app/view3/view3.component.html
// src/app/view3/view3.component.spec.ts
// src/app/view3/view3.component.ts


// src/app-routing.module.ts
...
import { View3Component } from './view3/view3.component';

const appRoutes: Routes = [
  { path: 'view3', component: View3Component }
];
...
@NgModule({
  declarations: [
    View3Component
  ],
  ...
})
...

// src/app/app.component.html
...
  <li><a href="/view2">View 2</a></li> <!-- ng1 link -->
  <li><a routerLink='/view3' routerLinkActive='active'>View 3</a></li> <!-- ng2+ link -->
</ul>
...

// src/app/CoexistingUrlHandlingStrategy.ts
...
  // Coexists with Angular 1 ngRoute by white listing Angular 2+ routes
  public shouldProcessUrl(url: UrlTree): boolean {
    return url.toString().startsWith('/view3');
  }
...

```

15. Add ability for test runner to find ng1 tests.

```
// test.ts
...
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

// Find all ng1 tests.
const ng1Context = require.context('./', true, /\_test\.js$/);
// Load the modules.
ng1Context.keys().map(ng1Context);
```

16. Update all ng1 tests to import files required to run.

example:

```
// src/app/ng1-app/view1/view1_test.js
'use strict';
import 'angular'; // this is for angular-mocks
import 'angular-mocks';
import './view1'; // location of angular module
...
```

17. replace all uses of `module` with `angular.mock.module`

example:

```
// src/app/ng1-app/view1/view1_test.js
// from:
  beforeEach(module('myApp.view1'));

// to:
  beforeEach(angular.mock.module('myApp.view1'));
```


## More reading on ngUpgrade

https://angular.io/guide/upgrade

Goal component based routing