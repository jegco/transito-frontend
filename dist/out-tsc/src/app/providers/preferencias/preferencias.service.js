import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
let PreferenciasService = class PreferenciasService {
    constructor(http) {
        this.http = http;
        this.url = ENV.serverUrl + '/preferencias';
        this.buscarPreferencias = () => {
            return this.http.get(this.url);
        };
        this.guardarPreferencias = (preferenciasDeUsuario) => {
            return this.http.post(this.url, preferenciasDeUsuario);
        };
    }
};
PreferenciasService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PreferenciasService);
export { PreferenciasService };
//# sourceMappingURL=preferencias.service.js.map