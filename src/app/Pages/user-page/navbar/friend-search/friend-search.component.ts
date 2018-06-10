import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'friend-search',
  template: `
  <div class="wrapper">
    <fa class="icon" name="search" size="2x"></fa>
  </div>
  `,
  styleUrls: ['./friend-search.component.scss']
})
export class FriendSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
