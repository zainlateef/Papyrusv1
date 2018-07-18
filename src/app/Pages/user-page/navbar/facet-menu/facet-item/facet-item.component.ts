import { Component, OnInit, Input } from '@angular/core';
import { FacetItem } from '../../../../../Models/facet-item';
import { EditButtonService } from '../../../../../Services/edit-button.service';
import { FormControl } from '@angular/forms';
import { IconSearchResult } from '../../../../../Models/icon-search-result';
declare var $: any;

@Component({
  selector: 'facet-item',
  template: 
  ` <a [routerLink]="editMode ? null : [{facet : item.facet}]" class="nav__link">
      <div class="wrapper">
        <div class="icon_wrapper" (click)="toggleEditExtraOptions($event)">
          <i [ngStyle]="{'color':item.color}" [class]="item.iconName" [ngClass]="{'faa-float animated faa-fast': editMode}"></i>
        </div>
        <div class="editMenu" *ngIf="editMode" (clickOutside)="onClickedOutside($event)">
          <img src="/assets/images/close.png">
          <div class="editExtraOptions" *ngIf="editExtraOptions">
            <input class="iconSearchbar" placeholder="Search for an icon..." type="search" [formControl]="search">
            <ul class="iconSearchResults">
              <li *ngFor="let icon of iconMatches">
                <div class="listWrapper">
                  <i [class]="icon.iconFullName"></i>
                  <div class="nickname">{{icon.iconNickname}}</div>
                </div>
              </li>
            </ul>
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
  search : FormControl;
  colorPickerOrientation : string = "bottom";
  editMode : boolean = false;
  editExtraOptions : boolean = false;
  counter : number = 0;
  color : any;
  subscription : any;
  iconMatches : Set<IconSearchResult> = new Set;
  iconDatabase : Array<IconSearchResult> = new Array;
  
  constructor(private editService : EditButtonService) {
  }

  ngOnInit() {
    this.editServiceSetup()
    this.initializeForm();
    this.initializeDummyData();
    this.color=this.item.color;
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
    let icon1=new IconSearchResult("cog","fas fa-cog")
    let icon2=new IconSearchResult("plane","fas fa-plane")
    let icon3=new IconSearchResult("archive","fas fa-archive")
    this.iconDatabase.push(icon1,icon2,icon3);
  }

  onFormChange(term: any) {
    //HTTP call returns set of users. All this logic will be rewritten and optimized
    console.log("HTTP Call:Query this parameter"+term);
    this.iconMatches.clear();
    if(term!=="")
    {
      this.iconDatabase.filter( icon => {
        if(icon.iconNickname.toUpperCase().includes(term.toUpperCase()))
          this.iconMatches.add(icon);
      });
    }
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
    if(this.editMode)
    {
      console.log("this mouseclick: "+mouseclick.clientX+" "+mouseclick.clientY);
      this.editExtraOptions=!this.editExtraOptions;
    }
    else
    this.editExtraOptions=false;
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
