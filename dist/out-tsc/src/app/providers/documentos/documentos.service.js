import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
let DocumentosService = class DocumentosService {
    constructor(http) {
        this.http = http;
        this.url = `${ENV.serverUrl}/documentos`;
        this.resourceUrl = `${this.url}/resources`;
        this.guardarDocumentos = (documentos) => {
            return this.http.postMultipart(this.url, documentos);
        };
        this.guardarDocumento = (documentos) => {
            return this.http.postMultipart(this.url, documentos);
        };
        this.buscarDocumentos = () => {
            return this.http.get(this.url);
        };
        this.buscarDocumentoPorNombre = (nombre) => {
            return this.http.getResource(this.url, nombre);
        };
        this.eliminarDocumento = (documento) => {
            return this.http.delete(this.url, documento);
        };
        this.descargarDocumento = (documento) => {
            return this.http.getBlob(`http://${documento.rutaDeDescarga}`);
        };
    }
};
DocumentosService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], DocumentosService);
export { DocumentosService };
//# sourceMappingURL=documentos.service.js.map