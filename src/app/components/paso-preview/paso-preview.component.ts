import { Component, OnInit, Input } from '@angular/core';
import { Paso } from 'src/app/models/Paso';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-paso-preview',
  templateUrl: './paso-preview.component.html',
  styleUrls: ['./paso-preview.component.css']
})
export class PasoPreviewComponent {

  @Input()
  paso: Paso;

  @Input()
  index: number;

  colorPrimario;

  constructor(private readonly sanitizer: DomSanitizer) {
    this.colorPrimario = localStorage.getItem('colorPrimario');
  }

  descripcionComoHTML = (paso: Paso) => {
    return this.sanitizer.bypassSecurityTrustHtml(paso.descripcion);
  }

}
