import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
let TableComponent = class TableComponent {
    constructor() {
        this.properties = new EventEmitter();
        this.update = new EventEmitter();
        this.delete = new EventEmitter();
        this.conlumnsToDisplay = [];
        this.tableDataSource = new MatTableDataSource(this.dataSource);
    }
    ngOnInit() {
        this.tableDataSource = new MatTableDataSource(this.dataSource);
        this.tableDataSource.sort = this.sort;
        this.conlumnsToDisplay = Array.from(this.displayedColumns);
    }
    ngOnChanges(changes) {
        this.tableDataSource = new MatTableDataSource(changes.dataSource.currentValue);
    }
    getValueAtIndex(entity, index) {
        return entity[Object.keys(entity)[index]];
    }
    getColumnsTodisplay() {
        if (this.hasActions && !this.conlumnsToDisplay.some(x => x === 'Actions')) {
            this.conlumnsToDisplay.push('Actions');
        }
        return this.conlumnsToDisplay;
    }
    propertiesElement(row) {
        this.properties.emit(row);
    }
    updateElement(row) {
        this.update.emit(row);
    }
    deleteElement(row) {
        debugger;
        this.delete.emit(row);
    }
    showActions(column) {
        return column !== 'Actions';
    }
    applyFilter(filterValue) {
        this.tableDataSource.filter = filterValue.trim().toLowerCase();
    }
};
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "displayedColumns", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "dataSource", void 0);
tslib_1.__decorate([
    Output()
], TableComponent.prototype, "properties", void 0);
tslib_1.__decorate([
    Output()
], TableComponent.prototype, "update", void 0);
tslib_1.__decorate([
    Output()
], TableComponent.prototype, "delete", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "hasActions", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "showUpdate", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "showProperties", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "showDelete", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true })
], TableComponent.prototype, "sort", void 0);
TableComponent = tslib_1.__decorate([
    Component({
        selector: 'app-table',
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.css'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], TableComponent);
export { TableComponent };
//# sourceMappingURL=table.component.js.map