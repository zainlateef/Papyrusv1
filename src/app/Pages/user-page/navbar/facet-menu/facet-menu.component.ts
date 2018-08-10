import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacetItem } from '../../../../Models/facet-item';
import { UrlChangeDetection } from '../../../../Parent-Classes/url-changes';
import { EditButtonService } from '../../../../Services/edit-button.service';
import { zoomIn } from 'ng-animate';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Icon } from '../../../../Models/icon';
import { DragulaService } from '../../../../../../node_modules/ng2-dragula';
@Component({
  selector: 'facet-menu',
  template: 
  `
  <nav class="nav" (clickOutside)="onClickedOutside($event)">
    <i *ngIf="pageOwner && !editMode" class="fas fa-edit editIcon" (click)="toggleEditMode()" [matTooltip]="'Edit your list'"  [matTooltipShowDelay]="1300" [@zoomIn]="zoomIn"></i>
    <div class="burger" (click)="toggleMenu()" [ngClass]="{'burger--active':showMenu && !editMode, 'checkmark':showMenu && editMode}" [ngStyle]="{'z-index': burgerZIndex}" [matTooltipDisabled]="!editMode" [matTooltip]="'Save your list'"  [matTooltipShowDelay]="600" [matTooltipPosition]="'right'">
      <div class="burger__patty"></div>
    </div>

    <ul class="frosted_glass nav__list" [ngClass]="{'nav__list--active':showMenu}"><li *ngFor="let item of facetItems" class="nav__item"></li></ul>

    <ul class="nav__list" [ngClass]="{'nav__list--active':showMenu}" dragula="DragMe" [(dragulaModel)]="facetItems">
      <li *ngFor="let item of facetItems" class="nav__item">
        <facet-item [item]="item"></facet-item>
      </li>
      <li *ngIf="editMode" class="nav__item ignore-drag" [@zoomIn]="zoomIn">
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
    constructor(private route : ActivatedRoute, 
                private editService : EditButtonService,
                private dragulaService : DragulaService){
      super(route);
    }
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (this.editMode && this.changesWereMade()) {
          //Disabled for production
          //$event.returnValue=true;
        }
    }
    zoomIn: any;
    subscription: any;
    showMenu : boolean = false;
    editMode : boolean = false;
    pageOwner : boolean = false;
    navButtonClicked : boolean = false;
    facetItems : FacetItem[];
    burgerZIndex=2;
    oldList : string;


    ngOnInit()
    {
      this.detectUidChanges();
      this.editServiceSetup();
      this.dragulaSetup();
    }

    dragulaSetup()
    {
      const bag: any = this.dragulaService.find('DragMe');
      if (bag !== undefined ) console.log(this.dragulaService.destroy('DragMe'));
      //if(this.editMode)
     // {
        console.log("here");
        this.dragulaService.setOptions('DragMe', {
          //the problem is with ignore drag. i see now. i'll have to delve into this further
          moves: (el, source, handle, sibling) => !el.classList.contains('ignore-drag'),
        });
     // }
      // else
      // {
      //   console.log("now here");
      //   this.dragulaService.setOptions('DragMe', {
      //     moves: (el, source, handle, sibling) => false,
      //     accepts: (el, target) => false
      //   });
      // }
    }

    loadOnUrlChange(params)
    {
      //console.log("HTTP Call: Navbar loads uid:"+params.uid);
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
        this.navButtonClicked=true;
        this.editService.toggle();
      }
    }

    toggleEditMode()
    {
      this.editService.toggle();
    }

    addNewFacet()
    {
      this.facetItems.push(new FacetItem(new Icon("user","fa fa-user"),"","#000000"));
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
      this.editService.requestsForListOfLabels.subscribe( request => this.sendListOfLabels())
      this.editService.deletion.subscribe( deletion => this.itemDeletionHasOccurred());
      this.editService.pageOwnerStatus.subscribe( status => this.pageOwner=status);
      this.subscription=this.editService.editValueChange.subscribe( editButtonEvent => 
      {
        //console.log("this happens at startup");
        this.editMode=editButtonEvent;
        this.dragulaSetup();
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
      if(this.navButtonClicked)
      {
        this.navButtonClicked=false;
        if(this.changesWereMade())
          console.log("fire the api call of "+this.uid);
        this.oldList=JSON.stringify(this.facetItems);
      }
      else
      {
        this.checkForUnsavedChangesBeforeClosing();
      }
      this.burgerZIndex=2;
      
    }

    checkForUnsavedChangesBeforeClosing()
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

    sendListOfLabels()
    {
      this.editService.listOfLabels.emit(JSON.stringify(this.facetItems.map( x => x.label)));
    }

    itemDeletionHasOccurred() 
    {
      this.facetItems.forEach((x)=>
      {
        if(x.label==="DELETE_ME")
          this.facetItems.splice(this.facetItems.indexOf(x),1);
      })
    }

    ngOnDestroy()
    {
      this.editModeIsOff();
      this.subscription.unsubscribe();
    }
}
