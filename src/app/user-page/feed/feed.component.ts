import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class FeedComponent implements OnInit,OnDestroy {

  constructor(private route : ActivatedRoute) { }

  routeSubscription : any;

  ngOnInit() 
  { 
    this.routeSubscription=this.route.params.subscribe( params => 
    {
      this.loadFeed(params);
    })
  }

  loadFeed(params)
  {
    console.log("Feed loads uid:"+params.uid+" category:"+params.category);
  }

  ngOnDestroy()
  {
    this.routeSubscription.unsubscribe();
  }

}
