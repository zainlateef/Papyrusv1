import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacetItem } from '../../../../Models/facet-item';
import { UrlChangeDetection } from '../../../../Parent-Classes/url-changes';
import { EditButtonService } from '../../../../Services/edit-button.service';
import { zoomIn } from 'ng-animate';
import { transition, trigger, useAnimation } from '@angular/animations';
@Component({
  selector: 'facet-menu',
  template: 
  `
  <nav class="nav" (clickOutside)="onClickedOutside($event)">
    <i *ngIf="pageOwner" class="editIcon" [ngClass]="editMode ? 'far fa-check-square':'fas fa-edit'" (click)="toggleEditMode()" [matTooltip]="!editMode? 'Edit your list' : 'Save list'" [matTooltipShowDelay]="1300"></i>
    <div class="burger" (click)="toggleMenu()" [ngClass]="{'burger--active':showMenu}" [ngStyle]="{'z-index': burgerZIndex}">
      <div class="burger__patty"></div>
    </div>
    <ul class="nav__list" [ngClass]="{'nav__list--active':showMenu}">
      <li *ngFor="let item of facetItems" class="nav__item">
        <facet-item [item]="item"></facet-item>
      </li>

      <li *ngIf="editMode" class="nav__item" [@zoomIn]="zoomIn">
        <a class="nav__link">
          <div class="wrapper">
            <div class="icon_wrapper">
              <i (click)="addNewFacet()" class="material-icons">add</i>
            </div>
          </div>
        </a>
      </li>
      
    </ul>
  </nav>
  `,
  styleUrls: ['./facet-menu.component.scss','./original_style.scss','./facet-item/facet-item.component.scss',],
  animations: [
    trigger('zoomIn', [transition('void => *', useAnimation(zoomIn, { params:{timing:0.15} } ))])
  ]
})

export class FacetMenuComponent extends UrlChangeDetection implements OnInit,OnDestroy
{
    constructor(private route : ActivatedRoute, private editService : EditButtonService){
      super(route);
    }
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (this.editMode && this.changesWereMade()) {
            $event.returnValue=true;
        }
    }
    zoomIn: any;
    subscription: any;
    showMenu : boolean = false;
    editMode : boolean = false;
    pageOwner : boolean = false;
    navStoppedEditService : boolean = false;
    facetItems : FacetItem[];
    burgerZIndex=2;
    oldList : string;


    ngOnInit()
    {
      this.detectUidChanges();
      this.editServiceSetup();
    }

    loadOnUrlChange(params)
    {
      //console.log("HTTP Call: Navbar loads uid:"+params.uid);
      this.facetItems=[];
      this.facetItems.push(
      new FacetItem("fa fa-user","home","#ff0080"),
      new FacetItem("fa fa-camera-retro","photos","#00ffff"),
      new FacetItem("fa fa-user","home","#ff0080"),
      new FacetItem("fa fa-user","home1","#ff0080"),
      new FacetItem("fa fa-user","home2","#ff0080"),
      new FacetItem("fa fa-user","home3","#ff0080"),
      // new FacetItem("fa fa-user","home4","#ff0080"),
      // new FacetItem("fa fa-user","home5","#ff0080"),
      // new FacetItem("fa fa-user","home6","#ff0080"),
      // new FacetItem("fa fa-user","home7","#ff0080"),
      // new FacetItem("fa fa-user","home8","#ff0080"),
      // new FacetItem("fa fa-user","home9","#ff0080"),
      // new FacetItem("fa fa-user","home10","#ff0080"),
    );
    this.oldList=JSON.stringify(this.facetItems);
    }
    
    toggleMenu()
    {
      this.showMenu=!this.showMenu;

      if(this.editMode)
      {
        this.navStoppedEditService=true;
        this.editService.toggle();
      }
    }

    toggleEditMode()
    {
      this.editService.toggle();
    }

    addNewFacet()
    {
      this.facetItems.push(new FacetItem("fa fa-user","","#000000"));
    }

    onClickedOutside($event)
    {
      if(!this.editMode)
      this.showMenu=false;
    }

    editServiceSetup()
    {
      this.pageOwner=this.editService.isPageOwner;
      this.editMode=this.editService.editMode;

      this.editService.pageOwnerStatus.subscribe( status => this.pageOwner=status);
      this.subscription=this.editService.editValueChange.subscribe( editButtonEvent => 
      {
        //console.log("this happens at startup");
        this.editMode=editButtonEvent;
        if(this.editMode)
          this.editModeIsOn();
        else
          this.editModeIsOff();
        
      });
    }

    editModeIsOn()
    {
      //console.log("editModeOn")
      this.showMenu=true
      this.burgerZIndex=0;
      this.oldList=JSON.stringify(this.facetItems);
    }

    editModeIsOff()
    {
      console.log("editModeOff"+ this.showMenu + this.editMode + this.changesWereMade())
      if( this.pageOwner && !this.navStoppedEditService && this.changesWereMade())
      {
        alert("navigating away");
      }
      else
      {
        this.burgerZIndex=2;
        if(this.navStoppedEditService)
        {
          if(this.changesWereMade())
            //console.log("fire the api call of "+this.uid);
          this.navStoppedEditService=false;
        }
      }
    }

    changesWereMade()
    {
      return !(JSON.stringify(this.facetItems)===this.oldList);
    }

    ngOnDestroy()
    {
      this.editModeIsOff();
      this.subscription.unsubscribe();
    }
}
