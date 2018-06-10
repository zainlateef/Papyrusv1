import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-menu',
  template: `
  <div class="wrapper">
    <fa name="user" size="2x"></fa>
  </div>
  `,
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
