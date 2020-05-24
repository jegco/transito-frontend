import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { concatAll } from 'rxjs/operators';
let PuntoAtencionService = class PuntoAtencionService {
    constructor(http) {
        this.http = http;
        this.url = ENV.serverUrl + '/puntoDeAtencion';
    }
    obtenerPuntosDeAtencion() {
        return this.http.get(this.url)
            .pipe(concatAll());
    }
    guardarPuntoDeAtencion(puntosDeAtencion) {
        return this.http.post(this.url, puntosDeAtencion);
    }
    eliminarPuntoAtencion(puntoDeAtencion) {
        return this.http.delete(this.url, puntoDeAtencion);
    }
};
PuntoAtencionService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PuntoAtencionService);
export { PuntoAtencionService };
//# sourceMappingURL=punto-atencion.service.js.map