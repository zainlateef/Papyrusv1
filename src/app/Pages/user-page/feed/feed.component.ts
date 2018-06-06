import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlChangeDetection } from '../../../Models/url-changes';
@Component({
  selector: 'feed',
  template: 
  `
  <!--img src="https://i.gifer.com/Iu5Q.gif" alt=""-->
  <p>
    <br>
    feed
  </p>
  `
  ,
  styleUrls: ['./feed.component.css']
})
export class FeedComponent extends UrlChangeDetection implements OnInit {

  constructor(private route : ActivatedRoute) {
    super(route);
  }

  routeSubscription : any;

  ngOnInit() 
  { 
    this.detectAllUrlChanges();
  }

  loadOnUrlChange(params)
  {
    console.log("Feed loads uid:"+params.uid+" category:"+params.category);
  }

}
