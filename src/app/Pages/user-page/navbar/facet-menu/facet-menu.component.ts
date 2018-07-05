import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacetItem } from '../../../../Models/facet-item';
import { UrlChangeDetection } from '../../../../Parent-Classes/url-changes';
import { EditButtonService } from '../../../../Services/edit-button.service';
@Component({
  selector: 'facet-menu',
  template: 
  `
  <nav class="nav" (clickOutside)="onClickedOutside($event)">
    <div class="burger" [ngClass]="{'burger--active':showMenu}" (click)="toggleMenu()">
      <div class="burger__patty"></div>
    </div>
    <ul class="nav__list" [ngClass]="{'nav__list--active':showMenu}">
      <li *ngFor="let item of facetItems" class="nav__item">
        <facet-item [item]="item"></facet-item>
      </li>
    </ul>
  </nav>
  `,
  styleUrls: ['./facet-menu.component.scss','./original_style.scss']
})

export class FacetMenuComponent extends UrlChangeDetection implements OnInit
{
    constructor(private route : ActivatedRoute, private editService : EditButtonService){
      super(route);
    }

    showMenu : boolean = false;
    facetItems : FacetItem[];

    ngOnInit()
    {
      this.detectUidChanges();
      this.editService.change.subscribe( editButtonEvent=> this.handleEditButtonEvent(editButtonEvent));
    }

    loadOnUrlChange(params)
    {
      console.log("HTTP Call: Navbar loads uid:"+params.uid);
      this.facetItems=[];
      this.facetItems.push(
      new FacetItem("fa fa-camera-retro","photos","#00ffff"),
      new FacetItem("fa fa-user","home","#ff0080"),
      new FacetItem("fa fa-user","home1","#ff0080"),
      new FacetItem("fa fa-user","home2","#ff0080"),
      new FacetItem("fa fa-user","home3","#ff0080"),
      new FacetItem("fa fa-user","home4","#ff0080"),
      new FacetItem("fa fa-user","home5","#ff0080"),
      new FacetItem("fa fa-user","home6","#ff0080"),
      new FacetItem("fa fa-user","home7","#ff0080"),
      new FacetItem("fa fa-user","home8","#ff0080"),
      new FacetItem("fa fa-user","home9","#ff0080"),
      new FacetItem("fa fa-user","home10","#ff0080"),
    );
    }

    toggleMenu()
    {
      this.showMenu=!this.showMenu;
    }

    handleEditButtonEvent(editButtonStatus)
    {
      if(editButtonStatus)
        this.showMenu=true;
    }

    onClickedOutside($event)
    {
      if(!this.editService.editMode)
      this.showMenu=false;
    }
}
