import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private httpClient: HttpClient) {
  }

  getListTable(): Observable<any> {
    return this.httpClient.post('http://localhost:3001/graphql', {
      query: `{
        tables {
          tableName,
          id,
          description
        }
      }`
    });
  }
}
