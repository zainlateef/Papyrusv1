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
      'fontFamily', 'fontSize' , 'color', 
      'bold','italic','underline',
      'align',
      'emoticons','specialCharacters',
      'embedly',
      'publish',
      'myDropdown'
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
    $.FroalaEditor.DefineIcon('dropdownIcon', { NAME: 'magic'})
    $.FroalaEditor.RegisterCommand('myDropdown', {
      title: 'My Dropdown',
      type: 'dropdown',
      icon: 'dropdownIcon',
      options: {
        'white': 'White',
        'wheat': 'Wheat',
        'rgb(240, 209, 240)' : 'Strawberry',
        'rgb(245, 165, 95)' : 'Red Tiger',
        'rgb(158, 226, 235)' : 'Blue Tiger'
      },
      html: function () {
        return `
          <ul id="colorOptions">
            <li class="fr-command" style="background-color: wheat"></li>
            <li class="fr-command" style="background-color: white"></li>
            <li class="fr-command" style="background-color: rgb(240, 209, 240)"></li>
            <li class="fr-command" style="background-color: rgb(245, 165, 95)"></li>
            <li class="fr-command" style="background-color: rgb(158, 226, 235)"></li>
          </ul>
        `;
        // return `
        //   <ul id="colorOptions" class="fr-dropdown-list" role="presentation">
        //     <li style="background-color: wheat" role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="myDropdown" data-param1="wheat" title="Wheat" aria-selected="false">Wheat</a></li>
        //     <li style="background-color: white" role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="myDropdown" data-param1="white" title="White" aria-selected="false">White</a></li>
        //     <li style="background-color: rgb(240, 209, 240)" role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="myDropdown" data-param1="rgb(240, 209, 240)" title="Strawberry" aria-selected="false">Strawberry</a></li>
        //     <li style="background-color: rgb(245, 165, 95)" role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="myDropdown" data-param1="rgb(245, 165, 95)" title="Red Tiger" aria-selected="false">Red Tiger</a></li>
        //     <li style="background-color: rgb(158, 226, 235)" role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="myDropdown" data-param1="rgb(158, 226, 235)" title="Blue Tiger" aria-selected="false">Blue Tiger</a></li>
        //   </ul>
        // `;
      //   return `
      //       <ul id="colorOptions" class="fr-dropdown-list" role="presentation">
      //         <li style="background-color: wheat" role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="myDropdown" data-param1="wheat" title="Wheat" aria-selected="false">g</a></li>
      //         <li style="background-color: white" role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="myDropdown" data-param1="white" title="White" aria-selected="false">g</a></li>
      //         <li style="background-color: rgb(240, 209, 240)" role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="myDropdown" data-param1="rgb(240, 209, 240)" title="Strawberry" aria-selected="false">g</a></li>
      //         <li style="background-color: rgb(245, 165, 95)" role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="myDropdown" data-param1="rgb(245, 165, 95)" title="Red Tiger" aria-selected="false">g</a></li>
      //         <li style="background-color: rgb(158, 226, 235)" role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="myDropdown" data-param1="rgb(158, 226, 235)" title="Blue Tiger" aria-selected="false">g</a></li>
      //       </ul>
      // `;
      },
      undo: false,
      focus: true,
      refreshAfterCallback: true,
      callback: (cmd,val,params)=> {
        //this.postBackgroundColor=val;
      },
      // Called when the dropdown button state might have changed.
      refresh: function ($btn) {
        // The current context is the editor instance.
        console.log (this.selection.element());
      },
    
      // Called when the dropdown is shown.
      refreshOnShow: function ($btn, $dropdown) {
        // The current context is the editor instance.
        console.log (this.selection.element());
      }
    })
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
      $(this.wrapper.nativeElement).find($('#colorOptions li')).on('click', (e) => {
          this.postBackgroundColor=$(e.currentTarget).css('backgroundColor');
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
