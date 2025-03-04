import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public isLoading: boolean = false;
  public graphQLServer: string = 'http://localhost:3001/graphql';
  public apiUrl: string = 'http://localhost:3001/api/upload';

  constructor(private httpClient: HttpClient) {}

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

  uploadFileRest(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file, file.name);
    return this.httpClient.post<any>(this.apiUrl, formData, {});
  }

  uploadFileGraphQL(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('operations', JSON.stringify({
      query: `
        mutation UploadAdjCustomerFile($file: Upload!) {
          uploadAdjCustomerFile(file: $file)
        }
      `,
      variables: {
        file: null,
      },
    }));
    formData.append('map', JSON.stringify({
      '0': ['variables.file'],
    }));
    formData.append('0', file, file.name);

    const headers = {
      'x-apollo-operation-name': 'UploadAdjCustomerFile',
      'apollo-require-preflight': 'true' // Đảm bảo preflight request được xử lý
    };
    return this.httpClient.post<any>(this.graphQLServer, formData, {headers});
  }
}
