import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'post',
  template: `
  <div [ngStyle]="!editorOn && {'display':'none'}" [froalaEditor]="options" [(froalaModel)]="editorContent" (froalaInit)="initialize($event)"></div>
  <div *ngIf="!editorOn" (click)="toggleEditor()" [froalaView]="editorContent"></div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }
  
  editorOn : boolean = false;
  editorContent : any;
  initControls : any;

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
      callback: this.toggleEditor()
    });
  }

  toggleEditor()
  {
    console.log(this.editorContent)
    this.editorOn=!this.editorOn;
    if(this.editorOn)
    {
      this.initControls.initialize();
    }
    else
    {
      this.initControls.destroy();
    }
  }

  initialize(initControls) {
    this.initControls = initControls;
    this.initControls.initialize();
  }

}
