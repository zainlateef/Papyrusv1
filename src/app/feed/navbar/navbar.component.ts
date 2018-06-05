import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'navbar',
  template: 
  `<nav class="nav">
      <div class="burger" [ngClass]="{'burger--active':showMenu}" (click)="toggleMenu()">
        <div class="burger__patty"></div>
      </div>
      <ul class="nav__list" [ngClass]="{'nav__list--active':showMenu}">
        <li class="nav__item">
          <a href="#1" class="nav__link c-blue"><fa name="camera-retro"></fa></a>
        </li>
        <li class="nav__item">
          <a href="#2" class="nav__link c-yellow scrolly"><i class="fa fa-bolt"></i></a>
        </li>
        <li class="nav__item">
          <a href="#3" class="nav__link c-red"><i class="fa fa-music"></i></a>
        </li>
        <li class="nav__item">
          <a href="#4" class="nav__link c-green"><i class="fa fa-paper-plane"></i></a>
        </li>
      </ul>
  </nav>`,
  styleUrls: ['./navbar.component.css','./original_style.scss']
})

export class NavbarComponent implements OnInit
{
    showMenu : boolean = false;
    constructor(private route : ActivatedRoute)
    {}
    ngOnInit()
    {
      
    }

    toggleMenu()
    {
      this.showMenu=!this.showMenu;
    }
}
