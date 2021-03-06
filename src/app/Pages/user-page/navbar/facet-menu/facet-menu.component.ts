import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacetItem } from '../../../../Models/facet-item';
import { UrlChangeDetection } from '../../../../Parent-Classes/url-changes';
import { EditButtonService } from '../../../../Services/edit-button.service';
import { zoomIn } from 'ng-animate';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Icon } from '../../../../Models/icon';
import { DragulaService } from 'ng2-dragula';
declare var $: any;
@Component({
  selector: 'facet-menu',
  template: 
  `
  <nav class="nav" (clickOutside)="onClickedOutside($event)">

    <i name="editButton" *ngIf="pageOwner && !editMode" class="fas fa-edit editIcon" (click)="toggleEditMode()" [matTooltip]="'Edit your list'"  [matTooltipShowDelay]="1300" [@zoomIn]="zoomIn"></i>

    <div class="burger" (click)="toggleMenu()" [ngClass]="{'burger--active':showMenu && !editMode, 'checkmark':showMenu && editMode}" [ngStyle]="{'z-index': burgerZIndex}" [matTooltipDisabled]="!editMode" [matTooltip]="'Save your list'"  [matTooltipShowDelay]="600" [matTooltipPosition]="'right'">
      <div class="burger__patty"></div>
    </div>

    <div class="main_flex" [ngClass]="{'main_flex--edit':editMode}">

      <ul *ngIf="showMenu" name="mobileFrostedBackground" class="frosted_glass nav__list" [ngClass]="{'nav__list--active':showMenu}"><li *ngFor="let item of facetItems" class="nav__item"></li></ul>

      <ul name="listOfItems" class="nav__list" [ngClass]="{'nav__list--active':showMenu}" dragula="DragMe" [(dragulaModel)]="facetItems">
        <li *ngFor="let item of facetItems" class="nav__item">
          <facet-item [item]="item"></facet-item>
        </li>
      </ul>
      
      <li name="addButton" *ngIf="editMode">
        <a class="nav__link add_button" [@zoomIn]="zoomIn">
          <div class="wrapper">
            <div class="icon_wrapper">
              <i (click)="addNewFacet()" class="material-icons">add</i>
            </div>
          </div>
        </a>
      </li>

     </div>

  </nav>
  `,
  styleUrls: ['./facet-menu.component.scss','./original_style.scss','./facet-item/facet-item.component.scss',],
  animations: [
    trigger('zoomIn', [transition('void => *', useAnimation(zoomIn, { params:{timing:0.15} } ))])
  ]
})

export class FacetMenuComponent extends UrlChangeDetection implements OnInit,OnDestroy
{
  constructor(private route : ActivatedRoute, private editService : EditButtonService, private dragulaService : DragulaService){
    super(route);	 
    const bag: any = this.dragulaService.find('DragMe');
    if (bag !== undefined ) this.dragulaService.destroy('DragMe');
    this.dragulaService.setOptions('DragMe', {	
      accepts: (el, target, source, sibling) => { return this.determineIfDraggable(source,el)},	
      moves: (el, target, source, sibling) => { return this.determineIfDraggable(source,el)}	
    });	
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
      if (this.editMode && this.changesWereMade()) {
        //Disabled for production
        //$event.returnValue=true;
      }
  }

  facetItems : FacetItem[];
  showMenu : boolean = false;
  navButtonWasClicked : boolean = false;
  editMode : boolean = false;
  oldList : string;
  pageOwner : boolean = false;
  burgerZIndex=2;
  zoomIn: any;
  subscription: any;


  ngOnInit()
  {
    this.detectUidChanges();
    this.editServiceSetup();
  }

  loadOnUrlChange(params)
  {
    console.log("HTTP Call: Navbar loads uid:"+params.uid);
    this.facetItems=[];
    this.facetItems.push(
    new FacetItem(new Icon("user","fa fa-user"),"home","#ff0080"),
    new FacetItem(new Icon("camera-retro","fa fa-camera-retro"),"photos","#00ffff"),
    new FacetItem(new Icon("user","fa fa-user"),"home1","#ff0080"),
    new FacetItem(new Icon("user","fa fa-user"),"home2","#ff0080"),
    new FacetItem(new Icon("user","fa fa-user"),"home3","#ff0080"),
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
      this.navButtonWasClicked=true;
      this.editService.toggle();
    }
  }

  onClickedOutside($event)
  {
    if(!this.editMode)
    this.showMenu=false;
  }

  toggleEditMode()
  {
    this.editService.toggle();
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
    this.editService.requestsForListOfLabels.subscribe( request => this.sendListOfLabels())
    this.editService.deletion.subscribe( deletion => this.itemDeletionHasOccurred());
  }

  editModeIsOn()
  {
    console.log("editModeOn")
    this.showMenu=true
    this.burgerZIndex=0;
    this.oldList=JSON.stringify(this.facetItems);
  }

  editModeIsOff()
  {
    this.handleListChanges();
    this.burgerZIndex=2;
  }

  sendListOfLabels()
  {
    this.editService.listOfLabels.emit(JSON.stringify(this.facetItems.map( x => x.label)));
  }

  itemDeletionHasOccurred() 
  {
    this.facetItems.forEach((x) =>
    {
      if(x.label==="DELETE_ME")
        this.facetItems.splice(this.facetItems.indexOf(x),1);
    })
  }

  handleListChanges()
  {
    if(this.navButtonWasClicked)
    {
      this.navButtonWasClicked=false;
      if(this.changesWereMade())
        console.log("fire the api call of "+this.uid);
      this.oldList=JSON.stringify(this.facetItems);
    }
    else
    {
      this.checkUnsavedChangesBeforePageNavigation();
    }
  }

  checkUnsavedChangesBeforePageNavigation()
  {
    if( this.pageOwner && this.changesWereMade())
    {
      if (confirm("Save the changes to your list?")) 
      {
        console.log(this.uid+" saved his changes");
        console.log("Send the list to the API");
      } 
      else 
      {
        console.log(this.uid+" declined his changes");
        this.facetItems=JSON.parse(this.oldList);
        console.log("Here now"+JSON.stringify(this.facetItems));
      }
    }
  }

  changesWereMade()
  {
    return !(JSON.stringify(this.facetItems)===this.oldList);
  }

  addNewFacet()
  {
    let defaultColor="red";
    this.facetItems.push(new FacetItem(new Icon("user","fa fa-user"),"",defaultColor));
  }

  determineIfDraggable(source,element) : boolean	
  {	
    if(!this.editMode)	
      return false;	
    else	
    {	
      let sourceIsInEditMenu=false	
      $(".nondraggable").each((x) => {	
        if($.contains($(".nondraggable")[x],source))	
          sourceIsInEditMenu=true;	
      });	
      if( sourceIsInEditMenu )	
        return false;	
      else	
        return true;	
        
    }	
  }

  ngOnDestroy()
  {
    this.editModeIsOff();
    this.subscription.unsubscribe();
  }
}
