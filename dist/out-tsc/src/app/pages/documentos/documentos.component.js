import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { of } from 'rxjs';
import { filter, switchMap, catchError } from 'rxjs/operators';
let DocumentosComponent = class DocumentosComponent extends BaseComponent {
    constructor(router, errorService, toast, documentosService) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.documentosService = documentosService;
        this.columnas = ['nombre', 'fecha de creacion', 'fecha de actualizacion'];
    }
    ngOnInit() {
        this.documentos$ = this.documentosService
            .buscarDocumentos().pipe(catchError(error => {
            this.handleException(error);
            return of();
        }));
    }
    obtenerDatosTablaDocumentos(documentos) {
        return documentos.map(documento => {
            const { nombre, fechaCreacion, fechaActualizacion } = documento;
            return { nombre, fechaCreacion, fechaActualizacion };
        });
    }
    actualizarDocumento(index) {
    }
    eliminarDocumento(index) {
        debugger;
        this.documentos$.pipe(filter((documento, i) => i === index), switchMap(documento => this.documentosService.eliminarDocumento(documento))).subscribe(() => this.toast.success('Documento eliminado satisfactoriamente'), error => this.handleException(error));
    }
};
DocumentosComponent = tslib_1.__decorate([
    Component({
        selector: 'app-documentos',
        templateUrl: './documentos.component.html',
        styleUrls: ['./documentos.component.css']
    })
], DocumentosComponent);
export { DocumentosComponent };
//# sourceMappingURL=documentos.component.js.map