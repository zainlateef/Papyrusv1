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
    // var quill = new Quill('#editor', {
    //   theme: 'snow',
    //   modules: {
    //   toolbar : [
    //     { 'size': ['small', false, 'large','huge'] },
    //     [{ 'font': [] }],
    //     'bold', 'italic', 'underline',
    //     { 'color': [] }, 
    //     'link',         
    //     {'list': 'ordered'}, { 'list': 'bullet' },
    //     { 'align': [] }                        
    //   ]
    // }   
    // });
    var fonts = ['sofia', 'roboto'];
    var Font = Quill.import('formats/font');
    Font.whitelist = fonts;
    Quill.register(Font, true);
    
    var quill = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          [{ direction: "rtl" }, { align: [] }],
          [{font: ['sofia', 'roboto']}]
        ]
      },
      theme: 'snow'  // or 'bubble'
    });
    
    quill.format('font', 'sofia');

  }

}
