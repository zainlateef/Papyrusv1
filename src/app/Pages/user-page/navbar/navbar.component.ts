import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../../../Models/menu-item';
import { UrlChangeDetection } from '../../../Models/url-changes';
@Component({
  selector: 'navbar',
  template: 
  `<nav class="nav">
      <div class="burger" [ngClass]="{'burger--active':showMenu}" (click)="toggleMenu()">
        <div class="burger__patty"></div>
      </div>
      <ul class="nav__list" [ngClass]="{'nav__list--active':showMenu}">
        <li *ngFor="let item of menuItems" class="nav__item">
          <a href="#1" class="nav__link"><fa class="icon" [name]="item.iconName" [ngStyle]="{'color':item.color}"></fa></a>
        </li>
      </ul>
  </nav>`,
  styleUrls: ['./navbar.component.css','./original_style.scss']
})

export class NavbarComponent extends UrlChangeDetection implements OnInit
{
    constructor(private route : ActivatedRoute){
      super(route);
    }

    showMenu : boolean = false;
    routeSubscription : any;
    uid : string;
    menuItems : MenuItem[];

    ngOnInit()
    {
      this.detectUidChanges();
    }

    loadOnUrlChange()
    {
      console.log("Navbar loads uid:"+this.uid);
      this.menuItems=[];
      this.menuItems.push(new MenuItem("camera-retro","photos","#00ffff"),new MenuItem("user","home","#ff0080"));
    }

    toggleMenu()
    {
      this.showMenu=!this.showMenu;
    }
}
