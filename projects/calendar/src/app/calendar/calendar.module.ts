import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarHomeComponent } from './calendar-home/calendar-home.component';
import {HttpClientModule} from "@angular/common/http";
import {BackendService} from "./backend.service";
import {ReactiveFormsModule} from "@angular/forms";

export const CALENDAR_ROUTES: Routes = [
  {
    path: '',
    component: CalendarHomeComponent,
  }
];

@NgModule({
  declarations: [
    CalendarHomeComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(CALENDAR_ROUTES),
    ReactiveFormsModule,
  ],
  providers: [HttpClientModule, BackendService]
})
export class CalendarModule { }
