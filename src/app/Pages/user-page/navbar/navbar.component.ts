import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
  <div class="wrapper">
    <facet-menu></facet-menu>
    <div class="right">
        <button class="colorpicker" (colorPickerOpen)="colorPickerOpened(color)" [(colorPicker)]="color" (colorPickerChange)="setColor(color)"[style.background]="color" [cpPosition]="colorPickerOrientation" [cpDisableInput]="true"></button>
        <friend-search></friend-search>
        <user-menu></user-menu>
    </div>
    <div style="clear: right; min-height: 1px"></div>
  </div>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
