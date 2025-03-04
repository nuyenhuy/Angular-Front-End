import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { App2HomeComponent } from './app2-home/app2-home.component';
import {HttpClientModule} from "@angular/common/http";
import {BackendService} from "./backend.service";
import {ReactiveFormsModule} from "@angular/forms";

export const APP2_ROUTES: Routes = [
  {
    path: '',
    component: App2HomeComponent,
  }
];

@NgModule({
  declarations: [
    App2HomeComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(APP2_ROUTES),
    ReactiveFormsModule,
  ],
  providers: [HttpClientModule, BackendService]
})
export class App2Module { }
