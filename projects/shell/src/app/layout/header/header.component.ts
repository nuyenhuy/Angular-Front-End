import { Component, OnInit } from '@angular/core';
import {RouterLinkWithHref} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLinkWithHref
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'shell';

  constructor() { }

  ngOnInit(): void {
  }

}
