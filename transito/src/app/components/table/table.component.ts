import { Component, Input, Output, EventEmitter, ViewChild, OnInit, DoCheck, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableComponent implements OnInit, DoCheck {

  @Input() displayedColumns: string[];
  @Input() dataSource: any[];
  @Output() properties = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() hasActions: boolean;
  @Input() showUpdate: boolean;
  @Input() showProperties: boolean;
  conlumnsToDisplay = [];
  tableDataSource = new MatTableDataSource(this.dataSource);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private changeDetectorRefs: ChangeDetectorRef) {
   }

  ngOnInit(): void {
    this.tableDataSource.sort = this.sort;
    this.conlumnsToDisplay = Array.from(this.displayedColumns);
  }

  ngDoCheck() {
    this.changeDetectorRefs.detectChanges();
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
    this.delete.emit(row);
  }

  showActions(column: string): boolean {
    return column !== 'Actions';
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

}
