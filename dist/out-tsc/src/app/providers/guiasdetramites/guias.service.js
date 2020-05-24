import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { GuiaDeTramite } from 'src/app/models/GuiaDeTramite';
import { concatAll, defaultIfEmpty } from 'rxjs/operators';
import { Tipo } from 'src/app/models/Tipo';
import { Documento } from 'src/app/models/Documento';
let GuiasService = class GuiasService {
    constructor(http) {
        this.http = http;
        this.url = ENV.serverUrl + '/guias';
    }
    guardarGuia(guia) {
        return this.http.post(this.url, guia);
    }
    buscarGuias() {
        return this.http.get(this.url);
    }
    buscarGuiaPorTitulo(titulo) {
        return this.http.getResource(`${this.url}/titulo`, titulo)
            .pipe(concatAll(), defaultIfEmpty(new GuiaDeTramite('', '', '', [], [], new Tipo('', '', new Documento('', '', '', '', '', '', '')), '', [])));
    }
    eliminarGuia(guia) {
        return this.http.delete(this.url, guia);
    }
};
GuiasService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], GuiasService);
export { GuiasService };
//# sourceMappingURL=guias.service.js.map