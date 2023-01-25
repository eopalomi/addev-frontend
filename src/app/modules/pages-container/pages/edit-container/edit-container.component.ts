import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HostListener } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { PagesContainerService } from '../../pages-container.service';
import * as ace from "ace-builds";
import { MessagePageService } from 'src/app/shared/services/message.service';

interface Compag{
  co_compag: string,
  no_compag: string
}


@Component({
  selector: 'app-edit-container',
  templateUrl: './edit-container.component.html',
  styleUrls: ['./edit-container.component.css']
})
export class EditContainerComponent implements OnInit, AfterViewInit {
  @ViewChild("editor1") private editorValpag: ElementRef<HTMLElement>;
  @ViewChild("editor2") private editorPropag: ElementRef<HTMLElement>;
  @ViewChild("editor3") private editorPropos: ElementRef<HTMLElement>;

  indexTab: number = 0;

  items: MenuItem[];

  paginas: MenuItem[]=[];

  options: MenuItem[];
  optionsNew: Compag[]=[];
  optionsNewSelected: Compag;

  contenName: string;
  valpag: string;
  propag: string;
  propos: string;

  existsValpag: boolean = false;
  existsPropag: boolean = false;
  existsPropos: boolean = false;

  numeroPagina: string;

  fullScreen: boolean = false;

  constructor(
    private elementRef: ElementRef, 
    public router: Router, 
    public activeRoute: ActivatedRoute, 
    private pagesContainerService: PagesContainerService, 
    private messagepageService: MessagePageService) { }

  ngAfterViewInit(): void {
    
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

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
      // console.log("editorValpag", this.valpag);
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
      // console.log("editorPropag", this.propag);
    });

    // COnfiguracion del editorPropos
    const aceEditoreditorPropos = ace.edit(this.editorPropos.nativeElement);

    aceEditoreditorPropos.session.setValue("");
    aceEditoreditorPropos.setTheme('ace/theme/dracula');
    aceEditoreditorPropos.session.setMode('ace/mode/javascript');
    aceEditoreditorPropos.setOption("showPrintMargin", false);
    aceEditoreditorPropos.setOption("fontSize", 12);
    aceEditoreditorPropos.setOption("useSoftTabs", true);
    aceEditoreditorPropos.setOption("tabSize", 3);


    aceEditoreditorPropos.on("change", () => {
      this.propos = aceEditoreditorPropos.getValue();
      // console.log("editorPropag", this.propag);
    });
  }
  
  setPaginas (id_pagina: Compag){
    this.numeroPagina = id_pagina.co_compag;

    this.pagesContainerService.getValpag(id_pagina.co_compag).subscribe((res: any)=>{
      // console.log("Script Carga", res)
      this.valpag = res.valpag;
      this.existsValpag = res.valpag.length > 0 ? true : false;
      
      const aceEditoreditorValpag = ace.edit(this.editorValpag.nativeElement);
      aceEditoreditorValpag.setValue(this.valpag);
      aceEditoreditorValpag.clearSelection();
    })

    this.pagesContainerService.getPropag(id_pagina.co_compag).subscribe((res: any)=>{
      //  console.log("Script Proceso", res)
      this.propag = res.propag;
      this.existsPropag = res.propag.length > 0 ? true : false;

      const aceEditoreditorPropag = ace.edit(this.editorPropag.nativeElement);
      aceEditoreditorPropag.setValue(this.propag);
      aceEditoreditorPropag.clearSelection();
    })

    this.pagesContainerService.getPropos(id_pagina.co_compag).subscribe((res: any)=>{
      //  console.log("Script Proceso", res)
      this.propos = res.propos;
      this.existsPropos = res.propos.length > 0 ? true : false;

      const aceEditoreditorPropos = ace.edit(this.editorPropos.nativeElement);
      aceEditoreditorPropos.setValue(this.propos);
      aceEditoreditorPropos.clearSelection();
    })
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(res=>{
      // this.pagesContainerService.getValpag(res.id_conten).subscribe((res:any)=>{
      //   this.valpag = res.valpag;
      //   console.log("this.valpag", res)
      // })

      this.pagesContainerService.getSearchPage('3', res.id_conten).subscribe((res:any)=>{
        let pages: MenuItem[] =[];
        let newCompag: Compag[] =[];

        console.log("res.content_id", res);

        res.forEach(element => {
          // pages.push({
          //   label: `Pagina ${element.pagina_id}`,
          //   icon: 'pi pi-fw pi-file',
          //   styleClass: 'menucus',
          //   // routerLinkActiveOptions:'{exact:true}',
          //   command: () => {this.setPaginas(element.pagina_id);}
          // })
          let typePage = 
            element.pagina_type === 'F'    ? '[Form]'  : 
            element.pagina_type === 'T'    ? '[Table]' : 
            element.pagina_type === 'C01'  ? '[Card]'  : 
            element.pagina_type === 'CH01' ? '[Chart]' : '';

          newCompag.push({
            co_compag: element.pagina_id,
            no_compag: `${typePage} - ${element.pagina_id} ${element.pagina_name}`
          })
        });

        console.log("this.paginas", newCompag)  

        this.contenName = res[0].conten_name;
        this.paginas = pages;
        this.optionsNew = newCompag;
      })
    })

    this.options = [
      {label: 'Update', icon: 'pi pi-refresh', command: () => {this.accion();}},
      {label: 'Delete', icon: 'pi pi-times', command: () => {this.accion();}},
      {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']},
      {separator: true},
      {label: 'Atras', icon: 'pi pi-arrow-left', command: () => {this.accion();}},
    ];
  }

  accion() {
    console.log("accion");
    this.router.navigate(['/main/conten/search']);
    //this.contenedorSeleccionado = undefined;
  }

  onKeydown($event: KeyboardEvent) {
    //console.log("$event", $event);

    this.handleWindowsKeyEvents($event);
  }

  handleWindowsKeyEvents($event) {
    
    // console.log("($event",$event)
    // console.log("($event",$event.ctrlKey)
    // console.log("($event",$event.ctrlKey)
    // console.log("($event",$event.keyCode)

    let charCode = String.fromCharCode($event.which).toLowerCase();
    let ctrlKey = $event.ctrlKey;
    let ketF = $event.key;

    if (charCode === 's' && ctrlKey === true) {
      $event.preventDefault();
      this.guardar();
    }

    if (ketF === 'F11') {
      $event.preventDefault();
      this.fullScreen = !this.fullScreen;
    }
  }

  guardar() {
    if (this.numeroPagina && this.indexTab == 0){
      // console.log("entro actualizar valpag");
      
      if (this.indexTab == 0) {
        this.pagesContainerService.actualizarValpag(this.numeroPagina, this.valpag).subscribe( res => {
          this.existsValpag = this.valpag.length > 0 ? true : false;
          this.messagepageService.showAlert('SCRIPT DE CARGA','Se guardo correctamente el script','success');
        }, (err)=>{
          this.messagepageService.showAlert('Mensaje de Error', err, 'error');
        });
      };
    }

    if (this.numeroPagina && this.indexTab == 1){
      if (this.indexTab == 1) {
        this.pagesContainerService.actualizarPropag(this.numeroPagina, this.propag).subscribe( res => {
          this.existsPropag = this.propag.length > 0 ? true : false;
          this.messagepageService.showAlert('SCRIPT DE PROCESO','Se guardo correctamente el script','success');
        }, (err)=>{
          this.messagepageService.showAlert('Mensaje de Error', err, 'error');
        });
      };
    }

    if (this.numeroPagina && this.indexTab == 2){
      if (this.indexTab == 2) {
        this.pagesContainerService.actualizarPropos(this.numeroPagina, this.propos).subscribe( res => {
          this.existsPropos = this.propos.length > 0 ? true : false;
          this.messagepageService.showAlert('SCRIPT DE POST','Se guardo correctamente el script','success');
        }, (err)=>{
          this.messagepageService.showAlert('Mensaje de Error', err, 'error');
        });
      };
    }
  }

  // screenHeight: number;
  // screenWidth: number;
  
  // @HostListener('window:resize', ['$event'])
  // onResize(event?) {
  //   this.screenHeight = window.innerHeight;
  //   this.screenWidth = window.innerWidth;
  //   console.log("screenHeight:", this.screenHeight, "screenWidth" ,this.screenWidth)
  // }

}
