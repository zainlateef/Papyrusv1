import { ActivatedRoute } from "@angular/router";
import { OnDestroy } from "@angular/core";

export abstract class UrlChangeDetection implements OnDestroy
{
    constructor(private url : ActivatedRoute){}
    
    routeSubscription : any;
    uid : string;

    detectAllUrlChanges()
    {
        this.routeSubscription=this.url.params.subscribe( params => 
        {
            this.loadOnUrlChange(params);
        })    
    }

    detectUidChanges()
    {
      this.routeSubscription=this.url.params.subscribe( params => 
        {
          if(this.uid!=params.uid)
          {
            this.uid=params.uid
            this.loadOnUrlChange(params);
          }
        })
    }

    abstract loadOnUrlChange(params);

    ngOnDestroy()
    {
        // alert("subscription destroyed");
        this.routeSubscription.unsubscribe();
    };
}