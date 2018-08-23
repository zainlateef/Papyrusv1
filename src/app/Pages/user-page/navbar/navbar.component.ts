import { Component, OnInit } from '@angular/core';
import { EditButtonService } from '../../../Services/edit-button.service';

@Component({
  selector: 'navbar',
  template: `
  <div class="wrapper">
    <facet-menu></facet-menu>
    <div class="right" [ngStyle]="{'color': isBlack ? 'black' : 'white' }">
        <button *ngIf="pageOwner && !searchBarIsOpen" class="colorpicker" [ngStyle]="{'background-color': isBlack ? 'black' : '#fffffe' }" (click)="toggleColorScheme()"></button>
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
  pageOwner : boolean = false;
  isBlack : boolean = true;
  searchBarIsOpen : boolean = false;

  ngOnInit() {
    this.editServiceSetup();
    //make call to setup colorScheme
    //this.isBlack="api response"
  }

  editServiceSetup()
  {
    this.pageOwner=this.editService.isPageOwner;
    this.editService.pageOwnerStatus.subscribe( value => this.pageOwner=value );
  }

  toggleColorScheme()
  {
    this.isBlack=!this.isBlack;
    //update using API call
  }

  searchOpenEvent(searchBarIsOpen)
  {
    console.log("here"+searchBarIsOpen);
    this.searchBarIsOpen=searchBarIsOpen;
  }

}
