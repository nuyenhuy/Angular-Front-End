import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public isLoading: boolean = false;
  public graphQLServer: string = 'http://localhost:3001/graphql';
  public apiUrl: string = 'http://localhost:3001/upload';
  constructor(private httpClient: HttpClient) {
  }

  getListTable(): Observable<any> {
    return this.httpClient.post(this.graphQLServer, {
      query: `{
        tables {
          tableName,
          id,
          description
        }
      }`
    });
  }
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();

    // Đính kèm file vào FormData
    formData.append("file", file, file.name);

    // Gửi request API thông thường
    return this.httpClient.post<any>(this.apiUrl, formData, {
      headers: new HttpHeaders({
        // Không cần phải đặt Content-Type, trình duyệt sẽ tự động thêm boundary
      })
    });
  }
}
