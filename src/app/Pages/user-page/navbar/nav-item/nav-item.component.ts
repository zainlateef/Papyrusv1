import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../../../Models/menu-item';

@Component({
  selector: 'nav-item',
  template: 
  ` <a [routerLink]="['/feed','uid',{category : item.category}]" class="nav__link">
      <fa class="icon" [name]="item.iconName" [ngStyle]="{'color':item.color}"></fa>
    </a>
  `
  ,
  styleUrls: ['./nav-item.component.css','../original_style.scss']
})
export class NavItemComponent implements OnInit {

  @Input("item") item : MenuItem;
  
  constructor() { }

  ngOnInit() {
  }

}
