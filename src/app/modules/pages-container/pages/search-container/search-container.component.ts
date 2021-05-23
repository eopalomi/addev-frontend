import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesContainerService } from '../../pages-container.service';

interface Contenedor {
  nombre: string,
  numero: string,
  usuario: string,
  paginas_cant: number
}

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent implements OnInit {

  
  contenedores : Contenedor[] =[];
  contenedorSeleccionado: Contenedor;
  selectedtipoBusq: any = {co_compag: 3, no_compag: 'Numero Pagina'};
  valorBusqueda: any = null;

  opciones: any[] = [
    {co_compag: 1, no_compag: 'Numero Contenedor'},
    {co_compag: 2, no_compag: 'Nombre Contenedor'},
    {co_compag: 3, no_compag: 'Numero Pagina'},
    {co_compag: 4, no_compag: 'Nombre Pagina'}
  ];
  
  constructor(public router: Router, private pageContainerService: PagesContainerService) { }

  ngOnInit(): void {
    // this.contenedores = [
    //   {  
    //     nombre: 'Contenedor Registro',
    //     numero: '1208',
    //     usuario: 'Erick Palomino'
    //   },
    //   {  
    //     nombre: 'Contenedor Actualizacion',
    //     numero: '1209',
    //     usuario: 'Erick Palomino'
    //   },
    //   {  
    //     nombre: 'Contenedor Eliminacion',
    //     numero: '1210',
    //     usuario: 'Erick Palomino'
    //   }
    // ];
  }
  
  onRowSelect(event) {
    console.log("onRowSelect", event)
    console.log("contenedorSeleccionado", this.contenedorSeleccionado)
    this.router.navigate(['main/conten/edit', this.contenedorSeleccionado.numero]);
  }

  onRowUnselect(event) {
    console.log("onRowUnselect", event)
    console.log("contenedorSeleccionado", this.contenedorSeleccionado)
  }

  searchConten(){
    this.pageContainerService.getSearchConten(this.selectedtipoBusq.co_compag, this.valorBusqueda).subscribe( (res: any []) =>{
      this.contenedores = [];
      res.forEach((value, index)=>{
        //console.log(">>>>>>>>>", value, index)
        this.contenedores.push({
          nombre: value.conten_name,
          numero: value.conten_id,
          usuario: value.conten_user,
          paginas_cant: value.conten_pages_cant
        });
      })

      console.log("res", this.contenedores)
      //this.contenedores = res;
    });
  }
}
