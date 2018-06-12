import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../../../../Models/menu-item';
import { UrlChangeDetection } from '../../../../Parent-Classes/url-changes';
@Component({
  selector: 'facet-menu',
  template: 
  `
  <nav class="nav">
    <div class="burger" [ngClass]="{'burger--active':showMenu}" (click)="toggleMenu()">
      <div class="burger__patty"></div>
    </div>
    <ul class="nav__list" [ngClass]="{'nav__list--active':showMenu}">
      <li *ngFor="let item of menuItems" class="nav__item">
        <facet-item [item]="item"></facet-item>
      </li>
    </ul>
  </nav>
  `,
  styleUrls: ['./facet-menu.component.scss','./original_style.scss']
})

export class FacetMenuComponent extends UrlChangeDetection implements OnInit
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
