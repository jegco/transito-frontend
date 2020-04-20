import { Component, OnInit, Input } from '@angular/core';
import { Paso } from 'src/app/models/Paso';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-paso',
  templateUrl: './paso.component.html',
  styleUrls: ['./paso.component.css']
})
export class PasoComponent implements OnInit {

  @Input()
  paso: Paso;

  @Input()
  index: number;
  imagenes: Array<any>;
  videos: Array<any>;
  archivos: Array<any>;

  constructor(private readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.imagenes = this.paso.anexos.filter(documento => documento.extension === 'jpg ' || documento.extension === 'png ')
    .map(documento => {
      return {
        image: `http://${documento.rutaDeDescarga}`,
        thumbImage: `http://${documento.rutaDeDescarga}`,
        alt: documento.nombre,
        title: documento.nombre
      }
    });

    this.videos = this.paso.anexos.filter(documento => documento.extension === 'mp4 ')
    .map(documento => {
      return {
        image: `http://${documento.rutaDeDescarga}`,
        thumbImage: `http://${documento.rutaDeDescarga}`,
        alt: documento.nombre,
        title: documento.nombre
      }
    });

    this.archivos = this.paso.anexos.filter(documento => documento.extension === 'pdf')
  }

  descripcionComoHTML = (descripcion: string) => {
    return this.sanitizer.bypassSecurityTrustHtml(descripcion);
  }

}
