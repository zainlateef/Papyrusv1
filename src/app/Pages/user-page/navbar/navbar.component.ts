import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../../../Models/menu-item';
@Component({
  selector: 'navbar',
  template: 
  `<nav class="nav">
      <div class="burger" [ngClass]="{'burger--active':showMenu}" (click)="toggleMenu()">
        <div class="burger__patty"></div>
      </div>
      <ul class="nav__list" [ngClass]="{'nav__list--active':showMenu}">
        <li *ngFor="let item of menuItems" class="nav__item">
          <a href="#1" class="nav__link"><fa class="icon" [name]="item.iconName"></fa></a>
        </li>
      </ul>
  </nav>`,
  styleUrls: ['./navbar.component.css','./original_style.scss']
})

export class NavbarComponent implements OnInit,OnDestroy
{
    constructor(private route : ActivatedRoute){}

    showMenu : boolean = false;
    routeSubscription : any;
    uid : string;
    menuItems : MenuItem[];

    ngOnInit()
    {
      this.routeSubscription=this.route.params.subscribe( params => 
      {
        if(this.uid!=params.uid)
        {
          this.uid=params.uid
          this.loadItems();
        }
      })
    }

    loadItems()
    {
      console.log("Navbar loads uid:"+this.uid);
      this.menuItems=[];
      let item=new MenuItem("camera-retro","photos","yellow");
      for(let i=0;i<10;i++)
      this.menuItems.push(item);
      // this.menuItems.push(new MenuItem("camera-retro","photos","yellow"),new MenuItem("user","home","blue"));
    }

    toggleMenu()
    {
      this.showMenu=!this.showMenu;
    }

    ngOnDestroy()
    {
      this.routeSubscription.unsubscribe();
    }
}
