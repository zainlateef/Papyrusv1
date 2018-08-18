import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-pic',
  template: '<img src="https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg" alt="">',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
