import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlChangeDetection } from '../../../Parent-Classes/url-changes';
declare var $: any;
@Component({
  selector: 'feed',
  template: 
  `
    <ul class="feed">
    </ul>
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
    this.initializeEditor();
  }

  loadOnUrlChange(params)
  {
    if(!params.facet)
      console.log("HTTP Call:No facet selected. Load first facet of uid:"+params.uid+" by making special first facet ajax call");
    else
      console.log("HTTP Call:Feed loads uid:"+params.uid+" facet:"+params.facet);
  }

  initializeEditor(): any {
    $('div#froala-editor').froalaEditor({
      toolbarButtons: 
      ['fontFamily', 'fontSize' , 'color', '|',
      'bold','italic','underline','|',
      'alignment','insertHL','|',
      'formatOL','formatUL','|',
      'emoticons','specialCharacters','|',
      'embedly','insertLink','insertImage','insertVideo', '|',
      'fullscreen'
      ]
    })
  }

}
