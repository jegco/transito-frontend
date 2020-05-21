import { Component, Input, Output, EventEmitter, ViewChild, OnInit, DoCheck, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableComponent implements OnInit, OnChanges {

  @Input() displayedColumns: string[];
  @Input() dataSource: any[];
  @Output() properties = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() hasActions: boolean;
  @Input() showUpdate: boolean;
  @Input() showProperties: boolean;
  @Input() showDelete: boolean;
  conlumnsToDisplay = [];
  tableDataSource = new MatTableDataSource(this.dataSource);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
   }

  ngOnInit(): void {
    this.tableDataSource = new MatTableDataSource(this.dataSource);
    this.tableDataSource.sort = this.sort;
    this.conlumnsToDisplay = Array.from(this.displayedColumns);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tableDataSource = new MatTableDataSource(changes.dataSource.currentValue);
  }

  getValueAtIndex(entity: any, index: number) {
    return entity[Object.keys(entity)[index]];
  }

  getColumnsTodisplay() {
    if ( this.hasActions && !this.conlumnsToDisplay.some(x => x === 'Actions')) {
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

  showActions(column: string): boolean {
    return column !== 'Actions';
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

}
