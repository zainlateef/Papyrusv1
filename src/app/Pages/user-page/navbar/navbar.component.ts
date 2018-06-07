import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../../../Models/menu-item';
import { UrlChangeDetection } from '../../../Models/url-changes';
@Component({
  selector: 'navbar',
  template: 
  `
  <div class="wrapper">
    <nav class="nav">
        <div class="burger" [ngClass]="{'burger--active':showMenu}" (click)="toggleMenu()">
          <div class="burger__patty"></div>
        </div>
        <ul class="nav__list" [ngClass]="{'nav__list--active':showMenu}">
          <li *ngFor="let item of menuItems" class="nav__item">
            <nav-item [item]="item"></nav-item>
          </li>
        </ul>
    </nav>
  </div>
  `,
  styleUrls: ['./navbar.component.scss','./original_style.scss']
})

export class NavbarComponent extends UrlChangeDetection implements OnInit
{
    constructor(private route : ActivatedRoute){
      super(route);
    }

    showMenu : boolean = false;
    menuItems : MenuItem[];

    ngOnInit()
    {
      this.detectUidChanges();
    }

    loadOnUrlChange(params)
    {
      console.log("Navbar loads uid:"+params.uid);
      this.menuItems=[];
      this.menuItems.push(new MenuItem("camera-retro","photos","#00ffff"),new MenuItem("user","home","#ff0080"));
    }

    toggleMenu()
    {
      this.showMenu=!this.showMenu;
    }
}
