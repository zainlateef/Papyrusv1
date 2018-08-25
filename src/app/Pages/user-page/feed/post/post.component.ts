import { Component, OnInit } from '@angular/core';
declare var Quill: any;
@Component({
  selector: 'post',
  template: `
  <div id="editor">
  <p>Hello World!</p>
  <p>Some initial <strong>bold</strong> text</p>
  <p><br></p>
  </div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
      toolbar : [
        { 'size': ['small', false, 'large','huge'] },
        'bold', 'italic', 'underline',
        { 'color': [] }, 
        'video', 'link',         
        {'list': 'ordered'}, { 'list': 'bullet' },
        { 'align': [] }                        
      ]
    }   
    });
  }

}
