import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-guia-card',
  templateUrl: './guia-card.component.html',
  styleUrls: ['./guia-card.component.css']
})
export class GuiaCardComponent {

  @Input() guia: GuiaDeTramite;
  @Output() actualizaGuia = new EventEmitter();
  @Output() eliminaGuia = new EventEmitter();
  descripcion = {};

  constructor(private readonly sanitizer: DomSanitizer) { }

  actualizarGuia(guia): void {
    this.actualizaGuia.emit(guia);
  }

  descripcionComoHTML(descripcion: string) {
    return this.sanitizer.bypassSecurityTrustHtml(this.guia.descripcion);
  }

  eliminarGuia(guia): void {
    this.eliminaGuia.emit(guia);
  }

}
