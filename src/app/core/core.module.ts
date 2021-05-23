import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Librerias
import { NgPrimefacesModule } from '../shared/libraries/ng-primefaces.module';

//Modulos
import { SharedModule } from '../shared/shared.module';

// Components
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class CoreModule { }
