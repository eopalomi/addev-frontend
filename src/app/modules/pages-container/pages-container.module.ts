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

@NgModule({
  declarations: [
    SearchContainerComponent, 
    EditContainerComponent
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
