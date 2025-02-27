import {Component, OnInit} from '@angular/core';
import {StateService} from "../state.service";
import {map, Observable} from "rxjs";
import {GTable} from "../table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-mailbox-home',
  templateUrl: './mailbox-home.component.html',
  styleUrls: ['./mailbox-home.component.scss']
})
export class MailboxHomeComponent implements OnInit {
  protected formGroup: FormGroup = this.fb.group({
    tableName: ['dimCustomer', Validators.required],
    fromDate: [''],
    toDate: [''],
    typeFile: ['excel', Validators.required]
  });
  protected gtables$: Observable<GTable[]> = this.stateService.getListTable().pipe(map((gtable: any) => gtable.data.tables));

  constructor(protected stateService: StateService, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.gtables$.subscribe((): boolean => this.stateService.isLoading = false);
  }

  protected export(): void {
    if (this.formGroup.valid) {
      if (this.formGroup.get('typeFile')?.value === 'excel') {
        this.exportExcel();
      } else {
        this.exportPDF();
      }
    }
  }

  protected exportExcel(): void {
    this.stateService.isLoading = true;
    let tableName: string = 'dimCustomer';
    let formValue = {
      tableName: this.formGroup.get('tableName')?.value,
      fromDate: this.formGroup.get('fromDate')?.value,
      toDate: this.formGroup.get('toDate')?.value,
      typeFile: this.formGroup.get('typeFile')?.value
    }
    const query: string = `{
        export(tableName: "${tableName}", fromDate: "${formValue.fromDate}", toDate: "${formValue.toDate}", typeFile: "${formValue.typeFile}")
    }`;
    this.stateService.loadFile(query, `${tableName}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

  protected exportPDF(): void {
    this.stateService.isLoading = true;
    let tableName: string = 'dimCustomer';
    let formValue = {
      tableName: this.formGroup.get('tableName')?.value,
      fromDate: this.formGroup.get('fromDate')?.value,
      toDate: this.formGroup.get('toDate')?.value,
      typeFile: this.formGroup.get('typeFile')?.value
    }
    const query: string = `{
        export(tableName: "${tableName}", fromDate: "${formValue.fromDate}", toDate: "${formValue.toDate}", typeFile: "${formValue.typeFile}")
    }`;
    this.stateService.loadFile(query, `${tableName}.pdf`, 'application/pdf');
  }
}
