import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-menubar',
    templateUrl: './menubar.component.html',
    styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

   @Input('menuList') items: MenuItem[];

   constructor() { }
   
   ngOnInit() {

   }
}
