import { Component, OnInit, Input } from '@angular/core';
import { FacetItem } from '../../../../../Models/facet-item';

@Component({
  selector: 'facet-item',
  template: 
  ` <a [routerLink]="[{facet : item.facet}]" class="nav__link">
      <fa class="icon" [ngClass]="{'faa-float animated faa-fast': editMode}" [name]="item.iconName" [ngStyle]="{'color':item.color}"></fa>
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
