import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import * as ace from "ace-builds";


@Component({
  selector: 'app-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css']
})
export class AceEditorComponent implements OnInit {
  // @ViewChild('editor') editor;
  @ViewChild("editor1") private editorValpag: ElementRef<HTMLElement>;
  @ViewChild("editor2") private editorPropag: ElementRef<HTMLElement>;
  @Input('valpag') valpag: string;
  @Input('propag') propag: string;

  fullScreen: boolean = false;
  
  

  text:string = "";
  options:any = {maxLines: 1000, printMargin: false};

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.editor.setTheme("cobalt");
    // this.editor.setMode("javascript");
    
    // this.ace.config.set(
    //   "basePath",
    //   "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    // );

    // this.editor.setOptions({
    //   fontSize: 14,
    //   enableBasicAutocompletion: true,
    //   showPrintMargin: false
    // });

    // this.editor.getEditor().commands.addCommand({
    //     name: "showOtherCompletions",
    //     bindKey: "Ctrl-.",
    //     exec: function (editor) {

    //     }
    // })




    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');


    //let snipet = ace.require("ace-builds/snippets").snippetManager;
    //snipet.insertSnippet(this.editorValpag, snippet);
    
    const snippet = '# AddNode\n\
    snippet addn\n\
        {\n\
            "nodeName": "${1:node_name}",\n\
            "algorithmName": "${2:algo_name}",\n\
            "input": []\n\
        }\n\
    ';
    
    //var snippetManager = ace.require("ace/snippets").snippetManager;
    //snippetManager.insertSnippet(this.editorValpag.nativeElement, snippet);
    //snippetManager.insertSnippet(this.editorValpag, snippet);

    // COnfiguracion del editorValpag
    const aceEditoreditorValpag = ace.edit(this.editorValpag.nativeElement);

    aceEditoreditorValpag.session.setValue("");
    aceEditoreditorValpag.setTheme('ace/theme/cobalt');
    aceEditoreditorValpag.session.setMode('ace/mode/javascript');
    aceEditoreditorValpag.setOption("showPrintMargin", false);
    aceEditoreditorValpag.setOption("fontSize", 12);
    aceEditoreditorValpag.setOption("useSoftTabs", true);
    aceEditoreditorValpag.setOption("tabSize", 3);
    
    


    aceEditoreditorValpag.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: false
    });

    aceEditoreditorValpag.on("change", () => {
      this.valpag = aceEditoreditorValpag.getValue();
      console.log("editorValpag", this.valpag);
    });

    // COnfiguracion del editorPropag
    const aceEditoreditorPropag = ace.edit(this.editorPropag.nativeElement);

    aceEditoreditorPropag.session.setValue("");
    aceEditoreditorPropag.setTheme('ace/theme/twilight');
    aceEditoreditorPropag.session.setMode('ace/mode/javascript');
    aceEditoreditorPropag.setOption("showPrintMargin", false);
    aceEditoreditorPropag.setOption("fontSize", 12);
    aceEditoreditorPropag.setOption("useSoftTabs", true);
    aceEditoreditorPropag.setOption("tabSize", 3);


    aceEditoreditorPropag.on("change", () => {
      this.propag = aceEditoreditorPropag.getValue();
      console.log("editorPropag", this.propag);
    });
  }

  setValpag(valpag: string) {
    const aceEditoreditorValpag = ace.edit(this.editorValpag.nativeElement);

    aceEditoreditorValpag.setValue(valpag);
  }

  onKeydown($event: KeyboardEvent) {
    //console.log("$event", $event);

    this.handleWindowsKeyEvents($event);
  }

  handleWindowsKeyEvents($event) {
    let charCode = String.fromCharCode($event.which).toLowerCase();
    let ketF = $event.key;

    if (ketF === 'F11') {    
        $event.preventDefault();
        this.fullScreen = !this.fullScreen;
        //console.log("presiono F11")
    } 
  }


  onChange(code) {
    console.log("new code", code);
  }

}
