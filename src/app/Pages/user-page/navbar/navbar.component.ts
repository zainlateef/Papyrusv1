import { Component, OnInit } from '@angular/core';
import { EditButtonService } from '../../../Services/edit-button.service';

@Component({
  selector: 'navbar',
  template: `
  <div class="wrapper">
    <facet-menu></facet-menu>
    <div class="right" [ngStyle]="{'color': isBlack ? 'black' : 'white' }">
        <button *ngIf="editMode && !searchBarIsOpen" class="colorpicker" [ngStyle]="{'background-color': isBlack ? 'black' : '#fffffe' }" (click)="toggleColorScheme()" [matTooltip]="'Change the color of these icons to be black or white. Color will always be white on the mobile site'" [matTooltipShowDelay]="600"></button>
        <friend-search (openEvent)="searchOpenEvent($event)"></friend-search>
        <user-menu></user-menu>
    </div>
    <div style="clear: right; min-height: 1px"></div>
  </div>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private editService : EditButtonService) { }
  editMode : boolean = false;
  isBlack : boolean = true;
  searchBarIsOpen : boolean = false;

  ngOnInit() {
    this.editServiceSetup();
    //make call to setup colorScheme
    //this.isBlack="api response"
  }

  editServiceSetup()
  {
    this.editService.editMode=this.editMode;
    this.editService.editValueChange.subscribe( value => this.editMode=value );
  }

  toggleColorScheme()
  {
    this.isBlack=!this.isBlack;
    //update using API call
  }

  searchOpenEvent(searchBarIsOpen)
  {
    this.searchBarIsOpen=searchBarIsOpen;
  }

}
