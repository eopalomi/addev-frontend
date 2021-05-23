import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { AceEditorComponent } from './components/ace-editor/ace-editor.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { NgPrimefacesModule } from './libraries/ng-primefaces.module';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    AceEditorComponent, 
    MenubarComponent],
  imports: [
    CommonModule,
    NgPrimefacesModule
  ],
  exports:[
    AceEditorComponent,
    MenubarComponent
  ], providers: [
    MessageService
  ]
})
export class SharedModule { }
