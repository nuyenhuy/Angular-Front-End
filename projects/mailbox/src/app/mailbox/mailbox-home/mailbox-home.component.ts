import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StateService} from "../state.service";
import {map, Observable} from "rxjs";
import {GTable} from "../table";

@Component({
  selector: 'app-mailbox-home',
  templateUrl: './mailbox-home.component.html',
  styleUrls: ['./mailbox-home.component.scss']
})
export class MailboxHomeComponent implements OnInit {
  protected gtables$: Observable<GTable[]> = this.stateService.getListTable().pipe(map((gtable: any) => gtable.data.tables));
  protected isLoading: boolean = true;
  constructor(private stateService: StateService) {}
  ngOnInit(): void {
    this.gtables$.subscribe(() => this.isLoading = false);
  }
}
