import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment as Env } from 'src/environments/environment';
let GuiaDetallesComponent = class GuiaDetallesComponent extends BaseComponent {
    constructor(router, errorService, toast, guiasService, documentosService, activatedRoute, sanitizer) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.guiasService = guiasService;
        this.documentosService = documentosService;
        this.activatedRoute = activatedRoute;
        this.sanitizer = sanitizer;
        this.mapRendered = false;
        this.descripcion = {};
        this.descripcionComoHTML = (guia) => {
            this.mapRendered = true;
            return this.sanitizer.bypassSecurityTrustHtml(guia.descripcion);
        };
        this.añadirMarcador = (puntos) => {
            puntos.forEach(punto => {
                this.map.addObject(this.construirMarcador(punto.latitud, punto.longitud));
            });
            // const informacion = this.construirformacionDelMarcador(latitud, longitud);
            // ui.addBubble(informacion);
        };
        this.construirMarcador = (latitud, longitud) => {
            const pngIcon = new H.map.Icon('../../../assets/img/DATT.png', {
                size: { w: 30, h: 30 }
            });
            return new H.map.Marker({
                lat: latitud,
                lng: longitud
            }, { icon: pngIcon });
        };
        this.descargarArchivo = (documento) => {
            this.documentosService.descargarDocumento(documento).subscribe(data => {
                const blob = new Blob([data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = documento.nombre;
                link.dispatchEvent(new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                }));
                setTimeout(() => {
                    window.open(url);
                    link.remove();
                }, 100);
            }, error => this.handleException(error));
        };
        this.platform = new H.service.Platform({
            apikey: 'BNBi1cMp5htkcfPgw6a6HBPF06ymGygntZdlmEdPTZw'
        });
    }
    ngOnInit() {
        this.activatedRoute.params
            .pipe(map(params => params.nombreGuia), switchMap(nombre => this.guiasService.buscarGuiaPorTitulo(nombre)), catchError(error => {
            this.handleException(error);
            return of();
        }))
            .subscribe(guia => {
            this.mapRendered = true;
            guia.anexo.rutaDeDescarga =
                Env.serverUrl + '/documentos/resource/' + guia.anexo.nombre;
            this.guia = guia;
            this.añadirMarcador(guia.puntosDeAtencion);
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
        const ui = H.ui.UI.createDefault(this.map, defaultLayers);
    }
};
tslib_1.__decorate([
    ViewChild('map', { static: false })
], GuiaDetallesComponent.prototype, "mapElement", void 0);
GuiaDetallesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-guia-detalles',
        templateUrl: './guia-detalles.component.html',
        styleUrls: ['./guia-detalles.component.css']
    })
], GuiaDetallesComponent);
export { GuiaDetallesComponent };
//# sourceMappingURL=guia-detalles.component.js.map