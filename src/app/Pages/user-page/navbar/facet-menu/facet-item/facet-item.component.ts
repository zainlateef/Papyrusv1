import { Component, OnInit, Input } from '@angular/core';
import { FacetItem } from '../../../../../Models/facet-item';
import { EditButtonService } from '../../../../../Services/edit-button.service';
declare var $: any;

@Component({
  selector: 'facet-item',
  template: 
  ` <a [routerLink]="editMode ? null : [{facet : item.facet}]" class="nav__link">
      <div class="wrapper">
        <div class="icon_wrapper" (click)="editMode ? toggleEditExtraOptions($event) : null ">
          <i [ngStyle]="{'color':item.color}" [class]="item.iconName" [ngClass]="{'faa-float animated faa-fast': editMode}"></i>
        </div>
        <div class="editMenu" *ngIf="editMode" (clickOutside)=" editExtraOptions ? onClickedOutside($event) : null">
          <img src="/assets/images/close.png">
          <div class="editExtraOptions" *ngIf="editExtraOptions">
            <input class="iconSearchbar" placeholder="Search for an icon...">
              
            <button class="colorpicker" (colorPickerOpen)="colorPickerOpened(color)" [(colorPicker)]="color" (colorPickerChange)="setColor(color)"[style.background]="color" [cpPosition]="colorPickerOrientation" [cpDisableInput]="true"></button>
            <input class="tooltipInput" placeholder="Label" [value]="item.facet">
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
  colorPickerOrientation : string = "bottom";
  editMode : boolean = false;
  editExtraOptions : boolean = false;
  counter : number = 0;
  color : any;
  
  constructor(private editService : EditButtonService) {
  }

  ngOnInit() {
    this.editServiceSetup()
    this.color=this.item.color;
  }

  editServiceSetup()
  {
    this.editMode=this.editService.editMode;
    if(this.editMode)
    this.editExtraOptions=true;
    this.editService.change.subscribe( editButtonEvent => this.editMode=editButtonEvent );
  }

  toggleEditExtraOptions(mouseclick : MouseEvent)
  {
    console.log("this mouseclick: "+mouseclick.clientX+" "+mouseclick.clientY);
    this.editExtraOptions=!this.editExtraOptions;
  }

  onClickedOutside(e: Event) {
    if(this.editExtraOptions)
    {
      ++this.counter;
      if(this.counter > 1)
      {
        this.editExtraOptions=false;
        this.counter=0;
      }
    }
  }

  colorPickerOpened(color)
  {
    let el=$( '.color-picker' );
    let boundsOfColorPicker = el[0].getBoundingClientRect();
    console.log(this.isElementInViewport(boundsOfColorPicker));
    if(!this.isElementInViewport(boundsOfColorPicker))
      this.colorPickerOrientation="top";
    //reset the color picker
  }

  isElementInViewport(rectangle) 
  {
    return rectangle.top >= 0 && rectangle.left >= 0 && rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rectangle.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  setColor(color)
  {
    this.item.color=color;
  }

}
