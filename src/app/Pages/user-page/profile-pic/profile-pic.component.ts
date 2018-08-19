import { Component, OnInit, Input } from '@angular/core';
import { EditButtonService } from '../../../Services/edit-button.service';
import { trigger, transition, useAnimation } from '../../../../../node_modules/@angular/animations';
import { zoomIn } from '../../../../../node_modules/ng-animate';
import { FileUpload, FileUploadModule } from '../../../../../node_modules/primeng/fileupload';

@Component({
  selector: 'profile-pic',
  template: `
  <div class="wrapper">
    <img src="https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg" alt="">
    <div class="editIconProfPic" *ngIf="pageOwner" [@zoomIn]="zoomIn">
      <span class="fa-stack fa-lg">
        <i class="fa fa-circle fa-stack-2x icon-background"></i>
        <i name="editButton" class="fas fa-edit fa-stack-1x icon" [matTooltip]="'Change your profile pic'"  [matTooltipShowDelay]="400"></i>
        <p-fileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onBasicUploadAuto($event)" auto="true"></p-fileUpload>
      </span>
    </div>
    <div class="editIconBackground" *ngIf="pageOwner" [@zoomIn]="zoomIn">
    <span class="fa-stack fa-lg">
      <i class="fa fa-circle fa-stack-2x icon-background"></i>
      <i name="editButton" class="fas fa-edit fa-stack-1x icon" [matTooltip]="'Change your background pic'"  [matTooltipShowDelay]="400"></i>
      <p-fileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onBasicUploadAuto($event)" auto="true"></p-fileUpload>
    </span>
    </div>
  </div>        
  `,
  styleUrls: ['./profile-pic.component.scss'],
  animations: [
    trigger('zoomIn', [transition('void => *', useAnimation(zoomIn, { params:{timing:0.3} } ))])
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
