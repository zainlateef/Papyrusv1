import { Component, OnInit, Input } from '@angular/core';
import { FacetItem } from '../../../../../Models/facet-item';

@Component({
  selector: 'facet-item',
  template: 
  ` <a [routerLink]="[{facet : item.facet}]" class="nav__link">
      <div>
        <i [class]="item.iconName" [ngClass]="{'faa-float animated faa-fast': editMode}" [ngStyle]="{'color':item.color}"></i>
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
