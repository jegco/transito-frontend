import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { of } from 'rxjs';
import { catchError, switchMap, filter } from 'rxjs/operators';
let GuiasdetramiteComponent = class GuiasdetramiteComponent extends BaseComponent {
    constructor(router, errorService, toast, guiasService) {
        super(router, errorService, toast);
        this.router = router;
        this.errorService = errorService;
        this.toast = toast;
        this.guiasService = guiasService;
    }
    ngOnInit() {
        this.guias$ = this.guiasService.buscarGuias()
            .pipe(catchError(error => {
            this.handleException(error);
            return of();
        }));
    }
    crearGuia() {
        this.openPage('dashboard/guardar-nueva-guia');
    }
    actualizarGuia(guia) {
        this.openPage(`dashboard/guardar-nueva-guia/${guia.titulo}`);
    }
    eliminarGuia(guiaAEliminar) {
        this.guiasService.eliminarGuia(guiaAEliminar)
            .pipe(switchMap(() => this.guias$.pipe(filter(guia => guiaAEliminar.id === guia.id)))).subscribe(() => {
            this.toast.success('Guia eliminada correctamente');
        }, error => this.errorService.handleException(error));
    }
    mostrarGuia(guia) {
        this.openPage(`dashboard/guias/${guia.titulo}`);
    }
};
GuiasdetramiteComponent = tslib_1.__decorate([
    Component({
        selector: 'app-guiasdetramite',
        templateUrl: './guiasdetramite.component.html',
        styleUrls: ['./guiasdetramite.component.css']
    })
], GuiasdetramiteComponent);
export { GuiasdetramiteComponent };
//# sourceMappingURL=guiasdetramite.component.js.map