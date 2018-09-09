import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
@Component({
  selector: 'post',
  template: `
  <div #wrapper class="wrapper">
    <div [ngStyle]="!editorOn && {'display':'none'}" [froalaEditor]="options" [(froalaModel)]="editorContent" (froalaInit)="initialize($event)"></div>
    <div *ngIf="!editorOn" class="view" (click)="toggleEditor()" [ngStyle]="{'background-color': postBackgroundColor }">
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
  postBackgroundColor : string = 'white';
  @ViewChild('wrapper') wrapper : ElementRef; 
  
  public options: Object = {
    toolbarButtons: 
      [
      'fullscreen',
      'fontFamily', 'fontSize' , 
      'background','color', 
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
    this.registerFillBackgroundButton()
    this.editorContent="<p>sdsdfsdgsdgs</p>"
  }

  registerPublishButton()
  {
    $.FroalaEditor.DefineIcon('publish', {NAME: 'publish'});
    $.FroalaEditor.RegisterCommand('publish', {
      title: '',
      focus: false,
      undo: false,
      refreshAfterCallback: true
    });
  }

  registerFillBackgroundButton()
  {
    $.FroalaEditor.DefineIcon('fill-Icon', { NAME: 'fill-drip'})
    $.FroalaEditor.RegisterCommand('background', {
      title: 'Post background',
      type: 'dropdown',
      icon: 'fill-Icon',
      html: function () {
        return `
          <ul id="colorOptions">
            <li class="fr-command" style="background-color: white"></li>
            <li class="fr-command" style="background-color: wheat"></li>
            <li class="fr-command" style="background-color: rgb(240, 209, 240)"></li>
            <li class="fr-command" style="background-color: rgb(245, 165, 95)"></li>
            <li class="fr-command" style="background-color: rgb(158, 226, 235)"></li>
          </ul>
        `;
      },
      undo: false,
      focus: true,
      refreshAfterCallback: true
    })
  }

  toggleEditor()
  {
    console.log(this.editorContent)
    this.editorOn=!this.editorOn;
    if(this.editorOn)
    {
      this.initializeEditor();
    }
    else
    {
      this.initControls.destroy();
    }
  }

  initializeEditor()
  {
    this.initControls.initialize();
    $(this.wrapper.nativeElement).find($('.fr-wrapper')).css('background-color',this.postBackgroundColor);
    $(this.wrapper.nativeElement).find($('[id^="publish"]')).click(() => {
        //TODO: Fix the keyup delay bug
        this.toggleEditor();
      });
    $(this.wrapper.nativeElement).find($('#colorOptions li')).on('click', (e) => {
          this.postBackgroundColor=$(e.currentTarget).css('backgroundColor');
          $(this.wrapper.nativeElement).find($('.fr-wrapper')).css('background-color',$(e.currentTarget).css('backgroundColor'));
      });
  }

  toggleBookmarked()
  {
    this.bookmarked=!this.bookmarked;
  }

  initialize(initControls) {
    this.initControls = initControls;
  }

}
