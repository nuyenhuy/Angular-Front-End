import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, of, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public isLoading: boolean = false;
  public graphQLServer: string = 'http://localhost:3001/graphql';
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

  loadFile(query: string, fileName: string, fileType: string): void {
    this.httpClient.post<any>(this.graphQLServer, { query }).pipe(
      switchMap(response => of(response).pipe(delay(800)))
    ).subscribe((response): void => {
      const fileData = response.data.export;
      const binaryData: string = atob(fileData);
      const byteArray: Uint8Array = new Uint8Array(binaryData.length);

      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: fileType });
      const a: HTMLAnchorElement = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(a.href);
      this.isLoading = false;
    });
  }
}
