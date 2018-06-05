import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      console.log(params);
      if(!params.hasOwnProperty('category'))
      {
        console.log("no category selected");
      }
      else
      {
        console.log("uid:"+params.uid+", category:"+params.category);
      }
    })
  }

}
