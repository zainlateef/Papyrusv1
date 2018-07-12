import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FacetItem } from '../../../../../Models/facet-item';
import { EditButtonService } from '../../../../../Services/edit-button.service';
declare var $: any;

@Component({
  selector: 'facet-item',
  template: 
  ` <a [routerLink]="editMode ? null : [{facet : item.facet}]" class="nav__link">
      <div class="wrapper">
        <i [ngStyle]="{'color':item.color}" (click)="editMode ? toggleEditOptions($event) : null " [class]="item.iconName" [ngClass]="{'faa-float animated faa-fast': editMode}"></i>
        <div class="editMenu" *ngIf="editMode" (clickOutside)=" editOptions ? onClickedOutside($event) : null">
          <img src="/assets/images/close.png">
          <div class="editOptions" *ngIf="editOptions">
            <input>
            <button class="colorpicker" (colorPickerOpen)="colorPickerOpened(color)" [(colorPicker)]="color" [style.background]="color" [cpPosition]="colorPickerOrientation" [cpDisableInput]="true"></button>
          </div>
        </div>
      </div>
    </a>
  `
  ,
  styleUrls: ['./facet-item.component.scss','../original_style.scss']
})
export class FacetItemComponent implements OnInit {
  @Input("item") item : FacetItem;
  colorPickerOrientation : string;
  editMode : boolean = false;
  editOptions : boolean = false;
  counter : number = 0;
  
  constructor(private editService : EditButtonService) {
  }

  ngOnInit() {
    this.editService.change.subscribe( editButtonEvent => this.editMode=editButtonEvent );
  }

  toggleEditOptions(mouseclick : MouseEvent)
  {
    console.log("this mouseclick: "+mouseclick.clientX+" "+mouseclick.clientY);
    this.editOptions=!this.editOptions;
  }

  onClickedOutside(e: Event) {
    if(this.editOptions)
    {
      ++this.counter;
      if(this.counter > 1)
      {
        this.editOptions=false;
        this.counter=0;
      }
    }
  }

  colorPickerOpened(color)
  {
    let el=$( '.color-picker' );
    let boundsOfColorPicker = el[0].getBoundingClientRect();
    console.log(this.isElementInViewport(boundsOfColorPicker));
    if(this.isElementInViewport(boundsOfColorPicker))
      this.colorPickerOrientation="bottom";
    else
      this.colorPickerOrientation="top";
  }

  isElementInViewport(rectangle) 
  {
    return rectangle.top >= 0 && rectangle.left >= 0 && rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rectangle.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

}
