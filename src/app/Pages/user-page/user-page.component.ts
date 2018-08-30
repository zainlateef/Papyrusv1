import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditButtonService } from '../../Services/edit-button.service';
import { ActivatedRoute } from '@angular/router';
import { UrlChangeDetection } from '../../Parent-Classes/url-changes';

@Component({
  selector: 'app-user-page',
  template: 
  `
    <navbar></navbar>
    <feed></feed>
  `
  ,
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent extends UrlChangeDetection implements OnInit {
  
  constructor(private editService : EditButtonService, private route: ActivatedRoute) { 
    super(route);
   }

  editStatus : string = "Edit your list";
  pageOwner : boolean = false;

  ngOnInit() 
  {
    this.detectUidChanges();
    this.editServiceSetup();
  }

  editServiceSetup()
  {
    this.editService.editValueChange.subscribe( editMode => {
      if(editMode)
        this.editStatus="Save";
      else
        this.editStatus="Edit your list";
    });
  }

  loadOnUrlChange(params: any) {
    this.editService.reset();
    if(params.uid=="zboi")
      this.editService.emitPageOwnerStatus(true);
    else
      this.editService.emitPageOwnerStatus(false);
  }

  toggleEditMode()
  {
    this.editService.toggle();
  }

}