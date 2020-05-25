import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { PuntoAtencion } from 'src/app/models/PuntoAtencion';
import { BaseComponent } from 'src/app/pages/base/base.component';
let PuntoAtencionComponent = class PuntoAtencionComponent extends BaseComponent {
    constructor(router, errorService, toast, puntoDeAtencionService) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.puntoDeAtencionService = puntoDeAtencionService;
        this.puntosDeAtencion = [];
        this.nombre = '';
        this.latitud = 0;
        this.longitud = 0;
        this.addMarcador = () => {
            const marker = this.construirMarcador(this.latitud, this.longitud);
            this.map.addObject(marker);
            const punto = new PuntoAtencion('', this.nombre, this.latitud, this.longitud);
            this.puntosDeAtencion = [...this.puntosDeAtencion, { marker, punto }];
            const informacion = this.construirformacionDelMarcador(this.latitud, this.longitud, punto);
            this.ui.addBubble(informacion);
        };
        this.guardarPuntos = () => {
            this.puntoDeAtencionService
                .guardarPuntoDeAtencion(this.puntosDeAtencion
                .map(puntoEnElMapa => puntoEnElMapa.punto))
                .subscribe(() => this.toast.success('Puntos de atención guardados'), error => this.handleException(error));
        };
        this.platform = new H.service.Platform({
            apikey: 'BNBi1cMp5htkcfPgw6a6HBPF06ymGygntZdlmEdPTZw'
        });
    }
    ngAfterViewInit() {
        const defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(this.mapElement.nativeElement, defaultLayers.vector.normal.map, {
            zoom: 14,
            center: { lat: 10.406887, lng: -75.516103 }
        });
        const mapEvents = new H.mapevents.MapEvents(this.map);
        this.map.getViewPort().resize();
        // Instantiate the default behavior, providing the mapEvents object:
        const behavior = new H.mapevents.Behavior(mapEvents);
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
        this.map.addEventListener('tap', (evt) => {
            const coord = this.map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
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
    construirMarcador(latitud, longitud) {
        const pngIcon = new H.map.Icon('../../../assets/img/DATT.png', { size: { w: 30, h: 30 } });
        return new H.map.Marker({
            lat: latitud,
            lng: longitud
        }, { icon: pngIcon });
    }
    construirformacionDelMarcador(latitud, longitud, punto) {
        latitud;
        return new H.ui.InfoBubble({ lat: latitud + 0.01, lng: longitud }, {
            content: '<br>Hello</br>'
        });
    }
    eliminarMarcador(punto) {
        this.puntosDeAtencion = this.puntosDeAtencion.filter(puntoAtencion => puntoAtencion !== punto);
        this.map.removeObject(punto.marker);
    }
};
tslib_1.__decorate([
    ViewChild('map', { static: false })
], PuntoAtencionComponent.prototype, "mapElement", void 0);
PuntoAtencionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-punto-atencion',
        templateUrl: './punto-atencion.component.html',
        styleUrls: ['./punto-atencion.component.css']
    })
], PuntoAtencionComponent);
export { PuntoAtencionComponent };
//# sourceMappingURL=punto-atencion.component.js.map