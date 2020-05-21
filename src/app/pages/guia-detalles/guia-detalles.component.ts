import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { GuiasService } from 'src/app/providers/guiasdetramites/guias.service';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Documento } from 'src/app/models/Documento';
import { NgImageSliderComponent } from 'ng-image-slider';
import { DocumentosService } from 'src/app/providers/documentos/documentos.service';
import { PuntoAtencion } from 'src/app/models/PuntoAtencion';

declare var H: any;

@Component({
  selector: 'app-guia-detalles',
  templateUrl: './guia-detalles.component.html',
  styleUrls: ['./guia-detalles.component.css']
})

export class GuiaDetallesComponent extends BaseComponent implements OnInit, AfterViewInit {

  guia$: Observable<GuiaDeTramite>;
  imagenes: Array<any>;
  archivos: Array<Documento>;
  videos: Array<any>;
  descripcion = {};
  @ViewChild('nav', { static: true }) slider: NgImageSliderComponent;
  map: any;

  @ViewChild("map", { static: false })
  mapElement: ElementRef;

  constructor(public readonly router: Router
    , public readonly errorService: ErrorService
    , public readonly toast: ToastrService
    , private readonly guiasService: GuiasService
    , private readonly documentosService: DocumentosService
    , private readonly activatedRoute: ActivatedRoute
    , private readonly sanitizer: DomSanitizer) {
    super(router, errorService, toast);
    this.platform = new H.service.Platform({
      "apikey": "BNBi1cMp5htkcfPgw6a6HBPF06ymGygntZdlmEdPTZw"
    });
  }

  ngOnInit() {
    this.guia$ = this.activatedRoute.params
      .pipe(
        map(params => params['nombreGuia']),
        switchMap(nombre => this.guiasService.buscarGuiaPorTitulo(nombre)),
        tap(guia => this.obtenerMultimedia(guia.formularios)),
        catchError(error => {
          this.handleException(error);
          return of<GuiaDeTramite>();
        }))
  }

  ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 14,
        center: { lat: 10.406887, lng: -75.516103 }
      }
    );
    const mapEvents = new H.mapevents.MapEvents(this.map);
    this.map.getViewPort().resize();

    // Instantiate the default behavior, providing the mapEvents object:
    const behavior = new H.mapevents.Behavior(mapEvents);

    const ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }

  descripcionComoHTML = (guia: GuiaDeTramite) => {
    this.añadirMarcador(guia.puntosDeAtencion);
    return this.sanitizer.bypassSecurityTrustHtml(guia.descripcion);
  }

  añadirMarcador = (puntos: PuntoAtencion[]): void => {
    debugger;
    puntos.forEach(punto => {
      this.map.addObject(new H.map.Marker({
        lat: punto.latitud,
        lng: punto.longitud
      }));
    })
    // const informacion = this.construirformacionDelMarcador(latitud, longitud);
    // ui.addBubble(informacion);
  }

  obtenerMultimedia = (documentos: Documento[]) => {
    if (documentos.length !== 0) {
      this.imagenes = this.obtenerImagenes(documentos);
      this.videos = this.obtenerVideos(documentos);
      this.archivos = this.obtenerArchivos(documentos);
    }
  }

  obtenerImagenes = (documentos: Documento[]): Array<any> => {
    debugger;
    return documentos
      .filter(documento => documento.extension === 'jpg' || documento.extension === 'png')
      .map(documento => {
        return {
          image: documento.rutaDeDescarga,
          thumbImage: documento.rutaDeDescarga,
          alt: documento.nombre,
          title: documento.nombre
        }
      })
  }

  obtenerVideos = (documentos: Documento[]): Array<any> => {
    return documentos
      .filter(documento => documento.extension === 'mp4')
      .map(documento => {
        return {
          image: documento.rutaDeDescarga,
          thumbImage: documento.rutaDeDescarga
          ,
          alt: documento.nombre,
          title: documento.nombre
        }
      });
  }

  obtenerArchivos = (documentos: Documento[]): Array<any> => {
    return this.archivos = documentos.filter(documento => documento.extension === 'pdf');
  }

  descargarArchivo = (documento: Documento): void => {
    this.documentosService.descargarDocumento(documento).subscribe(
      data => {
        const blob = new Blob([data], { type: "application/pdf" })
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = documento.nombre;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          window.open(url);
          link.remove();
        }, 100);
      }, error => this.handleException(error));
  }

}
