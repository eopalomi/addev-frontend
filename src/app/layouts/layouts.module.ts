import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NgPrimefacesModule } from '../shared/libraries/ng-primefaces.module';
import { PagesContainerModule } from '../modules/pages-container/pages-container.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [MainLayoutComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    LayoutsRoutingModule,
    PagesContainerModule,
    NgPrimefacesModule
  ]
})
export class LayoutsModule { }
