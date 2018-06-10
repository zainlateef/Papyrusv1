import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
  <div class="wrapper">
    <facet-menu></facet-menu>
  </div>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
