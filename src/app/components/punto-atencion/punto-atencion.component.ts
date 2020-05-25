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

  @ViewChild('map', { static: false })
  public mapElement: ElementRef;

  puntosDeAtencion: { marker: any, punto: PuntoAtencion }[] = [];

  nombre = '';
  direccion = '';
  latitud = 0;
  longitud = 0;
  map: any;
  ui: any;

  public constructor(
    public readonly router: Router,
    public readonly errorService: ErrorService,
    public readonly toast: ToastrService,
    private readonly puntoDeAtencionService: PuntoAtencionService) {
    super(router, errorService, toast);
    this.platform = new H.service.Platform({
      apikey: 'BNBi1cMp5htkcfPgw6a6HBPF06ymGygntZdlmEdPTZw'
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

    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

    this.map.addEventListener('tap', (evt) => {
      const coord = this.map.screenToGeo(evt.currentPointer.viewportX,
        evt.currentPointer.viewportY);
      this.latitud = coord.lat.toFixed(4);
      this.longitud = coord.lng.toFixed(4);
    });

    this.puntoDeAtencionService.obtenerPuntosDeAtencion()
      .subscribe(punto => {
        const marker = this.construirMarcador(punto.latitud, punto.longitud);
        this.map.addObject(marker);
        this.puntosDeAtencion = [...this.puntosDeAtencion, { marker, punto }];
      });

  }

  construirMarcador(latitud: number, longitud: number): any {
    const pngIcon = new H.map.Icon('../../../assets/img/DATT.png', { size: { w: 30, h: 30 } });

    return new H.map.Marker({
      lat: latitud,
      lng: longitud
    }, { icon: pngIcon });
  }

  addMarcador = (): void => {
      const marker = this.construirMarcador(this.latitud, this.longitud);
      this.map.addObject(marker);

      const punto = new PuntoAtencion('', this.nombre, this.direccion, this.latitud, this.longitud);
      this.puntosDeAtencion = [...this.puntosDeAtencion, { marker, punto }];
  }

  eliminarMarcador(punto: any) {
    this.puntosDeAtencion = this.puntosDeAtencion.filter(puntoAtencion => puntoAtencion !== punto);
    this.map.removeObject(punto.marker);
  }

  guardarPuntos = (): void => {
    this.puntoDeAtencionService
      .guardarPuntoDeAtencion(this.puntosDeAtencion
        .map(puntoEnElMapa => puntoEnElMapa.punto))
      .subscribe(() => this.toast.success('Puntos de atención guardados')
        , error => this.handleException(error));
  }

}
