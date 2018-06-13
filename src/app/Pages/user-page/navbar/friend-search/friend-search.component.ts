import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { User } from '../../../../Models/user';

@Component({
  selector: 'friend-search',
  template: `
  <div class="wrapper">
    <fa (click)="toggleSearch()" class="icon" name="search" size="2x"></fa>
    <input [ngClass]="{'searchbar-closed' : !showSearchBar }" class="searchbar-open" type="search" [formControl]="search">
    <ul class="list">
      <li [routerLink]="['/feed',user.uid]" class="list-item" *ngFor="let user of userMatches">
          <img [src]="user.profilePic" class="rounded-pic">
          {{user.firstName}} {{user.lastName}}
      </li>
    </ul>
  </div>
  `,
  styleUrls: ['./friend-search.component.scss']
})
export class FriendSearchComponent implements OnInit,OnDestroy {

  search : FormControl;
  showSearchBar : boolean;
  subscription : any;
  userMatches : Set<User> = new Set;
  userDatabase : Array<User> = new Array;

  ngOnInit()
  {
    this.showSearchBar = false;
    this.initializeForm();
    this.initializeDummyData();
  }

  onFormChange(term: any) {
    console.log("HTTP Call:Query this parameter"+term);
    if(term==="")
      this.userMatches.clear();
    else
    {
      //HTTP call returns set of users. This logic will be removed
      this.userDatabase.filter( user => {
        if(user.firstName.toUpperCase().includes(term.toUpperCase()) || user.firstName.toUpperCase().includes(term.toUpperCase()))
          this.userMatches.add(user);
        else if(user.lastName.toUpperCase().includes(term.toUpperCase()) || user.lastName.toUpperCase().includes(term.toUpperCase()))
          this.userMatches.add(user);
      });
    }
    
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

  initializeDummyData()
  {
    let user1=new User();
    let user2=new User();
    let user3=new User();
    user1.uid="schmurd", user1.firstName="Bob",user1.lastName="Schmurda",user1.profilePic="https://media.gq.com/photos/57360cf4a522201d4b35bec2/16:9/w_1280/bobby-shmurda-football-gq-0616-01.jpg";
    user2.uid="jdirt", user2.firstName="Joe",user2.lastName="Dirt",user2.profilePic="https://resizing.flixster.com/pBPkXbpgQN3BbBwYVk4HFElqPfQ=/300x300/v1.aDs0ODg2O2o7MTc3MzA7MTIwMDs3MDA7NDYw";
    user3.uid="elBig", user3.firstName="Big",user3.lastName="L",user3.profilePic="https://img.discogs.com/sRJ6CCEJvkdRKadMMrXY8U4DMB8=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-39956-1499748788-5883.jpeg.jpg";
    this.userDatabase.push(user1,user2,user3);
  }

  ngOnDestroy() 
  {
    this.subscription.unsubscribe();
  }
}
