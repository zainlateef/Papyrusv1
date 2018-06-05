import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  uid : string;
  currentCategory: string;

  ngOnInit() {
    this.route.parent.params.subscribe( params => {
      this.uid=params.uid;
      console.log("uid in feed component:"+this.uid);
    })
    this.route.params.subscribe( params => {
      if(!params.hasOwnProperty('category'))
      {
        console.log("no category selected");
      }
      else
      {
        this.currentCategory=params.category;
        console.log("category:"+this.currentCategory);
      }
    })
  }

}
