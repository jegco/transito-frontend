import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { BaseComponent } from 'src/app/pages/base/base.component';

@Component({
  selector: 'app-guia-item',
  templateUrl: './guia-item.component.html',
  styleUrls: ['./guia-item.component.css']
})
export class GuiaItemComponent implements OnInit {

  @Input() guia: GuiaDeTramite;
  @Output() details = new EventEmitter<GuiaDeTramite>();

  constructor() { }

  ngOnInit() {
  }

  showDetails(): void {
    this.details.emit(this.guia);
  }

}
