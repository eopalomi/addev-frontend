import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesContainerService {
  url: string = environment.urlPages;

  constructor(private http: HttpClient) { }

  getSearchConten(tipoBusqueda: string, datoBusqueda: string){
    let httpParams = new HttpParams();

    httpParams = httpParams.append('tipo_busqueda',tipoBusqueda)
    httpParams = httpParams.append('dato_busqueda',datoBusqueda)

    return this.http.get(this.url+'/contenedor/search',{params: httpParams})
  }

  getSearchPage(tipoBusqueda: string, datoBusqueda: string){
    let httpParams = new HttpParams();

    httpParams = httpParams.append('tipo_busqueda',tipoBusqueda)
    httpParams = httpParams.append('dato_busqueda',datoBusqueda)

    return this.http.get(this.url+'/pagina/search',{params: httpParams})
  }

  // Obtener el ValpagJS
  getValpag(id_pagina: string){
    // Inicializar Objeto Parametros
    let httpParams = new HttpParams();

    // Crear Query Params
    httpParams = httpParams.append('id_pagina', id_pagina);

    return this.http.get(`${this.url}/pagina-valpag`, { params: httpParams });
  };

  // Obtener el ValpagJS
  getPropag(id_pagina: string){
    // Inicializar Objeto Parametros
    let httpParams = new HttpParams();

    // Crear Query Params
    httpParams = httpParams.append('id_pagina', id_pagina);

    return this.http.get(`${this.url}/pagina-propag`, { params: httpParams });
  };

  // Obtener el Pos JS
  getPropos(id_pagina: string){
    // Inicializar Objeto Parametros
    let httpParams = new HttpParams();

    // Crear Query Params
    httpParams = httpParams.append('id_pagina', id_pagina);

    return this.http.get(`${this.url}/pagina-propos`, { params: httpParams });
  };

  // DESDE REST API
  getConfigConten(nu_conten: string){
    // Inicializar Objeto Parametros
    let httpParams = new HttpParams();

    // Crear Query Params
    httpParams = httpParams.append('id_conten', nu_conten);

    return this.http.get(`${this.url}/contenedor`, { params: httpParams });
  };

  // Actualiza el PropagJS
  actualizarPropag(id_pagina: string, js_propag){
    // Inicializar Objeto Parametros
    // let httpParams = new HttpParams();

    // Crear Query Params
    // httpParams = httpParams.append('id_pagina', id_pagina);
    // httpParams = httpParams.append('js_propag', js_propag);

    //return this.http.post(`${this.url}/pagina-propag`, null, { params: httpParams });
    return this.http.post(`${this.url}/pagina-propag`, {js_propag, id_pagina});
  };

  // Actualiza el ValpagJS
  actualizarValpag(id_pagina: string, js_valpag: any){
    // Inicializar Objeto Parametros
    // let httpParams = new HttpParams();

    // Crear Query Params
    // httpParams = httpParams.append('id_pagina', id_pagina);
    // httpParams = httpParams.set('js_valpag', js_valpag);

    //return this.http.post(`${this.url}/pagina-valpag`, null, { params: httpParams });
    return this.http.post(`${this.url}/pagina-valpag`, {js_valpag, id_pagina});
  };

  // Actualiza el ProposJS
  actualizarPropos(id_pagina: string, js_propos){
    // Inicializar Objeto Parametros
    // let httpParams = new HttpParams();

    // Crear Query Params
    // httpParams = httpParams.append('id_pagina', id_pagina);
    // httpParams = httpParams.append('js_propag', js_propag);

    //return this.http.post(`${this.url}/pagina-propag`, null, { params: httpParams });
    return this.http.post(`${this.url}/pagina-propos`, {js_propos, id_pagina});
  };
}
