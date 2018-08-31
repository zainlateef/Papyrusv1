import { Component, OnInit } from '@angular/core';
declare var Quill: any;
@Component({
  selector: 'post',
  template: `
  <div id="editor">
  </div>
  `,
  styleUrls: ['./post.component.scss','./quill-fonts.scss']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let fonts = ['arial', 'sofia','indie_flower'];
    let Font = Quill.import('formats/font');
    Font.whitelist = fonts;
    Quill.register(Font, true);
    let quill = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ 'size': ['small', false, 'large', 'huge'] }], 
          [{ 'font': fonts }],
          [{ 'color': [] }],  
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
        ]
      },
      theme: 'snow'  // or 'bubble'
    });
    quill.format('font', 'arial');
  }

}
