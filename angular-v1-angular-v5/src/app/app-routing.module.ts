import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlHandlingStrategy } from '@angular/router';
import { CoexistingUrlHandlingStrategy } from './CoexistingUrlHandlingStrategy';
import { View3Component } from './view3/view3.component';

const appRoutes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'view3', component: View3Component },
];

@NgModule({
  declarations: [
    View3Component
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
  ],
  providers: [
    { provide: UrlHandlingStrategy, useClass: CoexistingUrlHandlingStrategy },
  ],
})
export class AppRoutingModule { }
