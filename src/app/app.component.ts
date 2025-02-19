import { Component } from '@angular/core';
import { GraphQLService } from './graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-app';
  constructor(private graphQLService:GraphQLService) {
    graphQLService.getUsers().subscribe(data => {
      console.log(data);
    })
  }
}
