import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PuntoAtencion } from 'src/app/models/PuntoAtencion';
import { PuntoAtencionService } from 'src/app/providers/puntosdeatencion/punto-atencion.service';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { ToastrService } from 'ngx-toastr';

declare var H: any;

@Component({
  selector: 'app-punto-atencion',
  templateUrl: './punto-atencion.component.html',
  styleUrls: ['./punto-atencion.component.css']
})
export class PuntoAtencionComponent extends BaseComponent implements AfterViewInit {

  @ViewChild("map", { static: false })
  public mapElement: ElementRef;

  puntosDeAtencion: { marker: any, punto: PuntoAtencion}[] = [];

  nombre = '';
  map: any;

  public constructor(public readonly router: Router
    , public readonly errorService: ErrorService
    , public readonly toast: ToastrService
    ,private readonly puntoDeAtencionService: PuntoAtencionService) {
      super(router, errorService, toast);
      this.platform = new H.service.Platform({
        "apikey": "BNBi1cMp5htkcfPgw6a6HBPF06ymGygntZdlmEdPTZw"
      });
  }

  public ngAfterViewInit() {
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

    this.map.addEventListener('tap', (evt) => {
      this.añadirMarcador(evt, ui);
    });

    this.puntoDeAtencionService.obtenerPuntosDeAtencion()
    .subscribe(punto => {
      const marker = this.construirMarcador(punto.latitud, punto.longitud);
      this.map.addObject(marker);
      this.puntosDeAtencion = [...this.puntosDeAtencion, { marker, punto }];
    });

  }

  construirMarcador(latitud: number, longitud: number): any {
    return new H.map.Marker({
      lat: latitud,
      lng: longitud
    });
  }

  añadirMarcador(evt, ui): void {
    if(this.nombre && this.nombre !== '' ) {
    const coord = this.map.screenToGeo(evt.currentPointer.viewportX,
      evt.currentPointer.viewportY);
    const latitud = coord.lat.toFixed(4);
    const longitud = coord.lng.toFixed(4);
    const marker = this.construirMarcador(latitud, longitud);
    this.map.addObject(marker);

    const punto = new PuntoAtencion('', this.nombre, latitud, longitud);
    this.puntosDeAtencion = [...this.puntosDeAtencion, { marker , punto }];

    }
    // const informacion = this.construirformacionDelMarcador(latitud, longitud);
    // ui.addBubble(informacion);
  }

  construirformacionDelMarcador(latitud: number, longitud: number): any {
    return new H.ui.InfoBubble({ lat: latitud, lng: longitud }, {
      content: '<b>Hello World!</b>'
    });
  }

  eliminarMarcador(punto: any) {
    this.puntosDeAtencion = this.puntosDeAtencion.filter(puntoAtencion => puntoAtencion !== punto);
    this.map.removeObject(punto.marker);
  }

  guardarPuntos = (): void => {
      this.puntoDeAtencionService
      .guardarPuntoDeAtencion(this.puntosDeAtencion
        .map(puntoEnElMapa => puntoEnElMapa.punto))
        .subscribe(()=> this.toast.success('Puntos de atención guardados')
        , error => this.handleException(error));
  }

}
