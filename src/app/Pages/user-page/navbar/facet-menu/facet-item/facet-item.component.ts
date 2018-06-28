import { Component, OnInit, Input } from '@angular/core';
import { FacetItem } from '../../../../../Models/facet-item';

@Component({
  selector: 'facet-item',
  template: 
  ` <a [routerLink]="[{facet : item.facet}]" class="nav__link">
      <fa class="icon faa-float animated faa-fast" [name]="item.iconName" [ngStyle]="{'color':item.color}"></fa>
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

  }

}
