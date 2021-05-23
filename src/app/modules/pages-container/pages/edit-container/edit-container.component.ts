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

  indexTab: number = 0;

  items: MenuItem[];

  paginas: MenuItem[]=[];

  options: MenuItem[];
  optionsNew: Compag[]=[];
  optionsNewSelected: Compag;

  contenName: string;
  valpag: string;
  propag: string;

  existsValpag: boolean = false;
  existsPropag: boolean = false;

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
            element.pagina_type === 'F' ? '[Form]'  : 
            element.pagina_type === 'T' ? '[Table]' : '';

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
    
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file'
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',

          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      }
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
