import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import {map, Observable} from "rxjs";
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
    this.backend.uploadFile(file).subscribe(data => {
      console.log(data)
    });
  }
}
