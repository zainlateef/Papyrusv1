import { Component, OnInit } from '@angular/core';
import { EditButtonService } from '../../../Services/edit-button.service';
import { trigger, transition, useAnimation } from '../../../../../node_modules/@angular/animations';
import { zoomIn } from '../../../../../node_modules/ng-animate';

@Component({
  selector: 'profile-pic',
  template: `
  <div class="wrapper">
    <img src="https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg" alt="">
    <i name="editButton" *ngIf="pageOwner" class="fas fa-edit editIcon" [matTooltip]="'Change your profile pic'"  [matTooltipShowDelay]="1300" [@zoomIn]="zoomIn"></i>
  </div>        
  `,
  styleUrls: ['./profile-pic.component.scss'],
  animations: [
    trigger('zoomIn', [transition('void => *', useAnimation(zoomIn, { params:{timing:0.15} } ))])
  ]
})
export class ProfilePicComponent implements OnInit {

  constructor(private editService : EditButtonService) { }

  pageOwner : boolean = false;
  zoomIn : any;

  ngOnInit() 
  {
    this.editServiceSetup();
  }

  editServiceSetup()
  {
    this.pageOwner=this.editService.isPageOwner;
    this.editService.pageOwnerStatus.subscribe( pageOwnerStatus => {
      this.pageOwner=pageOwnerStatus;
    });
  }

}
