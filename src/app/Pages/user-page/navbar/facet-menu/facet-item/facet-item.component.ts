import { Component, OnInit, Input } from '@angular/core';
import { FacetItem } from '../../../../../Models/facet-item';
import { EditButtonService } from '../../../../../Services/edit-button.service';

@Component({
  selector: 'facet-item',
  template: 
  ` <a [routerLink]="editMode ? null : [{facet : item.facet}]" class="nav__link">
      <div class="wrapper">
        <i [ngStyle]="{'color':item.color}" (click)="editMode ? toggleEditMenu() : null " [class]="item.iconName" [ngClass]="{'faa-float animated faa-fast': editMode}"></i>
        <div class="editMenu" *ngIf="editMode" (clickOutside)=" editMenu ? onClickedOutside($event) : null">
          <img src="/assets/images/close.png">
          <input *ngIf="editMenu">
          <button *ngIf="editMenu" class="colorpicker" [(colorPicker)]="color" [style.background]="color" [cpPosition]="'bottom'" [cpDisableInput]="true"></button>
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
  editMenu : boolean = false;
  counter : number = 0;
  
  constructor(private editService : EditButtonService) {
  }

  ngOnInit() {
    this.editService.change.subscribe( editButtonEvent => this.editMode=editButtonEvent );
  }

  toggleEditMenu()
  {
    this.editMenu=!this.editMenu;
  }

  onClickedOutside(e: Event) {
    if(this.editMenu)
    {
      ++this.counter;
      if(this.counter > 1)
      {
        this.editMenu=false;
        this.counter=0;
      }
    }
  }

}
