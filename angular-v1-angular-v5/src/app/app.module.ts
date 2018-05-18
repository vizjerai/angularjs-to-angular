import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { setUpLocationSync } from '@angular/router/upgrade';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppRoutingModule } from './app-routing.module';
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
    AppRoutingModule,
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
