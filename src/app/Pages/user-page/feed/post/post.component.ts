import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'post',
  template: `
  <div [froalaEditor]="options" [(froalaModel)]="editorContent"></div>
  <div *ngIf="!editorOn" [froalaView]="editorContent"></div>
  <button (click)="toggleEditor()">editorOn</button>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }
  
  editorOn : boolean = true;
  editorContent : any;

  public options: Object = {
    toolbarButtons: 
      ['fontFamily', 'fontSize' , 'color', 
      'bold','italic','underline',
      'align',
      'emoticons','specialCharacters',
      'embedly',
      'publish',
      'fullscreen',
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
      keepFormatOnDelete: true
  }

  ngOnInit() {
    this.registerPublishButton();
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
        this.toggleEditor();
      }
    });
  }

  toggleEditor()
  {
    console.log(this.editorContent);
    this.editorOn=!this.editorOn;
  }

}
