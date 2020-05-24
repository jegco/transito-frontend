import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
let EstadoUsuarioComponent = class EstadoUsuarioComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.opcion = '';
    }
    ngOnInit() {
        this.data.usuario.active ? this.opcion = 'desactivar' : this.opcion = 'activar';
    }
    cerrar(cambiar) {
        this.dialogRef.close(cambiar);
    }
};
EstadoUsuarioComponent = tslib_1.__decorate([
    Component({
        selector: 'app-estado-usuario',
        templateUrl: './estado-usuario.component.html',
        styleUrls: ['./estado-usuario.component.css']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA))
], EstadoUsuarioComponent);
export { EstadoUsuarioComponent };
//# sourceMappingURL=estado-usuario.component.js.map