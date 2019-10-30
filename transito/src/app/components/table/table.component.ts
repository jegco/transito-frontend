import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})

export class TableComponent implements OnInit {

  @Input() displayedColumns: string[];
  @Input() dataSource: any[];
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() hasActions: boolean;

  tableDataSource = new MatTableDataSource(this.dataSource);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.tableDataSource.sort = this.sort;
  }

  getValueAtIndex(entity: any, index: number) {
    return entity[Object.keys(entity)[index]];
  }

  getColumnsTodisplay() {
    if( this.hasActions ) {
      this.displayedColumns.push("Actions");
    }
    return this.displayedColumns;
  }

  updateElement(row) {
    this.update.emit(row);
  }

  deleteElement(row) {
    this.delete.emit(row);
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

}
