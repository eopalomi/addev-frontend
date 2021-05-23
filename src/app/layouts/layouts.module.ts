import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NgPrimefacesModule } from '../shared/libraries/ng-primefaces.module';
import { PagesContainerModule } from '../modules/pages-container/pages-container.module';


@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    PagesContainerModule,
    NgPrimefacesModule
  ]
})
export class LayoutsModule { }
