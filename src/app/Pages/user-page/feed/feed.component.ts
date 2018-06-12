import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlChangeDetection } from '../../../Parent-Classes/url-changes';
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
  styleUrls: ['./feed.component.scss']
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
    if(!params.facet)
      console.log("No facet selected. Load first facet of uid:"+params.uid+" by making special first facet ajax call");
    else
      console.log("Feed loads uid:"+params.uid+" facet:"+params.facet);
  }

}
