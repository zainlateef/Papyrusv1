import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Icon } from '../../../../../../Models/icon';
import { FormControl } from '@angular/forms';
import { FacetItem } from '../../../../../../Models/facet-item';
import { EditButtonService } from '../../../../../../Services/edit-button.service';
declare var $: any;

@Component({
  selector: 'edit-menu',
  template:
  `
    <div class="editMenu" *ngIf="editMode" (clickOutside)="onClickedOutside($event)">
      <img src="/assets/images/close.png">
      <div class="fullEditMenu" *ngIf="showFullEditMenuValue">
        <input class="iconSearchbar" placeholder="Search for an icon" type="search" [formControl]="search">
        <ul class="iconSearchResults">
          <li *ngFor="let icon of iconMatches">
            <div class="listWrapper">
              <i [class]="icon.iconFullName"></i>
              <div class="nickname">{{icon.iconNickname}}</div>
            </div>
          </li>
        </ul>
        <button class="colorpicker" (colorPickerOpen)="colorPickerOpened(color)" [(colorPicker)]="color" (colorPickerChange)="setColor(color)"[style.background]="color" [cpPosition]="colorPickerOrientation" [cpDisableInput]="true"></button>
        <input class="labelInput" placeholder="Label" [value]="item.label">
      </div>
    </div>
  `,
  styleUrls: ['./edit-menu.component.scss','../../original_style.scss']
})
export class EditMenuComponent implements OnInit {
  
  @Input("item") item : FacetItem;

  showFullEditMenuValue : boolean=false;

  @Output() showFullEditMenuChange = new EventEmitter<boolean>();

  @Input("showFullEditMenu")
  get showFullEditMenu()
  {
    return this.showFullEditMenuValue;
  }
  set showFullEditMenu(val) {
    this.showFullEditMenuValue = val;
    this.showFullEditMenuChange.emit(this.showFullEditMenuValue);
    console.log("set to:"+this.showFullEditMenu)
  }

  search : FormControl;
  colorPickerOrientation : string = "bottom";
  editMode : boolean = false;
  color : any;
  iconMatches : Set<Icon> = new Set;
  iconDatabase : Array<Icon> = new Array;
  subscription : any;
  counter : number = 0;

  constructor(private editService : EditButtonService) { }

  ngOnInit() {
    this.editServiceSetup();
    this.initializeForm();
    this.initializeDummyData();
    this.color=this.item.color;
  }
  
  editServiceSetup()
  {
    this.editMode=this.editService.editMode;
    if(this.editMode)
    this.showFullEditMenuValue=true;
    this.editService.editValueChange.subscribe( editButtonEvent => this.editMode=editButtonEvent );
  }

  onFormChange(term: any) {
    //HTTP call returns set of users. All this logic will be rewritten and optimized
    //console.log("HTTP Call:Query this parameter"+term);
    this.iconMatches.clear();
    if(term!=="")
    {
      this.iconDatabase.filter( icon => {
        if(icon.iconNickname.toUpperCase().includes(term.toUpperCase()))
          this.iconMatches.add(icon);
      });
    }
  }

  colorPickerOpened(color)
  {
    let el=$( '.color-picker' );
    let boundsOfColorPicker = el[0].getBoundingClientRect();
    //console.log(this.isElementInViewport(boundsOfColorPicker));
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

  onClickedOutside(e: Event) {
    if(this.showFullEditMenu)
    {
      console.log("pass");
      ++this.counter;
      if(this.counter > 1)
      {
        this.showFullEditMenu=false;
        this.counter=0;
      }
    }
    else
    this.counter=0;
  }

  initializeForm() 
  {
    this.search=new FormControl();
    this.subscription=this.search.valueChanges
        .debounceTime(200)
        .distinctUntilChanged()
        .subscribe( term => {
            this.onFormChange(term);
        });
  }

  initializeDummyData()
  {
    let icon1=new Icon("cog","fas fa-cog")
    let icon2=new Icon("plane","fas fa-plane")
    let icon3=new Icon("archive","fas fa-archive")
    this.iconDatabase.push(icon1,icon2,icon3);
  }

}
