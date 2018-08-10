import { Component, OnInit, Input } from '@angular/core';
import { FacetItem } from '../../../../../Models/facet-item';
import { EditButtonService } from '../../../../../Services/edit-button.service';
import { Router, ActivatedRoute } from '../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'facet-item',
  template: 
  ` <a (click)="routeToFacet();toggleFullEditMenu($event)" class="nav__link" (mouseover)="tooltip.show()" (mouseleave)="tooltip.hide()">
      <div class="wrapper">
        <div class="icon_wrapper" #tooltip="matTooltip" [matTooltip]="item.label" [matTooltipDisabled]="editMode" [matTooltipPosition]="'right'">
          <i [ngStyle]="{'color':item.color}" [class]="item.icon.iconFullName" [ngClass]="{'faa-float animated faa-fast': editMode}"></i>
        </div>
        <edit-menu [item]="item" [(showFullEditMenu)]="showFullEditMenu"></edit-menu>
      </div>
    </a>
  `
  ,
  styleUrls: ['./facet-item.component.scss','../original_style.scss']
})
export class FacetItemComponent implements OnInit {
  @Input("item") item : FacetItem;
  editMode : boolean;
  showFullEditMenu : boolean = false;

  constructor(
    private editService : EditButtonService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editServiceSetup()
  }

  routeToFacet()
  {
    if(!this.editMode)
    this.router.navigate([{facet : this.item.label}], { relativeTo: this.route });
  }

  editServiceSetup()
  {
    this.editMode=this.editService.editMode;
    this.editService.editValueChange.subscribe( editButtonEvent => this.editMode=editButtonEvent );
  }

  toggleFullEditMenu(mouseclick : MouseEvent)
  {
    console.log("Clicked");
    if(this.editMode)
    {
      if(this.editService.deleteItem)
      {
        this.item.label="DELETE_ME";
        this.editService.deleteItem=false;
        this.editService.deletion.emit(true);
      }
      else
        this.showFullEditMenu=true;
    }
    else
    this.showFullEditMenu=false;
  }

}
