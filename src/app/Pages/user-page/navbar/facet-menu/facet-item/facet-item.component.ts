import { Component, OnInit, Input } from '@angular/core';
import { FacetItem } from '../../../../../Models/facet-item';

@Component({
  selector: 'facet-item',
  template: 
  ` <a [routerLink]="[{facet : item.facet}]" class="nav__link">
      <div class="wrapper">
        <i [class]="item.iconName" [ngClass]="{'faa-float animated faa-fast': editMode}" [ngStyle]="{'color':item.color}"></i>
        <div class="editMenu">
          <img src="/assets/images/error.svg">
          <input>
          <button class="colorpicker" [(colorPicker)]="color" [style.background]="color" [cpPosition]="'bottom'" [cpDisableInput]="true"></button>        </div>
      </div>
    </a>
  `
  ,
  styleUrls: ['./facet-item.component.scss','../original_style.scss']
})
export class FacetItemComponent implements OnInit {

  @Input("item") item : FacetItem;
  @Input("editMode") editMode : boolean;
  
  constructor() {
  }

  ngOnInit() {
    this.editMode=false;
  }

}
