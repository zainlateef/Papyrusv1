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
    <div class="editMenu nondraggable" *ngIf="editMode" (clickOutside)="onClickedOutside($event)">
      <img (click)="deleteItem()"src="/assets/images/close.png" [matTooltip]="'Delete this page'" [matTooltipShowDelay]="'500'">
      <div class="fullEditMenu" *ngIf="showFullEditMenuValue">
        <input class="iconSearchbar" placeholder="Search for an icon" type="search" [formControl]="iconSearchbar" [value]="iconSearchValue">
        <ul class="iconSearchResults">
          <li *ngFor="let icon of iconMatches" (click)="iconSelected(icon)">
            <div class="listWrapper">
              <i [class]="icon.iconFullName"></i>
              <div class="nickname">{{icon.iconNickname}}</div>
            </div>
          </li>
        </ul>
        <button class="colorpicker" (colorPickerOpen)="colorPickerOpened(color)" [(colorPicker)]="color" (colorPickerChange)="setColor(color)"[style.background]="color" [cpPosition]="colorPickerOrientation" [cpDisableInput]="true"></button>
        <input  class="labelInput" placeholder="Label" [formControl]="labelInput" [value]="item.label" [ngClass]="{'redBorder' : labelIsEmpty || labelIsNotUnique }">
        <div class="errorMessage mat-tooltip" *ngIf="labelIsEmpty || labelIsNotUnique">{{labelErrorMessage()}}</div>
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
    if(!this.showFullEditMenuValue)
      this.iconMatches.clear();
    console.log("set to:"+this.showFullEditMenu)
  }

  iconSearchbar : FormControl;
  labelInput : FormControl;
  labelIsEmpty : boolean = false;
  labelIsNotUnique : boolean = false;
  iconSearchValue : string = "";
  colorPickerOrientation : string = "bottom";
  editMode : boolean = false;
  color : any;
  iconMatches : Set<Icon> = new Set;
  iconDatabase : Array<Icon> = new Array;
  counter : number = 0;
  clickOutsideProtection = false;

  constructor(private editService : EditButtonService) { }

  ngOnInit() {
    this.editServiceSetup();
    this.initializeForms();
    this.initializeDummyData();
    this.color=this.item.color;
  }
  
  editServiceSetup()
  {
    this.editMode=this.editService.editMode;
    if(this.editMode)
    this.showFullEditMenuValue=true; //must be showFullEditMenuValue instead of showFullEditMenu because of a chrome bug
    this.editService.editValueChange.subscribe( editButtonEvent => this.editMode=editButtonEvent );
    this.editService.listOfLabels.subscribe(labels => this.checkIfLabelIsUnique(JSON.parse(labels)));
  }

  iconSelected(icon : Icon)
  {
    this.item.icon=icon;
    this.iconSearchValue=this.item.icon.iconNickname;
    this.iconMatches.clear();
    this.clickOutsideProtection=true;
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
    else
      this.iconMatches.clear();
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
    if(this.clickOutsideProtection)
      this.clickOutsideProtection=false;
    else if(this.showFullEditMenu)
    {
      ++this.counter;
      if(this.counter > 1)
      {
        this.closeEditMenu();
      }
    }
    else
    this.counter=0;
  }

  deleteItem()
  {
    this.editService.deleteItem=true;
  }

  closeEditMenu()
  {
    this.showFullEditMenu=false;
    this.counter=0;
    this.iconSearchValue="";
  }

  initializeForms() 
  {
    this.iconSearchbar=new FormControl();
    this.iconSearchbar.valueChanges
        .debounceTime(200)
        .distinctUntilChanged()
        .subscribe( term => {
            this.onFormChange(term);
        });

    this.labelInput=new FormControl();
    this.labelInput.valueChanges
        .distinctUntilChanged()
        .subscribe( input => {
          this.item.label=input
          this.checkIfLabelIsEmpty(input);
          this.requestAllLabels(input);
        });
  }

  checkIfLabelIsEmpty(input)
  {
    if(input==="")
      this.labelIsEmpty=true;
    else
      this.labelIsEmpty=false;
  }

  requestAllLabels(input)
  {
    this.editService.requestsForListOfLabels.emit(true);
  }

  checkIfLabelIsUnique(labels)
  {
    let counter=0;
    for (var i in labels) {
      if (this.item.label===labels[i] && labels[i]) 
      {
          ++counter;
          if(counter > 1)
          {
            this.labelIsNotUnique=true;
            return false;
          }
      }
    }
    this.labelIsNotUnique=false;
    return true;
  }

  initializeDummyData()
  {
    let icon1=new Icon("cog","fas fa-cog")
    let icon2=new Icon("plane","fas fa-plane")
    let icon3=new Icon("archive","fas fa-archive")
    let icon4=new Icon("500px","fab fa-500px")
    this.iconDatabase.push(icon1,icon2,icon3,icon4);
  }

  labelErrorMessage()
  {
    if(this.labelIsEmpty)
      return "You have to name your page";
    else
      return "Can't use the same name twice"
  }

}
