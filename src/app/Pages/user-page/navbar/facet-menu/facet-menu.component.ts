import { Component, OnInit, OnDestroy } from '@angular/core';
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
    <i *ngIf="!editModeTrue && pageOwner" class="fas fa-edit editIcon" (click)="toggleEditMode()" matTooltip="Edit your list" [matTooltipShowDelay]="1300"></i>
    <div class="burger" (click)="toggleMenu()" [ngClass]="{'burger--active':showMenu}" [ngStyle]="{'z-index': burgerZIndex}">
      <div class="burger__patty"></div>
    </div>
    <ul class="nav__list" [ngClass]="{'nav__list--active':showMenu}">
      <li *ngFor="let item of facetItems" class="nav__item">
        <facet-item [item]="item"></facet-item>
      </li>
      <li *ngIf="editModeTrue" class="nav__item" [@zoomIn]="zoomIn">
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

export class FacetMenuComponent extends UrlChangeDetection implements OnInit
{
    constructor(private route : ActivatedRoute, private editService : EditButtonService){
      super(route);
    }
    zoomIn: any;
    showMenu : boolean = false;
    facetItems : FacetItem[];
    editModeTrue : boolean = false;
    pageOwner : boolean = false;
    burgerZIndex=2;


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
    }
    
    toggleMenu()
    {
      if(this.editModeTrue)
      this.editService.toggle();

      this.showMenu=!this.showMenu;
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
      if(!this.editModeTrue)
      this.showMenu=false;
    }

    editServiceSetup()
    {
      this.editModeTrue=this.editService.editMode;
      this.editService.editValueChange.subscribe( editButtonEvent => 
      {
        this.editModeTrue=editButtonEvent;
        if(this.editModeTrue)
        {
          this.showMenu=true
          this.burgerZIndex=0;
          this.facetItems.push
        }
        else
        {
          this.burgerZIndex=2
        }
        
      });
      this.pageOwner=this.editService.isPageOwner;
      this.editService.pageOwnerStatus.subscribe( status => this.pageOwner=status);
    }
}
