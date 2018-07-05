import { Component, OnInit, Input } from '@angular/core';
import { FacetItem } from '../../../../../Models/facet-item';
import { EditButtonService } from '../../../../../Services/edit-button.service';

@Component({
  selector: 'facet-item',
  template: 
  ` <a [routerLink]="editMode? null : [{facet : item.facet}]" class="nav__link">
      <div class="wrapper">
        <i [class]="item.iconName" [ngClass]="{'faa-float animated faa-fast': editMode}" [ngStyle]="{'color':item.color}"></i>
        <div class="editMenu" *ngIf="editMode">
          <img src="/assets/images/close.png">
          <input>
          <button class="colorpicker" [(colorPicker)]="color" [style.background]="color" [cpPosition]="'bottom'" [cpDisableInput]="true"></button>
        </div>
      </div>
    </a>
  `
  ,
  styleUrls: ['./facet-item.component.scss','../original_style.scss']
})
export class FacetItemComponent implements OnInit {

  @Input("item") item : FacetItem;
  editMode : boolean = false;
  
  constructor(private editService : EditButtonService) {
  }

  ngOnInit() {
    this.editService.change.subscribe( editButtonEvent => this.editMode=editButtonEvent );
  }

}
