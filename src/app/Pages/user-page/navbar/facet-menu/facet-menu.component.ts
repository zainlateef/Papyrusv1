import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacetItem } from '../../../../Models/facet-item';
import { UrlChangeDetection } from '../../../../Parent-Classes/url-changes';
import { EditButtonService } from '../../../../Services/edit-button.service';
@Component({
  selector: 'facet-menu',
  template: 
  `
  <nav class="nav">
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
      editService.change.subscribe(console.log("Edit button reached in facetmenu"));
    }

    showMenu : boolean = false;
    facetItems : FacetItem[];

    ngOnInit()
    {
      this.detectUidChanges();
    }

    loadOnUrlChange(params)
    {
      console.log("HTTP Call: Navbar loads uid:"+params.uid);
      this.facetItems=[];
      this.facetItems.push(new FacetItem("camera-retro","photos","#00ffff"),new FacetItem("user","home","#ff0080"));
    }

    toggleMenu()
    {
      this.showMenu=!this.showMenu;
    }
}
