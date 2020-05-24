import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
let TiposService = class TiposService {
    constructor(http) {
        this.http = http;
        this.url = ENV.serverUrl + '/tipos';
        this.buscarTipos = () => {
            return this.http.get(this.url);
        };
        this.guardarTipo = (tipo) => {
            return this.http.post(this.url, tipo);
        };
        this.eliminarTipo = (tipo) => {
            return this.http.delete(this.url, tipo);
        };
    }
};
TiposService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TiposService);
export { TiposService };
//# sourceMappingURL=tipos.service.js.map