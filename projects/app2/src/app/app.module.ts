import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'app2',
    pathMatch: 'full'
  },
  {
    path: 'app2',
    loadChildren: () => import('./app2/app2.module').then(m => m.App2Module),
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
