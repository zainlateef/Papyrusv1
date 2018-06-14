import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-menu',
  template: `
  <div class="wrapper">
    <fa (click)="toggleMenu()" class="icon" name="user" size="2x"></fa>
    <ul *ngIf="showMenu">
      <li *ngFor="let item of menuItems">
        
      <li>
    </ul>
  </div>
  `,
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor() { }

  showMenu : boolean;

  ngOnInit() 
  {
    this.showMenu=false;
  }

  toggleMenu()
  {
    this.showMenu=!this.showMenu;
  }

}
