import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
@Component({
  selector: 'post',
  template: `
  <div #wrapper class="wrapper">
    <div [froalaEditor]="options" [(froalaModel)]="editorContent" (froalaInit)="initialize($event)"></div>
    <div (click)="toggleEditor()" [froalaView]="editorContent"></div>
    <button #button (click)="toggleEditor();bump('hi')">HEYEY</button>
  </div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }
  
  editorOn : boolean = false;
  editorContent : any;
  initControls : any;
  @ViewChild('wrapper') wrapper : ElementRef; 
  @ViewChild('button') button : ElementRef;

  bump(hey)
  {
    alert(hey);
  }

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
        // this.toggleEditor()
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
        $(this.button.nativeElement).click();
      });
    }
    else
    {
      this.initControls.destroy();
    }
  }

  initialize(initControls) {
    this.initControls = initControls;
  }

}
