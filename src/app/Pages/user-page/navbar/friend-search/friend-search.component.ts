import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'friend-search',
  template: `
  <div class="wrapper">
    <fa (click)="toggleSearch()" class="icon" name="search" size="2x"></fa>
    <input [ngClass]="{'searchbar-closed' : !showSearchBar }" class="searchbar-open" type="search" [formControl]="search">
  </div>
  `,
  styleUrls: ['./friend-search.component.scss']
})
export class FriendSearchComponent implements OnInit,OnDestroy {

  search : FormControl;
  showSearchBar : boolean;
  subscription : any;

  ngOnInit()
  {
    this.showSearchBar = false;
    this.initializeForm();
  }

  onFormChange(term: any) {
    console.log(term);
  }

  toggleSearch()
  {
    this.showSearchBar=!this.showSearchBar;
  }

  toggleClass()
  {
    if(this.showSearchBar)
      return "searchbar-open";
    else
      return "searchbar-closed";
  }

  initializeForm() 
  {
    this.search=new FormControl();
    this.subscription=this.search.valueChanges
        .debounceTime(200)
        .distinctUntilChanged()
        .subscribe( term => {
            this.onFormChange(term);
        });
  }

  ngOnDestroy() 
  {
    this.subscription.unsubscribe();
  }
}
