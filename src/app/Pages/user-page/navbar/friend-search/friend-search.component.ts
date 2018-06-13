import { Component, OnInit } from '@angular/core';
import { ReactiveForm } from '../../../../Parent-Classes/reactive-form'

@Component({
  selector: 'friend-search',
  template: `
  <div class="wrapper">
    <fa class="icon" name="search" size="2x"></fa>
    <input type="search" class="searchbar" [formControl]="search">
  </div>
  `,
  styleUrls: ['./friend-search.component.scss']
})
export class FriendSearchComponent extends ReactiveForm implements OnInit {

  onFormChange(term: any) {
    console.log(term);
  }

}
