import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-menu',
  template: `
  <div class="wrapper" (clickOutside)="onClickedOutside($event)">
    <fa (click)="toggleMenu()" class="icon" name="user" size="2x"></fa>
    <ul *ngIf="showMenu" class="noselect" (click)="closeAfterSelection()">
      <li *ngIf="loggedIn" [routerLink]="['/feed',uid]"> 
        Profile 
      </li>
      <li *ngIf="loggedIn" [routerLink]="['/interact',uid]"> 
        Friends 
      </li>
      <li *ngIf="loggedIn" [routerLink]="['/publish',uid]"> 
        Publish 
      </li>
      <li *ngIf="loggedIn" (click)="logout()"> 
        Logout 
      </li>
      <li *ngIf="!loggedIn" [routerLink]="['/']"> 
        Login 
      </li>
    </ul>
  </div>
  `,
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(private router : Router) { }

  showMenu : boolean;
  loggedIn : boolean;
  uid : string;

  ngOnInit() 
  {
    this.showMenu=false;
    this.loggedIn=this.authenticate();
  }

  authenticate()
  {
    //HTTP Call: Authenticate the user and get the user id
    this.uid="zboi";
    return true;
  }

  logout()
  {
    //HTTP Call: Logout process
    this.router.navigate(['/']);
  }

  toggleMenu()
  {
    this.showMenu=!this.showMenu;
  }

  onClickedOutside(e: Event) {
    this.showMenu=false;
  }

  closeAfterSelection()
  {
    this.showMenu=false;
  }

}
