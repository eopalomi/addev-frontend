import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MessagePageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  menuList: any;
  showMessage: any;

  constructor(private messageService: MessageService, private messagePageService: MessagePageService) { 
    console.log('Main layout constructor called');
  }

  showMessages(title: string, body: string, type: string) {
    this.messageService.add({severity: type, summary: title, detail: body, life:3000});
  }

  ngOnInit(): void {
    this.showMessage = this.messagePageService.messageObservable.subscribe((res: any) =>{
      this.showMessages(res.title,res.body,res.type);
    })

    this.menuList = [
      {
        label: 'Contenedor',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Pagina',
                icon: 'pi pi-bookmark',
                routerLink: ['/main/page/create']
              },
              {
                label: 'Contenedor',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: ['/main/conten/create']
              },

            ]
          },
          {
            label: 'Buscar Contenedor',
            icon: 'pi pi-fw pi-search',
            routerLink: ['/main/conten/search']
          },
          {
            separator: true
          },
          {
            label: 'Lista de Contenedores',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },    
      {
        label: 'Reportes',
        icon: 'pi pi-fw pi-copy',
        items: [
          {
            label: 'Reporte 01',
            icon: 'pi pi-fw pi-list'
          },
          {
            label: 'Reporte 02',
            icon: 'pi pi-fw pi-list'
          },
          {
            label: 'Reporte 03',
            icon: 'pi pi-fw pi-list'
          },
          {
            label: 'Reporte 04',
            icon: 'pi pi-fw pi-list'
          },

        ]
      }
    ];

    // this.menuList = [
    //   {
    //     label: 'File',
    //     icon: 'pi pi-fw pi-file',
    //     items: [
    //       {
    //         label: 'New',
    //         icon: 'pi pi-fw pi-plus',
    //         items: [
    //           {
    //             label: 'Bookmark',
    //             icon: 'pi pi-fw pi-bookmark'
    //           },
    //           {
    //             label: 'Video',
    //             icon: 'pi pi-fw pi-video'
    //           },

    //         ]
    //       },
    //       {
    //         label: 'Delete',
    //         icon: 'pi pi-fw pi-trash'
    //       },
    //       {
    //         separator: true
    //       },
    //       {
    //         label: 'Export',
    //         icon: 'pi pi-fw pi-external-link'
    //       }
    //     ]
    //   },
    //   {
    //     label: 'Edit',
    //     icon: 'pi pi-fw pi-pencil',
    //     items: [
    //       {
    //         label: 'Left',
    //         icon: 'pi pi-fw pi-align-left'
    //       },
    //       {
    //         label: 'Right',
    //         icon: 'pi pi-fw pi-align-right'
    //       },
    //       {
    //         label: 'Center',
    //         icon: 'pi pi-fw pi-align-center'
    //       },
    //       {
    //         label: 'Justify',
    //         icon: 'pi pi-fw pi-align-justify'
    //       },

    //     ]
    //   },
    //   {
    //     label: 'Users',
    //     icon: 'pi pi-fw pi-user',
    //     items: [
    //       {
    //         label: 'New',
    //         icon: 'pi pi-fw pi-user-plus',

    //       },
    //       {
    //         label: 'Delete',
    //         icon: 'pi pi-fw pi-user-minus',

    //       },
    //       {
    //         label: 'Search',
    //         icon: 'pi pi-fw pi-users',
    //         items: [
    //           {
    //             label: 'Filter',
    //             icon: 'pi pi-fw pi-filter',
    //             items: [
    //               {
    //                 label: 'Print',
    //                 icon: 'pi pi-fw pi-print'
    //               }
    //             ]
    //           },
    //           {
    //             icon: 'pi pi-fw pi-bars',
    //             label: 'List'
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     label: 'Events',
    //     icon: 'pi pi-fw pi-calendar',
    //     items: [
    //       {
    //         label: 'Edit',
    //         icon: 'pi pi-fw pi-pencil',
    //         items: [
    //           {
    //             label: 'Save',
    //             icon: 'pi pi-fw pi-calendar-plus'
    //           },
    //           {
    //             label: 'Delete',
    //             icon: 'pi pi-fw pi-calendar-minus'
    //           },

    //         ]
    //       },
    //       {
    //         label: 'Archieve',
    //         icon: 'pi pi-fw pi-calendar-times',
    //         items: [
    //           {
    //             label: 'Remove',
    //             icon: 'pi pi-fw pi-calendar-minus'
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     label: 'Quit',
    //     icon: 'pi pi-fw pi-power-off'
    //   }
    // ];
  }

}
