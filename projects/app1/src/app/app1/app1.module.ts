import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App1HomeComponent } from './app1-home/app1-home.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {StateService} from "./state.service";
import {ReactiveFormsModule} from "@angular/forms";

export const APP1_ROUTES: Routes = [
  {
    path: '',
    component: App1HomeComponent,
  }
];

@NgModule({
  declarations: [
    App1HomeComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(APP1_ROUTES),
    ReactiveFormsModule,
  ],

  providers: [HttpClientModule, StateService],
})
export class App1Module { }
