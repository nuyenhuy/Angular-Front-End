import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'app1',
    loadChildren: () => import('app1/App1Module').then(m => m.App1Module)
  },
  {
    path: 'app2',
    loadChildren: () => import('app2/App2Module').then(m => m.App2Module)
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    HeaderComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
