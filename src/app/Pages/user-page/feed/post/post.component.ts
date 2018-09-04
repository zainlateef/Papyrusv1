import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'post',
  template: `
  <div id="froala-editor" [froalaEditor]='options'></div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }

  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    width: "100%"
  }

  ngOnInit() {
    this.initializeEditor();
  }

  initializeEditor(): any {
    
    $.FroalaEditor.DefineIcon('publish', {NAME: 'publish'});
    $.FroalaEditor.RegisterCommand('publish', {
      title: '',
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function () {
        if ($('div#froala-editor').data('froala.editor')) 
        {
          $('div#froala-editor').froalaEditor('destroy');
        }
        else if (!$('div#froala-editor').data('froala.editor')) 
        {
          $('div#froala-editor').froalaEditor();
        }
      }
    });

    $('div#froala-editor').froalaEditor({
      toolbarButtons: 
      ['fontFamily', 'fontSize' , 'color', 
      'bold','italic','underline',
      'align',
      'emoticons','specialCharacters',
      'embedly',
      'publish'/*,
      'fullscreen', */
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
      }
    })
  }

}
