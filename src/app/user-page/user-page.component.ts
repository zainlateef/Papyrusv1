import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-page',
  template: 
  `
    <navbar></navbar>
    <feed></feed>
  `
  ,
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor() {  }

  ngOnInit() 
  {
    
  }

}
