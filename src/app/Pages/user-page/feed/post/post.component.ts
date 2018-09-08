import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
@Component({
  selector: 'post',
  template: `
  <div #wrapper class="wrapper">
    <div [ngStyle]="!editorOn && {'display':'none'}" [froalaEditor]="options" [(froalaModel)]="editorContent" (froalaInit)="initialize($event)"></div>
    <div *ngIf="!editorOn" class="view"  (click)="toggleEditor()">
      <span class="header noselect">
        <i class="bookmark" (click)="toggleBookmarked()" [ngClass]="bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark' " [matTooltip]="bookmarked ? null : 'Add to your library'"  [matTooltipShowDelay]="400"></i>
        9/7/2018
      </span>
      <div [froalaView]="editorContent"></div>
    </div>
  </div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }
  
  editorOn : boolean = false;
  editorContent : any;
  initControls : any;
  bookmarked : boolean = false;
  @ViewChild('wrapper') wrapper : ElementRef; 
  
  public options: Object = {
    toolbarButtons: 
      [
      'fullscreen',
      'fontFamily', 'fontSize' , 'color', 
      'bold','italic','underline',
      'align',
      'emoticons','specialCharacters',
      'embedly',
      'publish'
      ],
      quickInsertTags: [''],
      tabSpaces: 8,
      fontFamily: {
        "Arial,sans-serif": 'Arial',
        "Indie Flower, cursive": 'Hobbes',
        'Princess Sofia, cursive': "Sofia",
        'Permanent Marker, cursive': "Marker",
        'Monoton, cursive': "Inception",
        'Homemade Apple, cursive': "Jefferson",
        "'Press Start 2P', cursive": "P1",
        'Fredericka the Great, cursive': "Sketch",
        'Faster One, cursive': "Speed"
      },
      charCounterCount: false,
      keepFormatOnDelete: true,
      spellcheck: false,
      tooltips: false,
      immediateAngularModelUpdate: true
  }

  ngOnInit() {
    this.registerPublishButton();
    this.editorContent="<p>sdsdfsdgsdgs</p>"
  }

  registerPublishButton()
  {
    $.FroalaEditor.DefineIcon('publish', {NAME: 'publish'});
    $.FroalaEditor.RegisterCommand('publish', {
      title: '',
      focus: false,
      undo: false,
      refreshAfterCallback: true,
      callback: () => {
      }
    });
  }

  toggleEditor()
  {
    console.log(this.editorContent)
    this.editorOn=!this.editorOn;
    if(this.editorOn)
    {
      this.initControls.initialize();
      console.log(this.wrapper.nativeElement);
      $(this.wrapper.nativeElement).find($('[id^="publish"]')).click(() => {
        //TODO: Fix the keyup delay bug
        this.toggleEditor();
      });
    }
    else
    {
      this.initControls.destroy();
    }
  }

  toggleBookmarked()
  {
    this.bookmarked=!this.bookmarked;
  }

  initialize(initControls) {
    this.initControls = initControls;
  }

}
