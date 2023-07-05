import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Shared
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPrimefacesModule } from 'src/app/shared/libraries/ng-primefaces.module';

// Pages
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SearchContainerComponent } from './pages/search-container/search-container.component';
import { EditContainerComponent } from './pages/edit-container/edit-container.component';
import { CreateContainerComponent } from './pages/create-container/create-container.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';

@NgModule({
  declarations: [
    SearchContainerComponent, 
    EditContainerComponent, CreateContainerComponent, CreatePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgPrimefacesModule
  ]
})
export class PagesContainerModule { }
