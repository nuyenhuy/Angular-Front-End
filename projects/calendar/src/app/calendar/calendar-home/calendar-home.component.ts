import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import {catchError, map, Observable, of} from "rxjs";
import {GTable} from "../../../../../mailbox/src/app/mailbox/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-calendar-home',
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.scss']
})
export class CalendarHomeComponent implements OnInit {
  protected gtables$: Observable<GTable[]> = this.backend.getListTable().pipe(map((gtable: any) => gtable.data.tables));
  protected formGroup: FormGroup = this.fb.group({
    file: [null, Validators.required]
  });
  protected msg: string = '';
  protected isSucess: boolean = false;
  constructor(public backend: BackendService, private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        file: file
      });
    }
  }

  onSubmit(event: Event): void {
    let file: File = this.formGroup.get('file')?.getRawValue();
    this.backend.uploadFileGraphQL(file).pipe(
      catchError(error => {
        this.msg = error.statusText;
        this.isSucess = false;
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.msg = res.message;
        this.formGroup.get('file')?.reset();
        this.isSucess = true;
      }
    });
  }
}
