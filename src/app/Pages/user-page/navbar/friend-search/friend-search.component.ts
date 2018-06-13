import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'friend-search',
  template: `
  <div class="wrapper">
    <fa class="icon" name="search" size="2x" (click)="toggleSearch()"></fa>
    <input type="search" class="searchbar" [formControl]="search">
  </div>
  `,
  styleUrls: ['./friend-search.component.scss']
})
export class FriendSearchComponent implements OnInit,OnDestroy {

  search : FormControl;
  subscription : any;

  ngOnInit()
  {
    this.initializeForm();
  }

  onFormChange(term: any) {
    console.log(term);
  }

  toggleSearch()
  {
    console.log("it's a toggle");
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
