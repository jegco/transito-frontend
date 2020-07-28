import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
let DocumentosComponent = class DocumentosComponent extends BaseComponent {
    constructor(router, errorService, toast, documentosService) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.documentosService = documentosService;
        this.obtenerDatosTablaDocumentos = (documentos) => {
            return documentos.map(documento => {
                const { nombre, fechaCreacion, fechaActualizacion } = documento;
                return { nombre, fechaCreacion, fechaActualizacion };
            });
        };
        this.actualizarDocumento = (documento) => {
            this.temp = documento;
            this.fileInputReference.nativeElement.click();
        };
        this.eliminarDocumento = (documento, documentos) => {
            this.documentosService.eliminarDocumento(documento)
                .subscribe(() => {
                this.toast.success('Documento eliminado satisfactoriamente');
                documentos.filter(doc => doc === documento);
            }, error => this.handleException(error));
        };
        this.updateDocumento = (event, documento) => {
            if (event.length > 0) {
                for (const anexo of event) {
                    this.documentosService.guardarDocumento(anexo)
                        .subscribe(document => documento = document, error => this.handleException(error));
                }
            }
        };
    }
    ngOnInit() {
        this.documentos$ = this.documentosService
            .buscarDocumentos().pipe(catchError(error => {
            this.handleException(error);
            return of();
        }));
    }
};
tslib_1.__decorate([
    ViewChild('fileInput', { static: false })
], DocumentosComponent.prototype, "fileInputReference", void 0);
DocumentosComponent = tslib_1.__decorate([
    Component({
        selector: 'app-documentos',
        templateUrl: './documentos.component.html',
        styleUrls: ['./documentos.component.css']
    })
], DocumentosComponent);
export { DocumentosComponent };
//# sourceMappingURL=documentos.component.js.map