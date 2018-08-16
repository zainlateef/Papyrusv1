import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit()
  {
    let Nanobar = require('../../node_modules/nanobar');
    let options = { id : 'loadbar', classname : 'loadbar'};
    let nanobar = new Nanobar( options );
    nanobar.go(100);
  }
}
