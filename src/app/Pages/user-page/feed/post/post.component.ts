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
    $('div#froala-editor').froalaEditor({
      toolbarButtons: 
      ['fontFamily', 'fontSize' , 'color', '|',
      'bold','italic','underline','|',
      'alignment','insertHL','|',
      'formatOL','formatUL','|',
      'emoticons','specialCharacters','|',
      'embedly','insertLink','insertImage','insertVideo', '|',
      'fullscreen'
      ]
    })
  }

}
