import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports Primefaces
import { TabViewModule} from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { CardModule} from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToolbarModule} from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import {CheckboxModule} from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { ColorPickerModule } from 'primeng/colorpicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    DropdownModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    ListboxModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    PanelMenuModule,
    PanelModule,
    SplitButtonModule,
    ToastModule,
    ToolbarModule,
    DividerModule,
    CheckboxModule,
    RippleModule,
    ColorPickerModule
  ],
  exports:[
    CardModule,
    DropdownModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    ListboxModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    PanelMenuModule,
    PanelModule,
    SplitButtonModule,
    ToastModule,
    ToolbarModule,
    DividerModule,
    CheckboxModule,
    RippleModule,
    ColorPickerModule
  ]
})
export class NgPrimefacesModule { }
