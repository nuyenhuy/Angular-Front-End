import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  // 🟢 Truy vấn danh sách tác giả
  getUsers(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          users {
            id
            email
            name
          }
        }
      `,
    });
  }
}
