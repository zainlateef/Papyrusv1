import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'friend-search',
  template: `
  <div class="wrapper">
    <fa (click)="toggleSearch()" class="icon" name="search" size="2x"></fa>
    <input *ngIf="showSearchBar" type="search" class="searchbar" [formControl]="search">
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
