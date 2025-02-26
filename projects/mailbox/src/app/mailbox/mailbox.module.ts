import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailboxHomeComponent } from './mailbox-home/mailbox-home.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {StateService} from "./state.service";

export const MAILBOX_ROUTES: Routes = [
  {
    path: '',
    component: MailboxHomeComponent,
  }
];

@NgModule({
  declarations: [
    MailboxHomeComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(MAILBOX_ROUTES),
  ],

  providers: [HttpClientModule, StateService],
})
export class MailboxModule { }
