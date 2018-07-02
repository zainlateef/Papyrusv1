import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
  <div class="wrapper">
    <facet-menu></facet-menu>
    <div class="right">
        <friend-search (emitSearchStatus)="getSearchEvent($event)"></friend-search>
        <user-menu></user-menu>
    </div>
    <div style="clear: right; min-height: 1px"></div>
  </div>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  searchIsOpen : boolean;

  ngOnInit() {
    this.searchIsOpen=false;
  }

  getSearchEvent(searchIsOpen)
  {
    this.searchIsOpen=searchIsOpen;
  }

}
