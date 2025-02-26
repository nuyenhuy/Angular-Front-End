import {Component, OnInit} from '@angular/core';
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

  constructor(protected stateService: StateService) {
  }

  ngOnInit(): void {
    this.gtables$.subscribe((): boolean => this.stateService.isLoading = false);
  }

  exportExcel(): void {
    this.stateService.isLoading = true;
    let tableName: string = 'dimCustomer';
    const query: string = `{
        exportExcel(tableName: "${tableName}")
    }`;
    this.stateService.loadFile(query, `${tableName}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

  exportPDF(): void {
    const query = `{ exportPDF }`;
    this.stateService.loadFile(query, 'tables.pdf', 'application/pdf');
  }
}
