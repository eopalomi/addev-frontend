import { Component } from '@angular/core';
import {
    columnGridOptions,
    flexDirectionGridOptions,
    justifyContentOptions,
    rowGridOptions,
    alignItemsOptions,
    gapOptions,
    containerColumnOptions,
    containerRowOptions,
    containerGridIdOptions
} from '../../services/form-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';

interface dropdownOptions {
    name: string;
    code: string;
};

interface grid {
    numberOfGrid: number;
    gridColumn: string;
    gridRow: string;
    FlexDirection: string;
    FlexJustifyContent: string;
    FlexAlignItems: string;
    FlexGap: string;
};

@Component({
    selector: 'app-create-container',
    templateUrl: './create-container.component.html',
    styleUrls: ['./create-container.component.css'],
    providers: [MessageService]
})
export class CreateContainerComponent {
    idContainer: number | null = null;
    containerName: string = '';

    containerColumnOptions: dropdownOptions[] | undefined;
    selectedContainerColumn: dropdownOptions | undefined;

    containerRowOptions: dropdownOptions[] | undefined;
    selectedContainerRow: dropdownOptions | undefined;

    justifyContainerOptions: dropdownOptions[] | undefined;
    selectedJustifyContainer: dropdownOptions | undefined;

    gapContainerOptions: dropdownOptions[] | undefined;
    selectedGapContainer: dropdownOptions | undefined;
    
    containerGridIdOptions: dropdownOptions[] | undefined;
    selectedContainerGridId: dropdownOptions | undefined;

    columnGridOptions: dropdownOptions[] | undefined;
    selectedcolumnGrid: dropdownOptions | undefined;

    rowGridOptions: dropdownOptions[] | undefined;
    selectedrowGrid: dropdownOptions | undefined;

    flexDirectionGridOptions: dropdownOptions[] | undefined;
    selectedflexDirectionGrid: dropdownOptions | undefined;

    justifyContentGridOptions: dropdownOptions[] | undefined;
    selectedjustifyContentGrid: dropdownOptions | undefined;

    alignItemsGridOptions: dropdownOptions[] | undefined;
    selectedAlignItemsGrid: dropdownOptions | undefined;

    gapGridOptions: dropdownOptions[] | undefined;
    selectedgapGrid: dropdownOptions | undefined;

    grids: grid[] | undefined = [];
    selectedGrid: grid | undefined;

    idForUpdateGrid: number | null;

    containerSubheader: string;
    containerHeader: string;
    constructor(private httpClient: HttpClient, private messageService: MessageService){}

    ngOnInit() {
        // this.containerSubheader = 'CONTAINER ID: 5026';
        this.containerSubheader = '';
        this.containerHeader = 'Create New Container';

        
        this.justifyContainerOptions = justifyContentOptions;
        this.gapContainerOptions = gapOptions;
        this.containerColumnOptions = containerColumnOptions;
        this.containerRowOptions = containerRowOptions;
        
        this.containerGridIdOptions = containerGridIdOptions;
        this.columnGridOptions = columnGridOptions;
        this.rowGridOptions = rowGridOptions;
        this.flexDirectionGridOptions = flexDirectionGridOptions;
        this.justifyContentGridOptions = justifyContentOptions;
        this.alignItemsGridOptions = alignItemsOptions;
        this.gapGridOptions = gapOptions;
    }

    saveContainer(){
        const body = {
            name: this.containerName,
            justifyContentValue: this.selectedJustifyContainer.name,
            gapValue: this.selectedGapContainer.name,
            gridColumns: this.selectedContainerColumn.name,
            gridRows: this.selectedContainerRow.name,
            gridList: this.grids
        };

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.httpClient.post(`http://165.227.68.255:52600/render-manager/v1/container`, body, {headers: headers}).subscribe(
            (res:any)=>{
                this.idContainer = parseInt(res.container)
                this.containerSubheader = `CONTAINER ID: ${this.idContainer}`
                this.containerHeader = `Update Container`
                this.showSuccess();
                console.log("res", res);
            },
            (error)=>{
                console.log("error", error);
            },
        );
    };

    addGrid(){
        this.grids.push({
            numberOfGrid: parseInt(this.selectedContainerGridId.code),
            gridColumn: this.selectedcolumnGrid.code,
            gridRow: this.selectedrowGrid.code,
            FlexDirection:this.selectedflexDirectionGrid.code,
            FlexJustifyContent: this.selectedjustifyContentGrid.code,
            FlexAlignItems: this.selectedAlignItemsGrid.code,
            FlexGap: this.selectedgapGrid.code
        })
    }

    removeGrid(numberOfGrid: number){
        const indexGrid = this.grids.findIndex(obj => obj.numberOfGrid === numberOfGrid)

        this.grids.splice(indexGrid, 1);
    }

    selectGrid = (numberOfGrid: number) => {
        this.idForUpdateGrid = numberOfGrid;
        
        const [gridSelected] = this.grids.filter((grid)=> grid.numberOfGrid === numberOfGrid)
        
        const properties = [
            {property: 'numberOfGrid', name:'selectedContainerGridId'},
            {property: 'gridColumn', name:'selectedcolumnGrid' },
            {property: 'gridRow', name:'selectedrowGrid' },
            {property: 'FlexDirection', name:'selectedflexDirectionGrid' },
            {property: 'FlexJustifyContent', name:'selectedjustifyContentGrid' },
            {property: 'FlexAlignItems', name:'selectedAlignItemsGrid' },
            {property: 'FlexGap', name:'selectedgapGrid'}
        ];

        properties.forEach((prop)=>{
            const dropDownvalue = prop.property ==='numberOfGrid' ? String(gridSelected[prop.property]) : gridSelected[prop.property]; 

            this[`${prop.name}`] = {name: dropDownvalue, code: dropDownvalue};
        });
    }

    cleanGrid(){
        const properties = [
            {property: 'numberOfGrid', name:'selectedContainerGridId'},
            {property: 'gridColumn', name:'selectedcolumnGrid' },
            {property: 'gridRow', name:'selectedrowGrid' },
            {property: 'FlexDirection', name:'selectedflexDirectionGrid' },
            {property: 'FlexJustifyContent', name:'selectedjustifyContentGrid' },
            {property: 'FlexAlignItems', name:'selectedAlignItemsGrid' },
            {property: 'FlexGap', name:'selectedgapGrid'}
        ];

        properties.forEach((prop)=> this[`${prop.name}`] = undefined );
        this.idForUpdateGrid = null;
    }

    updateGrid(){
        const properties = [
            {property: 'numberOfGrid', name:'selectedContainerGridId'},
            {property: 'gridColumn', name:'selectedcolumnGrid' },
            {property: 'gridRow', name:'selectedrowGrid' },
            {property: 'FlexDirection', name:'selectedflexDirectionGrid' },
            {property: 'FlexJustifyContent', name:'selectedjustifyContentGrid' },
            {property: 'FlexAlignItems', name:'selectedAlignItemsGrid' },
            {property: 'FlexGap', name:'selectedgapGrid'},
        ];
        
        this.grids.forEach((grid)=>{
            if (grid.numberOfGrid === this.idForUpdateGrid) {
                grid.numberOfGrid = parseInt(this.selectedContainerGridId.name);
                grid.gridColumn = this.selectedcolumnGrid.name;
                grid.gridRow = this.selectedrowGrid.name;
                grid.FlexDirection = this.selectedflexDirectionGrid.name;
                grid.FlexJustifyContent = this.selectedjustifyContentGrid.name;
                grid.FlexAlignItems = this.selectedAlignItemsGrid.name;
                grid.FlexGap = this.selectedgapGrid.name;
            }
        });

        properties.forEach((prop) => this[`${prop.name}`] = undefined);
        this.idForUpdateGrid = null;
    }

    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'OK', detail: `Contenedor creado exitosamente ID: ${this.idContainer}` });
    }

    showPrueba() {
        console.log("prueba 1")
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Contenedor creado exitosamente ID` });
    }
}
