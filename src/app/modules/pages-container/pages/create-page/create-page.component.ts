import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';

interface dropdownOptions {
  name: string;
  code: string;
}

interface Page {
   pageID: number,
   containerID: number
   pageName: string
   fieldsQuantity: number
}

interface PageRows {
   idRow: number,
   pageID: number,
   rowName: string,
   rowType: number,
   labelSize: number,
   fieldSize: number,
   order: number
}

interface PageDTO {
   idPage?: number,
   containerId: number,
   pageName: string,
   pageType: string,
   orderPosition: number,
   headerHeight: string,
   fieldType: string,
   fieldStyle: string,
   numberOfGrid: string,
   widthSize: string,
   headerColor: string,
   tableHeaderColor: string,
   fontHeaderColor: string,
   fonttableHeaderColor: string,
   paginator: boolean,
   showHeaderTable: boolean,
   search: boolean,
   devMode: boolean,
   tableCheck: boolean,
   pageTitle: boolean,
   tableSort: boolean,
}

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
  providers: [MessageService]
})
export class CreatePageComponent {
   titlePage = 'Create New Page';
   subtitlePage = '';

   pageID: number;
   containerID: number;
   pageName: string;

   pageTypeOptions: dropdownOptions [] = [
      {name:'Form', code: "F"},
      {name:'Table', code: "T"},
      {name:'Card 01', code: "C01"},
      {name:'Chart 01', code: "CH1"},
   ];
   selectedPageType: dropdownOptions;

   pageOrderOptions: dropdownOptions [] = [
      {name:'01', code: '1'},
      {name:'02', code: '2'},
      {name:'03', code: '3'},
      {name:'04', code: '4'},
      {name:'05', code: '5'},
      {name:'06', code: '6'},
      {name:'07', code: '7'},
      {name:'08', code: '8'},
      {name:'09', code: '9'},
      {name:'10', code: '10'},
      {name:'11', code: '11'},
      {name:'12', code: '12'},
   ];
   selectedPageOrder: dropdownOptions;

   pageHeaderHeigthOptions: dropdownOptions [] = [
      {name:'10px', code: '10'},
      {name:'15px', code: '15'},
      {name:'20px', code: '20'},
      {name:'25px', code: '25'},
      {name:'30px', code: '30'},
      {name:'35px', code: '35'},
      {name:'40px', code: '40'},
      {name:'45px', code: '45'},
      {name:'50px', code: '50'},
   ];
   selectedPageHeaderHeigth: dropdownOptions;

   pageFieldTypeOptions: dropdownOptions [] = [
      {name:'Vertical', code: 'VE'},
      {name:'Horizontal', code: 'HO'},
   ];
   selectedPageFieldType: dropdownOptions;

   pageFieldStyleOptions: dropdownOptions [] = [
      {name:'Filled', code: 'filled'},
      {name:'Outlined', code: 'outlined'},
   ];
   selectedPageFieldStyle: dropdownOptions;

   pageGridIDOptions: dropdownOptions [] = [
      {name:'01', code: '1'},
      {name:'02', code: '2'},
      {name:'03', code: '3'},
      {name:'04', code: '4'},
      {name:'05', code: '5'},
      {name:'06', code: '6'},
      {name:'07', code: '7'},
      {name:'08', code: '8'},
      {name:'09', code: '9'},
      {name:'10', code: '10'},
      {name:'11', code: '11'},
      {name:'12', code: '12'},
   ];
   selectedPageGridID: dropdownOptions;

   pageWidthSizeOptions: dropdownOptions [];
   selectedPageWidthSize: dropdownOptions;

   headerColor: string;
   TableHeaderColor: string;
   fontHeaderColor: string;
   fontTableHeaderColor: string;

   optionalSettings: string[] = [];

   rowID: number;
   rowName: string;

   rowTypeOptions: dropdownOptions [] = [
      {name:'01', code: '1'},
      {name:'02', code: '2'},
      {name:'03', code: '3'},
      {name:'04', code: '4'},
      {name:'05', code: '5'},
      {name:'06', code: '6'},
      {name:'07', code: '7'},
      {name:'08', code: '8'},
      {name:'09', code: '9'},
      {name:'10', code: '10'},
      {name:'11', code: '11'},
      {name:'12', code: '12'},
      {name:'13', code: '13'},
      {name:'14', code: '14'},
      {name:'100', code: '100'},
   ];
   selectedRowType: dropdownOptions;

   rowLabelSizeOptions: dropdownOptions [];
   selectedRowLabelSize: dropdownOptions;

   rowFieldSizeOptions: dropdownOptions [];
   selectedRowFieldSize: dropdownOptions;

   rowOrder: number;

   pageList: Page[] = [];
   pageAllRows: PageRows[] = [];
   pageSelectedRows: PageRows[] = [];

   selectedPage : Page | undefined | null;
   selectedPageRow : PageRows;

   listPageSaved: PageDTO[] = [];

   constructor(private httpClient: HttpClient, private messageService: MessageService){}

   ngOnInit(){
      this.pageWidthSizeOptions = Array(50).fill({name:'', code: ''}).map((obj, idx) =>{
         idx += 1;
         return {
            code: `${50*idx}px`,
            name: `${50*idx}px`
         };
      })
      
      this.rowLabelSizeOptions = Array(12).fill({name:'', code: ''}).map((value, idx)=>{
         idx += 1;
         return {
            code: `${idx}`,
            name: `${idx}`,
         }
      })

      this.rowFieldSizeOptions = Array(12).fill({name:'', code: ''}).map((value, idx)=>{
         idx += 1;
         return {
            code: `${idx}`,
            name: `${idx}`,
         }
      })      
   } 

   savePage = () => {
      const pageOptions: PageDTO = {
         containerId: this.containerID,
         pageName: this.pageName,
         pageType: this.selectedPageType.code,
         orderPosition: +this.selectedPageOrder.code,
         headerHeight: this.selectedPageHeaderHeigth.code,
         fieldType: this.selectedPageFieldType.code,
         fieldStyle: this.selectedPageFieldStyle.code,
         numberOfGrid: this.selectedPageGridID.code,
         widthSize: this.selectedPageWidthSize.code,
         headerColor: this.headerColor,
         tableHeaderColor: this.TableHeaderColor,
         fontHeaderColor: this.fontHeaderColor,
         fonttableHeaderColor: this.fontTableHeaderColor,
         paginator: this.optionalSettings.some((item)=> item === 'paginator'),
         showHeaderTable: this.optionalSettings.some((item)=> item === 'header'),
         search: this.optionalSettings.some((item)=> item === 'search'),
         devMode: this.optionalSettings.some((item)=> item === 'dev_mode'),
         tableCheck: this.optionalSettings.some((item)=> item === 'table_check'),
         pageTitle: this.optionalSettings.some((item)=> item === 'page_title'),
         tableSort: this.optionalSettings.some((item)=> item === 'table_sort'),
      };

      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      this.httpClient.post(`http://localhost:4141/render-manager/v1/page`, pageOptions, {headers: headers}).subscribe(
         (res:any) => {
            this.pageID = res.pageID;
            this.listPageSaved.push({...pageOptions, idPage: this.pageID});
            
            this.pageList.push({
               containerID: this.containerID,
               pageID: this.pageID,
               pageName: this.pageName,
               fieldsQuantity: 0
            });

            this.showSuccess(`Pagina creada exitosamente ID: ${this.pageID}`);

            this.pageID = undefined;
            this.pageName = '';
            this.selectedPageType = undefined;
            this.selectedPageOrder = undefined;
            this.selectedPageHeaderHeigth  = undefined;
            this.selectedPageFieldType  = undefined;
            this.selectedPageFieldStyle  = undefined;
            this.selectedPageGridID  = undefined; 
            this.selectedPageWidthSize  = undefined;
            this.headerColor  = undefined;
            this.TableHeaderColor  = undefined;
            this.fontHeaderColor  = undefined;
            this.fontTableHeaderColor  = undefined;
            this.optionalSettings = [];
         },
         (error) => {
             console.log("error", error);
         },
     );
   };

   showSuccess(msg: string) {
      this.messageService.add({ severity: 'success', summary: 'OK', detail: msg});
   };

   update = () => {
      const pageOptions: PageDTO = {
         idPage: this.pageID,
         containerId: this.containerID,
         pageName: this.pageName,
         pageType: this.selectedPageType.code,
         orderPosition: +this.selectedPageOrder.code,
         headerHeight: this.selectedPageHeaderHeigth.code,
         fieldType: this.selectedPageFieldType.code,
         fieldStyle: this.selectedPageFieldStyle.code,
         numberOfGrid: this.selectedPageGridID.code,
         widthSize: this.selectedPageWidthSize.code,
         headerColor: this.headerColor,
         tableHeaderColor: this.TableHeaderColor,
         fontHeaderColor: this.fontHeaderColor,
         fonttableHeaderColor: this.fontTableHeaderColor,
         paginator: this.optionalSettings.some((item)=> item === 'paginator'),
         showHeaderTable: this.optionalSettings.some((item)=> item === 'header'),
         search: this.optionalSettings.some((item)=> item === 'search'),
         devMode: this.optionalSettings.some((item)=> item === 'dev_mode'),
         tableCheck: this.optionalSettings.some((item)=> item === 'table_check'),
         pageTitle: this.optionalSettings.some((item)=> item === 'page_title'),
         tableSort: this.optionalSettings.some((item)=> item === 'table_sort'),
      };
      
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      this.httpClient.patch(`http://localhost:4141/render-manager/v1/page`, pageOptions, {headers: headers}).subscribe(
         (res:any) => {
            const updatedListPageSaved = this.listPageSaved.filter((item) => item.idPage !== this.pageID);
            this.listPageSaved = updatedListPageSaved;
            this.listPageSaved.push(pageOptions);

            const updatedListPages = this.pageList.filter((item) => item.pageID !== this.pageID);
            this.pageList = updatedListPages;

            this.pageList.push({
               containerID: this.containerID,
               pageID: this.pageID,
               pageName: this.pageName,
               fieldsQuantity: 0
            });

            this.showSuccess(`Pagina Actualizada exitosamente`);
         },
         (error) => {
             console.log("error", error);
         },
     );
   }

   onSelectionPageChange() {
      if (!this.selectedPage){
         this.pageID = undefined;
         this.pageName = '';
         this.selectedPageType = undefined;
         this.selectedPageOrder = undefined;
         this.selectedPageHeaderHeigth  = undefined;
         this.selectedPageFieldType  = undefined;
         this.selectedPageFieldStyle  = undefined;
         this.selectedPageGridID  = undefined; 
         this.selectedPageWidthSize  = undefined;
         this.headerColor  = undefined;
         this.TableHeaderColor  = undefined;
         this.fontHeaderColor  = undefined;
         this.fontTableHeaderColor  = undefined;
         this.optionalSettings = [];
         this.titlePage = 'Create New Page';
         this.subtitlePage = '';
         this.pageSelectedRows = [];
         
         this.rowID = null;
         this.rowName = null;
         this.selectedRowType = null;
         this.selectedRowLabelSize = null;
         this.selectedRowFieldSize = null;
         this.rowOrder = null;
         this.selectedPageRow = null;
      };

      if (this.selectedPage) {
         this.rowID = null;
         this.rowName = null;
         this.selectedRowType = null;
         this.selectedRowLabelSize = null;
         this.selectedRowFieldSize = null;
         this.rowOrder = null;
         this.selectedPageRow = null;

         const pageSaved = this.listPageSaved.find((item) => item.idPage === this.selectedPage.pageID);
         this.pageID = this.selectedPage.pageID;

         this.pageSelectedRows = this.pageAllRows.filter((item)=> item.pageID === this.pageID);
         
         if (!pageSaved){
            return
         };

         this.pageID = pageSaved.idPage;
         this.pageName = pageSaved.pageName;
         this.selectedPageType = this.pageTypeOptions.find((item) => item.code === pageSaved.pageType);
         this.selectedPageOrder = this.pageOrderOptions.find((item) => +item.code === pageSaved.orderPosition);
         this.selectedPageHeaderHeigth  = this.pageHeaderHeigthOptions.find((item) => item.code === pageSaved.headerHeight);
         this.selectedPageFieldType  = this.pageFieldTypeOptions.find((item) => item.code === pageSaved.fieldType);
         this.selectedPageFieldStyle  = this.pageFieldStyleOptions.find((item) => item.code === pageSaved.fieldStyle);
         this.selectedPageGridID  = this.pageGridIDOptions.find((item) => item.code === pageSaved.numberOfGrid); 
         this.selectedPageWidthSize  = this.pageWidthSizeOptions.find((item) => item.code === pageSaved.widthSize);
         this.headerColor  = pageSaved.headerColor;
         this.TableHeaderColor  = pageSaved.tableHeaderColor;
         this.fontHeaderColor  = pageSaved.fontHeaderColor;
         this.fontTableHeaderColor  = pageSaved.fonttableHeaderColor;

         const pageOptions = {
            paginator: pageSaved.paginator,
            header: pageSaved.showHeaderTable,
            search: pageSaved.search,
            dev_mode: pageSaved.devMode,
            table_check: pageSaved.tableCheck,
            page_title: pageSaved.pageTitle,
            table_sort: pageSaved.tableSort,
          };

         this.optionalSettings = Object.entries(pageOptions)
                                 .filter(([key,value]) => value)
                                 .map(([key])=>key);

         this.titlePage = 'Update Page';
         this.subtitlePage = 'Page ID: ' + pageSaved.idPage;
      }
      
   }

   addRow = () => {
      const body = {
         rowID: this.rowID,
         idPage: this.selectedPage.pageID,
         rowName: this.rowName,
         rowType: +this.selectedRowType.code,
         rowLabelSize: +this.selectedRowLabelSize.code,
         rowFieldSize: +this.selectedRowFieldSize.code,
         rowOrder: this.rowOrder
      }

      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      this.httpClient.post(`http://localhost:4141/render-manager/v1/page/rows`, body, {headers: headers}).subscribe(
         (res:any) => {
            this.pageAllRows.push({
               idRow: this.rowID,
               pageID: this.selectedPage.pageID,
               rowName: this.rowName,
               rowType: +this.selectedRowType.code,
               labelSize: +this.selectedRowLabelSize.code,
               fieldSize: +this.selectedRowFieldSize.code,
               order: this.rowOrder
            });
      
            this.pageSelectedRows.push({
               idRow: this.rowID,
               pageID: this.selectedPage.pageID,
               rowName: this.rowName,
               rowType: +this.selectedRowType.code,
               labelSize: +this.selectedRowLabelSize.code,
               fieldSize: +this.selectedRowFieldSize.code,
               order: this.rowOrder
            });
            
            this.rowID = null;
            this.rowName = null;
            this.selectedRowType = null;
            this.selectedRowLabelSize = null;
            this.selectedRowFieldSize = null;
            this.rowOrder = null;
            
            this.showSuccess(`Se agrego el campo exitosamente`);
         },
         (error) => {
             console.log("error", error);
         },
     );
   };

   updateRow(){
      const body = {
         rowID: this.rowID,
         idPage: this.selectedPage.pageID,
         rowName: this.rowName,
         rowType: +this.selectedRowType.code,
         rowLabelSize: +this.selectedRowLabelSize.code,
         rowFieldSize: +this.selectedRowFieldSize.code,
         rowOrder: this.rowOrder
      }

      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      this.httpClient.patch(`http://localhost:4141/render-manager/v1/page/rows`, body, {headers: headers}).subscribe(
         (res:any) => {
            console.log("this.pageAllRows", this.pageAllRows)
            this.pageAllRows = this.pageAllRows.filter((item) => !(item.pageID === this.selectedPage.pageID && +item.idRow === +this.rowID))
            
            console.log("this.pageAllRows actualizado: ", this.pageAllRows)
            console.log("body: ", {
               idRow: +this.rowID,
               pageID: +this.selectedPage.pageID,
               rowName: this.rowName,
               rowType: +this.selectedRowType.code,
               labelSize: +this.selectedRowLabelSize.code,
               fieldSize: +this.selectedRowFieldSize.code,
               order: this.rowOrder
            })
            this.pageAllRows.push({
               idRow: +this.rowID,
               pageID: +this.selectedPage.pageID,
               rowName: this.rowName,
               rowType: +this.selectedRowType.code,
               labelSize: +this.selectedRowLabelSize.code,
               fieldSize: +this.selectedRowFieldSize.code,
               order: this.rowOrder
            });
      
            this.pageSelectedRows = this.pageSelectedRows.filter((item)=> !(item.pageID === this.selectedPage.pageID && +item.idRow === +this.rowID))
            console.log("pageSelectedRows: ", this.pageSelectedRows)
            console.log("body: ", {
               idRow: +this.rowID,
               pageID: +this.selectedPage.pageID,
               rowName: this.rowName,
               rowType: +this.selectedRowType.code,
               labelSize: +this.selectedRowLabelSize.code,
               fieldSize: +this.selectedRowFieldSize.code,
               order: +this.rowOrder
            })
            this.pageSelectedRows.push({
               idRow: this.rowID,
               pageID: this.selectedPage.pageID,
               rowName: this.rowName,
               rowType: +this.selectedRowType.code,
               labelSize: +this.selectedRowLabelSize.code,
               fieldSize: +this.selectedRowFieldSize.code,
               order: this.rowOrder
            });
            
            this.rowID = null;
            this.rowName = null;
            this.selectedRowType = null;
            this.selectedRowLabelSize = null;
            this.selectedRowFieldSize = null;
            this.rowOrder = null;
            
            this.showSuccess(`Se actualizo el campo exitosamente`);
         },
         (error) => {
             console.log("error", error);
         },
     );
   }

   onSelectionRowChange = () => {
      if (this.selectedPageRow) {
         this.rowID = this.selectedPageRow.idRow;
         this.rowName = this.selectedPageRow.rowName;
         this.selectedRowType = this.rowTypeOptions.find((item) => +item.code === this.selectedPageRow.rowType);
         this.selectedRowLabelSize = this.rowLabelSizeOptions.find((item) => +item.code === this.selectedPageRow.labelSize);
         this.selectedRowFieldSize = this.rowFieldSizeOptions.find((item) => +item.code === this.selectedPageRow.fieldSize);
         this.rowOrder = this.selectedPageRow.order;
      };

      if (!this.selectedPageRow) {
         this.rowID = null;
         this.rowName = null;
         this.selectedRowType = null;
         this.selectedRowLabelSize = null;
         this.selectedRowFieldSize = null;
         this.rowOrder = null;
      };

      console.log("here 1 = ", this.selectedPageRow)
   };

   deleteRow(idRow: number){
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      this.httpClient.delete(`http://localhost:4141/render-manager/v1/page/rows/${this.selectedPage.pageID}/${idRow}`,{headers: headers}).subscribe(
         (res:any) => {
            this.pageAllRows = this.pageAllRows.filter((item) => !(item.pageID === this.selectedPage.pageID && +item.idRow === +idRow))
            
            this.pageSelectedRows = this.pageSelectedRows.filter((item)=> !(item.pageID === this.selectedPage.pageID && +item.idRow === +idRow))
  
            this.rowID = null;
            this.rowName = null;
            this.selectedRowType = null;
            this.selectedRowLabelSize = null;
            this.selectedRowFieldSize = null;
            this.rowOrder = null;
            
            this.showSuccess(`Se elimino el campo exitosamente`);
         },
         (error) => {
             console.log("error", error);
         },
     );
   }

   deletePage(idPage: number){
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      this.httpClient.delete(`http://localhost:4141/render-manager/v1/page/${idPage}`,{headers: headers}).subscribe(
         (res:any) => {
            this.pageAllRows = this.pageAllRows?.filter((item) => +item.pageID !== +idPage)

            this.listPageSaved = this.listPageSaved?.filter((item) => +item.idPage !== +idPage)
            this.pageList = this.pageList?.filter((item) => +item.pageID !== +idPage)
            
            if (this.selectedPage){
               this.selectedPage = null;
               this.pageID = undefined;
               this.pageName = '';
               this.selectedPageType = undefined;
               this.selectedPageOrder = undefined;
               this.selectedPageHeaderHeigth  = undefined;
               this.selectedPageFieldType  = undefined;
               this.selectedPageFieldStyle  = undefined;
               this.selectedPageGridID  = undefined; 
               this.selectedPageWidthSize  = undefined;
               this.headerColor  = undefined;
               this.TableHeaderColor  = undefined;
               this.fontHeaderColor  = undefined;
               this.fontTableHeaderColor  = undefined;
               this.optionalSettings = [];
               this.titlePage = 'Create New Page';
               this.subtitlePage = '';
               this.pageSelectedRows = [];
            }

            this.showSuccess(`Se elimino la pagina exitosamente`);
         },
         (error) => {
             console.log("error", error);
         },
     );
   }
};
